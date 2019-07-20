/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { concat, evolve, sortBy, takeWhile, uniqWith } from 'ramda';
import intersects from './intersects';
import { getNeighboringPlayers } from './neighbors';
import getPaymentMethods from './paymentMethods';
import {
  getTableauCards, getShareableTableauResources, getTableauResources,
} from './tableau';
import { getCompletedWonderStages } from './wonder';

const getTradeDiscounts = ({ player }) => {
  const tableauCards = getTableauCards(player);
  const wonderStages = getCompletedWonderStages(player);
  return tableauCards.concat(wonderStages).reduce(
    (acc, { leftTradeDiscounts, rightTradeDiscounts }) => evolve({
      left: concat(leftTradeDiscounts),
      right: concat(rightTradeDiscounts),
    }, acc),
    { left: [], right: [] }
  )
};

const getTradeCost = ({ resource, discounts }) =>
  intersects(resource.alternatives)(discounts) ? 1 : 2;

const getResourcePaymentCost = ({ neighborId, discounts, resource }) =>
  resource.playerId === neighborId
    ? getTradeCost({ resource, discounts }) : 0;

const getNeighborPaymentCost = ({ neighborId, discounts, payment }) =>
  payment.reduce(
    (acc, resource) =>
      acc + getResourcePaymentCost({ neighborId, discounts, resource }),
    0
  );

export const getPayments = ({ currentPlayerId, players, cost }) => {
  const [leftNeighbor, currentPlayer, rightNeighbor] =
    getNeighboringPlayers({ currentPlayerId, players });
  const tradeDiscounts = getTradeDiscounts({ player: currentPlayer });
  const resources = [].concat(
    getTableauResources(currentPlayer),
    getShareableTableauResources(leftNeighbor),
    getShareableTableauResources(rightNeighbor)
  );
  const payments = getPaymentMethods(resources, cost);
  if (!payments.length) {
    return [];
  }

  const costedPayments = payments.map((payment) => ({
    payment,
    leftCost: getNeighborPaymentCost({
      neighborId: leftNeighbor.id,
      discounts: tradeDiscounts.left,
      payment,
    }),
    rightCost: getNeighborPaymentCost({
      neighborId: rightNeighbor.id,
      discounts: tradeDiscounts.right,
      payment,
    }),
  }));

  const uniquePayments = uniqWith(
    (paymentA, paymentB) =>
      paymentA.leftCost === paymentB.leftCost
        && paymentA.rightCost === paymentB.rightCost,
    costedPayments
  );

  const sortedPayments = sortBy(
    ({ leftCost, rightCost }) => leftCost + rightCost,
    uniquePayments
  );

  const [minPayment] = sortedPayments;
  const minCost = minPayment.leftCost + minPayment.rightCost;
  return takeWhile(
    ({ leftCost, rightCost }) => leftCost + rightCost <= minCost,
    sortedPayments
  );
};

export const getPaymentCost = ({ currentPlayerId, players, cost }) => {
  const payments = getPayments({ currentPlayerId, players, cost });
  if (!payments.length) {
    return null;
  }

  const { money } = players[currentPlayerId];
  const { leftCost, rightCost } = payments[0];
  if (leftCost + rightCost > money) {
    return null;
  }

  return leftCost + rightCost;
};

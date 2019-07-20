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

import { identity, propEq } from 'ramda';
import { createSelector } from 'reselect';
import CARDS from 'data/cards';
import * as app from 'model/selectors/app';
import * as players from 'model/selectors/players';
import { getPaymentCost } from 'model/utils/paymentCost';
import { getTableauCards } from 'model/utils/tableau';
import { getBuildStructureCost } from 'model/utils/turn';
import { TYPE_NAMES, getEffects, getItemByCount, getLongEffects } from './card';
import { pluralizeCoins } from './plurals';

const getHandCard = ({ getPayment }) => ({
  id, name, type, resourceCost, coinCost, ...card,
}) => ({
  id,
  name,
  type,
  effects: getEffects(card),
  cost: coinCost ? getEffects({ money: coinCost }) : resourceCost,
  payment: getPayment(id),
});

export const getHand = createSelector(
  [app.getCurrentPlayerId, players.getPlayers, players.getHand],
  (currentPlayerId, players, hand) => hand.map(getHandCard({
    getPayment: (selectedCardId) => getBuildStructureCost({
      currentPlayerId,
      players,
      selectedCardId,
    }),
  }))
);

const getPayment = ({
  currentPlayerId, players, resourceCost, coinCost,
}) => {
  const { money } = players[currentPlayerId];
  if (coinCost > money) {
    return null;
  }

  if (coinCost > 0) {
    return coinCost;
  }

  return getPaymentCost({
    currentPlayerId,
    players,
    cost: resourceCost,
  });
};

const getPaymentMessage = ({
  currentPlayerId, players, name, structureCost, ...state,
}) => {
  const currentPlayer = players[currentPlayerId];
  const tableauCards = getTableauCards(currentPlayer);

  if (tableauCards.some(propEq('name', name))) {
    return 'You cannot build this structure because you already have it.';
  }

  const chainedStructure = tableauCards.find(({ id }) =>
    structureCost.includes(id));
  if (chainedStructure != null) {
    return `You can build this structure for free because you have ${chainedStructure.name}.`;
  }

  if (currentPlayer.wonderAbilities.includes('BUILD_DISCARDED')) {
    return 'You can build this structure for free.';
  }

  const payment = getPayment({
    players,
    currentPlayerId,
    ...state,
  });
  if (payment == null) {
    return 'You cannot afford to build this structure.';
  }

  if (payment === 0) {
    return 'You can build this structure for free.';
  }

  return `It will cost ${pluralizeCoins(payment)} to build this structure.`;
};

export const getHandCallout = ({ cardId }) => ({ app, players }) => {
  const card = CARDS[cardId];
  const cost =
    card.coinCost
      ? getLongEffects({ money: card.coinCost })
      : getItemByCount(identity, card.resourceCost);
  return {
    cost,
    name: card.name,
    type: TYPE_NAMES[card.type],
    effects: getLongEffects(card),
    chainedStructures: card.chainedStructures.map((cardId) =>
      CARDS[cardId].name),
    payment: getPaymentMessage({
      players,
      currentPlayerId: app.currentPlayer,
      name: card.name,
      resourceCost: card.resourceCost,
      coinCost: card.coinCost,
      structureCost: card.structureCost,
    }),
  };
};

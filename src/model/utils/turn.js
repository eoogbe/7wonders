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

import { propEq } from 'ramda';
import CARDS from 'data/cards';
import WONDERS from 'data/wonders';
import { getPaymentCost } from './paymentCost';
import { getTableauCards } from './tableau';

export const getBuildStructureCost = ({
  currentPlayerId, selectedCardId, players,
}) => {
  if (selectedCardId == null) {
    return null;
  }

  const currentPlayer = players[currentPlayerId];
  const { name, coinCost, resourceCost, structureCost } = CARDS[selectedCardId];
  const tableauCards = getTableauCards(currentPlayer);

  if (tableauCards.some(propEq('name', name))) {
    return null;
  }

  if (tableauCards.some(({ id }) => structureCost.includes(id))) {
    return 0;
  }

  if (currentPlayer.wonderAbilities.includes('BUILD_DISCARDED')) {
    return 0;
  }

  if (coinCost > currentPlayer.money) {
    return null;
  }

  if (coinCost > 0) {
    return coinCost;
  }

  return getPaymentCost({
    players,
    currentPlayerId,
    cost: resourceCost,
  });
};

export const getBuildWonderCost = ({
  currentPlayerId, selectedCardId, players,
}) => {
  if (selectedCardId == null) {
    return null;
  }

  const currentPlayer = players[currentPlayerId];
  if (currentPlayer.completedWonderStageCount >= 3) {
    return null;
  }

  const stages = WONDERS[currentPlayer.wonder][currentPlayer.wonderSide];
  const { cost } = stages[currentPlayer.completedWonderStageCount];
  return getPaymentCost({ players, currentPlayerId, cost });
};

export const getAddMoneyCost = ({ selectedCardId }) =>
  selectedCardId == null ? null : 0;

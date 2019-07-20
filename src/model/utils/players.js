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

import { add, append, evolve, identity, inc, propEq, without } from 'ramda';
import CARDS from 'data/cards';
import WONDERS from 'data/wonders';
import { getNeighborGuildCards } from './neighbors';
import { getTableauCards } from './tableau';
import { getBuildStructureCost } from './turn';
import { hasCompletedWonderAbility } from './wonder';

export const getIsCopyingGuild = ({ currentPlayerId, players, ages }) => {
  const { wonderAbilities } = players[currentPlayerId];
  if (!wonderAbilities.includes('COPY_GUILD')) {
    return false;
  }

  if (ages.length !== 3) {
    return false;
  }

  const { rounds } = ages[2];
  if (rounds !== 6) {
    return false;
  }

  const guildCards = getNeighborGuildCards({ currentPlayerId, players });
  return guildCards.length > 0;
};

export const getIsBuildingFree = ({
  currentPlayerId, players, selectedCardId,
}) => {
  const currentPlayer = players[currentPlayerId];
  if (!currentPlayer.wonderAbilities.includes('BUILD_FREE')) {
    return false;
  }

  if (selectedCardId == null) {
    return false;
  }

  const selectedCard = CARDS[selectedCardId];
  const tableauCards = getTableauCards(currentPlayer);
  if (tableauCards.some(propEq('name', selectedCard.name))) {
    return false;
  }

  const payment = getBuildStructureCost({
    currentPlayerId,
    players,
    selectedCardId,
  });
  return payment !== 0;
};

export const setupPlayers = ({ playerWonders }) =>
  playerWonders.reduce((acc, { id, wonder }) => ({
    ...acc,
    [id]: {
      id,
      wonder,
      completedWonderStageCount: 0,
      wonderSide: Math.random() >= 0.5 ? 'A' : 'B',
      tableau: [],
      money: 3,
      hand: [],
      militaryPoints: [],
      structurePayments: [],
      wonderPayments: [],
      wonderAbilities: [],
    },
  }), {});

export const resetWonderEffects = () => (player) => {
  if (hasCompletedWonderAbility({ player, wonderAbility: 'BUILD_FREE' })) {
    return evolve({ wonderAbilities: append('BUILD_FREE') }, player);
  }

  return player;
};

export const setStructurePayments = ({ getPayments, cardId, isFree }) =>
  (player) => {
    if (isFree || player.wonderAbilities.includes('BUILD_DISCARDED')) {
      return evolve({
        structurePayments: () => [{ payment: [], leftCost: 0, rightCost: 0 }],
        wonderAbilities: without(['BUILD_FREE']),
      }, player);
    }

    const { resourceCost, structureCost } = CARDS[cardId];
    const tableauCards = getTableauCards(player);
    if (tableauCards.some(({ id }) => structureCost.includes(id))) {
      return {
        ...player,
        structurePayments: [{ payment: [], leftCost: 0, rightCost: 0 }],
      };
    }

    return { ...player, structurePayments: getPayments(resourceCost) };
  };

export const setWonderPayments = ({ getPayments }) => (player) => {
  const stages = WONDERS[player.wonder][player.wonderSide];
  const { cost } = stages[player.completedWonderStageCount];
  const payments = getPayments(cost);
  return { ...player, wonderPayments: payments };
};

export const buildStructure = ({ card }) => (player) => {
  return evolve({
    tableau: append(card.id),
    money: add(card.money),
    wonderAbilities: without(['BUILD_DISCARDED']),
  }, player);
};

export const buildWonder = () => (player) => {
  const stages = WONDERS[player.wonder][player.wonderSide];
  const { money, special } = stages[player.completedWonderStageCount];
  return evolve({
    completedWonderStageCount: inc,
    money: add(money),
    wonderAbilities: special == null ? identity : append(special),
  }, player);
};

export const addMoney = () => evolve({ money: add(3) });

export const copyGuild = ({ cardId }) =>
  evolve({ tableau: append(cardId) });

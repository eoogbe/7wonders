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

import { partition } from 'ramda';
import { createSelector } from 'reselect';
import CARDS from 'data/cards';
import * as app from 'model/selectors/app';
import * as players from 'model/selectors/players';
import { getNeighboringPlayers } from 'model/utils/neighbors';
import { getTableauCards } from 'model/utils/tableau';
import { TYPE_NAMES, getEffects, getLongEffects } from './card';

const RESOURCE_TYPES = ['RAW_MATERIAL', 'MANUFACTURED_GOOD'];

const getTableau = (player) => {
  const tableauCards = getTableauCards(player);
  const cardViews = tableauCards.map(({ id, type, ...card }) => ({
    id,
    type,
    effects: getEffects(card),
  }));
  const [resourceCards, nonResourceCards] =
    partition(({ type }) => RESOURCE_TYPES.includes(type), cardViews);
  return {
    resourceCards,
    nonResourceCards,
  };
};

export const getTableaus = createSelector(
  [app.getCurrentPlayerId, players.getPlayers],
  (currentPlayerId, players) => {
    const neighboringPlayers =
      getNeighboringPlayers({ players, currentPlayerId });
    return neighboringPlayers.map(getTableau);
  }
);

export const getPlayerTableau = ({ playerId }) => ({ players }) =>
  getTableau(players[playerId]);


export const getTableauCard = (cardId) => {
  const { name, type, chainedStructures, ...card } = CARDS[cardId];
  return {
    name,
    type: TYPE_NAMES[type],
    effects: getLongEffects(card),
    chainedStructures: chainedStructures.map((cardId) =>
      CARDS[cardId].name),
  };
};

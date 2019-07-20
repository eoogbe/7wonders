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

import { assoc, chain, compose, concat, map, prop, propOr } from 'ramda';
import CARDS from 'data/cards';
import WONDERS from 'data/wonders';
import { getCompletedWonderStages } from './wonder';

const SPECIAL_RESOURCES = {
  TRADE_MANUFACTURED_GOOD: [{ alternatives: ['Glass', 'Loom', 'Papyrus'] }],
  TRADE_RAW_MATERIAL: [{ alternatives: ['Clay', 'Ore', 'Stone', 'Wood'] }],
};

export const getTableauCardsWithoutWonder = ({ tableau }) =>
  tableau.map(id => CARDS[id]);

export const getTableauCards = (player) => {
  const wonder = WONDERS[player.wonder];
  const initialResource = CARDS[wonder.initialResource];
  const tableauCards = getTableauCardsWithoutWonder(player);
  return [initialResource, ...tableauCards];
};

export const getShareableTableauResources = (player) =>
  compose(
    map(assoc('playerId', player.id)),
    chain(prop('resources')),
    getTableauCards
  )(player);

const getWonderResources = (player) =>
  compose(
    chain(prop('resources')),
    getCompletedWonderStages
  )(player);

export const getTableauResources = (player) => {
  const wonderResources = getWonderResources(player);
  const tableauResources = chain(
    ({ resources, special }) => propOr(resources, special, SPECIAL_RESOURCES),
    getTableauCards(player)
  );
  return map(
    assoc('playerId', player.id),
    concat(tableauResources, wonderResources)
  );
};

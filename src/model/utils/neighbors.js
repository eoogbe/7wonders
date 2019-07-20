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

export const getNeighboringIds = ({ playerIds, currentPlayerId }) => {
  const playerIdx = playerIds.indexOf(currentPlayerId);
  const leftNeighborIdx = (playerIdx + playerIds.length - 1) % playerIds.length;
  const rightNeighborIdx = (playerIdx + 1) % playerIds.length;
  const idxs = [leftNeighborIdx, playerIdx, rightNeighborIdx];
  return idxs.map(idx => playerIds[idx]);
};

export const getNeighboringPlayers = ({ currentPlayerId, players }) => {
  const neighboringIds = getNeighboringIds({
    playerIds: Object.keys(players),
    currentPlayerId,
  });
  return neighboringIds.map((id) => players[id]);
};

export const getNeighboringTableauCards = ({ currentPlayerId, players }) => {
  const neighboringPlayers =
    getNeighboringPlayers({ currentPlayerId, players });
  return neighboringPlayers.map(({ tableau }) =>
    tableau.map((cardId) => CARDS[cardId]));
}

export const getNeighborGuildCards = ({ currentPlayerId, players }) => {
  const [leftCards, /* playerCards */, rightCards] =
    getNeighboringTableauCards({ currentPlayerId, players });
  return leftCards.concat(rightCards).filter(propEq('type', 'GUILD'));
};

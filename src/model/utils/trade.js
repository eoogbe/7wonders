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

import { add, evolve } from 'ramda';
import { getNeighboringIds } from './neighbors';

export const playerTrade = (players, currentPlayerId) => {
  const [leftNeighborId, /* playerId */, rightNeighborId] =
    getNeighboringIds({ playerIds: Object.keys(players), currentPlayerId });
  const { structurePayments, wonderPayments } = players[currentPlayerId];

  if (structurePayments.length === 1) {
    const { leftCost, rightCost } = structurePayments[0];
    return evolve({
      [leftNeighborId]: {
        money: add(leftCost),
      },
      [currentPlayerId]: {
        money: (money) => money - leftCost - rightCost,
        structurePayments: () => [],
      },
      [rightNeighborId]: {
        money: add(rightCost),
      },
    }, players);
  }

  if (wonderPayments.length === 1) {
    const { leftCost, rightCost } = wonderPayments[0];
    return evolve({
      [leftNeighborId]: {
        money: add(leftCost),
      },
      [currentPlayerId]: {
        money: (money) => money - leftCost - rightCost,
        wonderPayments: () => [],
      },
      [rightNeighborId]: {
        money: add(rightCost),
      },
    }, players);
  }

  return players;
};

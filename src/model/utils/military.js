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

import { concat, evolve, map } from 'ramda';
import { getNeighboringPlayers } from './neighbors';
import { getTableauCards } from './tableau';
import { getCompletedWonderStages } from './wonder';

const WIN_POINTS = [1, 3, 5];

const getShieldEffects = (effects) =>
  effects.reduce((acc, { shields }) => acc + shields, 0);

export const getShields = (player) => {
  const tableauCards = getTableauCards(player);
  const tableauShields = getShieldEffects(tableauCards);

  const completedWonderStages = getCompletedWonderStages(player);
  const wonderShields = getShieldEffects(completedWonderStages);

  return tableauShields + wonderShields;
};

const getMilitaryPoints = ({
  ageIdx, playerShields, neighborShields,
}) => {
  if (playerShields === neighborShields) {
    return 0;
  }

  if (playerShields < neighborShields) {
    return -1;
  }

  return WIN_POINTS[ageIdx];
};

export const getConflicts = ({ ageIdx, ...state }) => {
  const neighboringPlayers = getNeighboringPlayers(state);
  const [leftShields, playerShields, rightShields] =
    neighboringPlayers.map(getShields);
  return [
    {
      shields: leftShields,
      points: getMilitaryPoints({
        ageIdx,
        playerShields,
        neighborShields: leftShields,
      }),
    },
    {
      shields: playerShields,
    },
    {
      shields: rightShields,
      points: getMilitaryPoints({
        ageIdx,
        playerShields,
        neighborShields: rightShields,
      }),
    },
  ];
};

export const fight = ({ ageIdx }) => (players) =>
  map((currentPlayer) => {
    const [leftConflict, /* shields */, rightConflict] = getConflicts({
      currentPlayerId: currentPlayer.id,
      players,
      ageIdx,
    });
    return evolve({
      militaryPoints: concat([leftConflict.points, rightConflict.points]),
    }, currentPlayer);
  }, players);

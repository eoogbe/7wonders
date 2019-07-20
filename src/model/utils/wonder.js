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

import {
  any, assocPath, compose, find, propEq, sort, take, values,
} from 'ramda';
import WONDERS from 'data/wonders';

export const WONDER_IDS =
  sort((a, b) => a.localeCompare(b), Object.keys(WONDERS));

export const getCompletedWonderStages = (player) => {
  const stages = WONDERS[player.wonder][player.wonderSide];
  return take(player.completedWonderStageCount, stages);
};

export const hasCompletedWonderAbility = ({ player, wonderAbility }) =>
  compose(
    any(propEq('special', wonderAbility)),
    getCompletedWonderStages
  )(player);

export const selectWonder = ({ currentPlayerId, wonderId }) =>
  (players) => {
    const nextPlayers =
      assocPath([currentPlayerId, 'wonder'], wonderId, players);
    const sameWonderPlayer = compose(
      find((player) =>
        player.wonder === wonderId && player.id !== currentPlayerId),
      values
    )(players);
    if (sameWonderPlayer == null) {
      return nextPlayers;
    }

    const oldWonderId = players[currentPlayerId].wonder;
    return assocPath(
      [sameWonderPlayer.id, 'wonder'],
      oldWonderId,
      nextPlayers
    );
  };

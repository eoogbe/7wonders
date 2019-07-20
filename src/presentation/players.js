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

import { map } from 'ramda';
import { createSelector } from 'reselect';
import WONDERS from 'data/wonders';
import * as app from 'model/selectors/app';
import * as players from 'model/selectors/players';
import { getShields } from 'model/utils/military';
import * as scores from 'model/utils/scores';
import { getEffects } from './card';
import { pluralizeCoins, pluralizeShields } from './plurals';

const getPlayer = (player) => {
  const wonder = WONDERS[player.wonder];
  return {
    id: player.id,
    name: wonder.name,
    money: pluralizeCoins(player.money),
    shields: pluralizeShields(getShields(player)),
    stages: wonder[player.wonderSide].map((stage, idx) => ({
      effects: getEffects(stage),
      isCompleted: player.completedWonderStageCount > idx,
    })),
  };
};

export const getOtherPlayers = createSelector(
  [players.getOtherPlayers],
  map(getPlayer),
);

export const getMoney = createSelector(
  [players.getMoney],
  pluralizeCoins
);

export const getPlayerScores = createSelector(
  [app.getCurrentPlayerId, players.getPlayers],
  (currentPlayerId, players) =>
    scores.getPlayerScores({ currentPlayerId, players })
);

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

import { pick } from 'ramda';
import { createSelector } from 'reselect';
import * as ages from 'model/selectors/ages';
import * as app from 'model/selectors/app';
import * as players from 'model/selectors/players';
import * as military from 'model/utils/military';
import { pluralizePoints, pluralizeShields } from './plurals';

const OUTCOMES = {
  '-1': 'Lose',
  '0': 'Tie',
  '1': 'Win',
  '3': 'Win',
  '5': 'Win',
};

const getConflict = ({ shields, points }) => ({
  shields: pluralizeShields(shields),
  points: pluralizePoints(points),
  outcome: OUTCOMES[points],
});

export const getConflicts = createSelector(
  [app.getCurrentPlayerId, ages.getCurrentAgeIndex, players.getPlayers],
  (currentPlayerId, ageIdx, players) => {
    const conflicts =
      military.getConflicts({ currentPlayerId, players, ageIdx });
    const [leftConflict, playerConflict, rightConflict] =
      conflicts.map(getConflict);
    return [leftConflict, pick(['shields'], playerConflict), rightConflict];
  }
);

export const getShields = createSelector(
  [players.getShields],
  pluralizeShields
);

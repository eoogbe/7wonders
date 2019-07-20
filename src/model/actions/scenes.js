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

export const VIEW_WONDER_CHOOSER = 'VIEW_WONDER_CHOOSER';

export const VIEW_WONDER_PANEL = 'VIEW_WONDER_PANEL';

export const VIEW_GAME_BOARD = 'VIEW_GAME_BOARD';

export const START_AGE = 'START_AGE';

export const SCORE_GAME = 'SCORE_GAME';

export const QUIT = 'QUIT';

export const viewWonderChooser = (playerId) => ({
  type: VIEW_WONDER_CHOOSER,
  payload: {
    playerId,
  },
});

export const viewWonderPanel = () => ({
  type: VIEW_WONDER_PANEL,
});

export const viewGameBoard = () => ({
  type: VIEW_GAME_BOARD,
});

export const startAge = () => ({
  type: START_AGE,
});

export const scoreGame = () => ({
  type: SCORE_GAME,
});

export const quit = () => ({
  type: QUIT,
});

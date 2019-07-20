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

import { startAge } from 'model/actions';
import updater from '../../players';

describe('startAge', () => {
  it('resets the wonder effects', () => {
    const initialState = {
      app: { currentPlayer: 'PLAYER1' },
      ages: [{ rounds: 0, discardedCards: [] }],
      players: {
        PLAYER1: {
          id: 'PLAYER1',
          wonder: 'STATUE_OF_ZEUS_IN_OLYMPIA',
          completedWonderStageCount: 2,
          wonderSide: 'A',
          wonderAbilities: [],
        },
      },
    };
    const next = updater(startAge())(initialState);
    expect(next.players.PLAYER1.wonderAbilities).toEqual(['BUILD_FREE']);
  });
});

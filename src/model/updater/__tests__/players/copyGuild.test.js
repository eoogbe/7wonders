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

import { copyGuild } from 'model/actions';
import updater from '../../players';

describe('copyGuild', () => {
  it('copies the guild card of a neighbor', () => {
    const initialState = {
      app: { currentPlayer: 'PLAYER1' },
      ages: [{ rounds: 6, discardedCards: [] }],
      players: {
        PLAYER1: {
          id: 'PLAYER1',
          tableau: ['STOCKADE'],
          wonderAbilities: ['COPY_GUILD'],
        },
      },
    };
    const next = updater(copyGuild('BUILDERS_GUILD'))(initialState);
    expect(next.players.PLAYER1).toEqual({
      id: 'PLAYER1',
      tableau: ['STOCKADE', 'BUILDERS_GUILD'],
      wonderAbilities: ['COPY_GUILD'],
    });
  });
});

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

import PLAYERS from '__fixtures__/players';
import { getConflicts } from '../military';

describe('getConflicts', () => {
  it('returns the neighboring conflicts', () => {
    const conflicts = getConflicts({
      app: { currentPlayer: 'PLAYER1' },
      ages: [{ rounds: 6, discardedCards: [] }],
      players: PLAYERS,
    });
    expect(conflicts).toEqual([
      { shields: '1 shield', points: '0 points', outcome: 'Tie' },
      { shields: '1 shield' },
      { shields: '2 shields', points: '-1 points', outcome: 'Lose' },
    ]);
  });
});

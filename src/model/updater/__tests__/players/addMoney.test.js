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

import { addMoney } from 'model/actions';
import updater from '../../players';

describe('addMoney', () => {
  it('adds money to the purse', () => {
    const initialState = {
      app: {
        currentPlayer: 'PLAYER1',
        selectedCardId: 'BATHS',
        selectedCardIdx: 1,
      },
      ages: [{ rounds: 0, discardedCards: [] }],
      players: {
        PLAYER1: {
          id: 'PLAYER1',
          money: 3,
          hand: ['ALTAR', 'LOOM'],
          wonderAbilities: [],
        },
        PLAYER2: {
          id: 'PLAYER2',
          hand: ['TIMBER_YARD', 'PAWNSHOP'],
        },
        PLAYER3: {
          id: 'PLAYER3',
          hand: ['WORKSHOP', 'CLAY_PIT'],
        },
      },
    };
    const next = updater(addMoney())(initialState);
    expect(next.players).toEqual({
      PLAYER1: {
        id: 'PLAYER1',
        money: 6,
        hand: ['ALTAR', 'LOOM'],
        wonderAbilities: [],
      },
      PLAYER2: {
        id: 'PLAYER2',
        hand: ['TIMBER_YARD', 'PAWNSHOP'],
      },
      PLAYER3: {
        id: 'PLAYER3',
        hand: ['WORKSHOP', 'CLAY_PIT'],
      },
    });
  });
});

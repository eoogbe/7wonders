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

import { getCanShowActionPanel } from '../actionPanel';

describe('getCanShowActionPanel', () => {
  it('when building discarded structure selects false', () => {
    const state = {
      app: { currentPlayer: 'PLAYER1' },
      ages: [{ rounds: 3, discardedCards: ['PRESS'] }],
      players: {
        PLAYER1: {
          id: 'PLAYER1',
          wonder: 'MAUSOLEUM_OF_HALICARNASSUS',
          tableau: ['STOCKADE', 'TAVERN'],
          hand: [],
          wonderAbilities: ['BUILD_DISCARDED'],
        },
        PLAYER2: {
          id: 'PLAYER2',
          tableau: ['LOOM', 'BATHS'],
          hand: [],
        },
        PLAYER3: {
          id: 'PLAYER3',
          tableau: ['APOTHECARY', 'PRESS'],
          hand: [],
        },
      },
    };
    expect(getCanShowActionPanel(state)).toBe(false);
  });
  it('when copying guild card selects false', () => {
    const state = {
      app: { currentPlayer: 'PLAYER1' },
      ages: [
        { rounds: 6, discardedCards: [] },
        { rounds: 6, discardedCards: [] },
        { rounds: 6, discardedCards: [] },
      ],
      players: {
        PLAYER1: {
          id: 'PLAYER1',
          tableau: ['STOCKADE', 'MAGISTRATES_GUILD'],
          hand: [],
          wonderAbilities: ['COPY_GUILD'],
        },
        PLAYER2: {
          id: 'PLAYER2',
          tableau: ['LOOM', 'BUILDERS_GUILD'],
          hand: [],
        },
        PLAYER3: {
          id: 'PLAYER3',
          tableau: ['CRAFTSMENS_GUILD', 'PRESS'],
          hand: [],
        },
      },
    };
    expect(getCanShowActionPanel(state)).toBe(false);
  });
  it('when game over selects false', () => {
    const state = {
      app: { currentPlayer: 'PLAYER1' },
      ages: [
        { rounds: 6, discardedCards: [] },
        { rounds: 6, discardedCards: [] },
        { rounds: 6, discardedCards: [] },
      ],
      players: {
        PLAYER1: {
          id: 'PLAYER1',
          tableau: ['STOCKADE', 'TAVERN'],
          hand: [],
          wonderAbilities: [],
        },
        PLAYER2: {
          id: 'PLAYER2',
          tableau: ['LOOM', 'BATHS'],
          hand: [],
        },
        PLAYER3: {
          id: 'PLAYER3',
          tableau: ['APOTHECARY', 'PRESS'],
          hand: [],
        },
      },
    };
    expect(getCanShowActionPanel(state)).toBe(false);
  });
  it('when normal gameplay selects true', () => {
    const state = {
      app: { currentPlayer: 'PLAYER1' },
      ages: [{ rounds: 0, discardedCards: [] }],
      players: {
        PLAYER1: {
          id: 'PLAYER1',
          tableau: ['STOCKADE', 'TAVERN'],
          hand: [],
          wonderAbilities: [],
        },
        PLAYER2: {
          id: 'PLAYER2',
          tableau: ['LOOM', 'BATHS'],
          hand: [],
        },
        PLAYER3: {
          id: 'PLAYER3',
          tableau: ['APOTHECARY', 'PRESS'],
          hand: [],
        },
      },
    };
    expect(getCanShowActionPanel(state)).toBe(true);
  });
});

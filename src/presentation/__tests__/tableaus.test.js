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
import { getPlayerTableau, getTableauCard, getTableaus } from '../tableaus';

describe('getTableaus', () => {
  it('returns the tableau app state', () => {
    const state = getTableaus({
      app: { currentPlayer: 'PLAYER1' },
      players: PLAYERS,
    });
    expect(state).toEqual([
      {
        resourceCards: [
          {
            id: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS_INITIAL',
            type: 'MANUFACTURED_GOOD',
            effects: ['Papyrus'],
          },
          {
            id: 'CLAY_POOL',
            type: 'RAW_MATERIAL',
            effects: ['Clay'],
          },
        ],
        nonResourceCards: [
          {
            id: 'BARRACKS',
            type: 'MILITARY',
            effects: ['1 shield'],
          },
        ],
      },
      {
        resourceCards: [
          {
            id: 'PYRAMIDS_OF_GIZA_INITIAL',
            type: 'RAW_MATERIAL',
            effects: ['Stone'],
          },
          {
            id: 'GLASSWORKS',
            type: 'MANUFACTURED_GOOD',
            effects: ['Glass'],
          },
        ],
        nonResourceCards: [
          {
            id: 'STOCKADE',
            type: 'MILITARY',
            effects: ['1 shield'],
          },
          {
            id: 'TAVERN',
            type: 'TRADE',
            effects: ['5 coins'],
          },
        ],
      },
      {
        resourceCards: [
          {
            id: 'COLOSSUS_OF_RHODES_INITIAL',
            type: 'RAW_MATERIAL',
            effects: ['Ore'],
          },
          {
            id: 'CLAY_PIT',
            type: 'RAW_MATERIAL',
            effects: ['Clay / Ore'],
          },
        ],
        nonResourceCards: [
          {
            id: 'BATHS',
            type: 'CIVIC',
            effects: ['3 points'],
          },
          {
            id: 'ALTAR',
            type: 'CIVIC',
            effects: ['2 points'],
          },
        ],
      },
    ]);
  });
});

describe('getPlayerTableau', () => {
  const state = { players: PLAYERS };
  expect(getPlayerTableau({ playerId: 'PLAYER1' })(state)).toEqual({
    resourceCards: [
      {
        id: 'PYRAMIDS_OF_GIZA_INITIAL',
        type: 'RAW_MATERIAL',
        effects: ['Stone'],
      },
      {
        id: 'GLASSWORKS',
        type: 'MANUFACTURED_GOOD',
        effects: ['Glass'],
      },
    ],
    nonResourceCards: [
      {
        id: 'STOCKADE',
        type: 'MILITARY',
        effects: ['1 shield'],
      },
      {
        id: 'TAVERN',
        type: 'TRADE',
        effects: ['5 coins'],
      },
    ],
  });
});

describe('getTableauCard', () => {
  expect(getTableauCard('CLAY_POOL')).toEqual({
    name: 'Clay pool',
    type: 'Raw material',
    effects: ['1 Clay'],
    chainedStructures: [],
  });
});

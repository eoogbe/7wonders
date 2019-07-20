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

import { takeTurn } from '../ai';

describe('takeTurn', () => {
  it('builds a structure', () => {
    const initialState = createState('PLAYER1');
    expect(takeTurn(initialState)).toEqual({
      id: 'PLAYER1',
      hand: ['CLAY_PIT'],
      wonder: 'COLOSSUS_OF_RHODES',
      money: 0,
      tableau: ['APOTHECARY', 'EAST_TRADING_POST', 'ALTAR'],
      completedWonderStageCount: 1,
      wonderSide: 'A',
      structurePayments: [{ payment: [], leftCost: 0, rightCost: 0 }],
      wonderPayments: [],
      wonderAbilities: [],
    });
  });
  it('builds the wonder', () => {
    const initialState = createState('PLAYER2');
    expect(takeTurn(initialState)).toEqual({
      id: 'PLAYER2',
      hand: ['MINE'],
      wonder: 'PYRAMIDS_OF_GIZA',
      money: 0,
      tableau: ['BARRACKS', 'EXCAVATION'],
      completedWonderStageCount: 1,
      wonderSide: 'A',
      structurePayments: [],
      wonderPayments: [
        {
          payment: [
            { playerId: 'PLAYER2', alternatives: ['Clay', 'Stone'] },
            { playerId: 'PLAYER2', alternatives: ['Stone'] },
          ],
          leftCost: 0,
          rightCost: 0,
        },
      ],
      wonderAbilities: [],
    });
  });
  it('adds money', () => {
    const initialState = createState('PLAYER3');
    expect(takeTurn(initialState)).toEqual({
      id: 'PLAYER3',
      hand: ['TREE_FARM'],
      wonder: 'HANGING_GARDEN_OF_BABYLON',
      money: 3,
      tableau: ['BATHS', 'GUARD_TOWER'],
      completedWonderStageCount: 3,
      wonderSide: 'A',
      structurePayments: [],
      wonderPayments: [],
      wonderAbilities: [],
    });
  });
  it('builds a discarded structure', () => {
    const initialState = {
      currentPlayerId: 'PLAYER1',
      ages: [{ rounds: 3, discardedCards: ['APOTHECARY', 'WORKSHOP'] }],
      players: {
        PLAYER1: {
          id: 'PLAYER1',
          hand: ['CLAY_PIT', 'MINE'],
          wonder: 'MAUSOLEUM_OF_HALICARNASSUS',
          completedWonderStageCount: 0,
          wonderSide: 'B',
          money: 0,
          tableau: ['ORE_VEIN', 'FOREST_CAVE'],
          wonderPayments: [],
          wonderAbilities: [],
        },
        PLAYER2: {
          id: 'PLAYER2',
          wonder: 'COLOSSUS_OF_RHODES',
          tableau: [],
        },
        PLAYER3: {
          id: 'PLAYER3',
          wonder: 'HANGING_GARDEN_OF_BABYLON',
          tableau: [],
        },
      },
    };
    expect(takeTurn(initialState)).toEqual({
      id: 'PLAYER1',
      hand: ['MINE'],
      wonder: 'MAUSOLEUM_OF_HALICARNASSUS',
      completedWonderStageCount: 1,
      wonderSide: 'B',
      money: 0,
      tableau: ['ORE_VEIN', 'FOREST_CAVE', 'APOTHECARY'],
      wonderPayments: [
        {
          payment: [
            { playerId: 'PLAYER1', alternatives: ['Ore', 'Wood'] },
            { playerId: 'PLAYER1', alternatives: ['Ore'] },
          ],
          leftCost: 0,
          rightCost: 0,
        }
      ],
      wonderAbilities: [],
    });
  });
});

const createState = (currentPlayerId) => ({
  currentPlayerId,
  ages: [{ rounds: 0, discardedCards: [] }],
  players: {
    PLAYER1: {
      id: 'PLAYER1',
      hand: ['CLAY_PIT', 'ALTAR'],
      wonder: 'COLOSSUS_OF_RHODES',
      money: 0,
      tableau: ['APOTHECARY', 'EAST_TRADING_POST'],
      completedWonderStageCount: 1,
      wonderSide: 'A',
      structurePayments: [],
      wonderPayments: [],
      wonderAbilities: [],
    },
    PLAYER2: {
      id: 'PLAYER2',
      hand: ['FOREST_CAVE', 'MINE'],
      wonder: 'PYRAMIDS_OF_GIZA',
      money: 0,
      tableau: ['BARRACKS', 'EXCAVATION'],
      completedWonderStageCount: 0,
      wonderSide: 'A',
      structurePayments: [],
      wonderPayments: [],
      wonderAbilities: [],
    },
    PLAYER3: {
      id: 'PLAYER3',
      hand: ['TIMBER_YARD', 'TREE_FARM'],
      wonder: 'HANGING_GARDEN_OF_BABYLON',
      money: 0,
      tableau: ['BATHS', 'GUARD_TOWER'],
      completedWonderStageCount: 3,
      wonderSide: 'A',
      structurePayments: [],
      wonderPayments: [],
      wonderAbilities: [],
    },
  },
});

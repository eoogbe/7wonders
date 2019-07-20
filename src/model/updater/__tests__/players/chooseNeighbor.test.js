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

import { BUILD_STRUCTURE, BUILD_WONDER, chooseNeighbor } from 'model/actions';
import updater from '../../players';

describe('chooseNeighbor', () => {
  describe('when building structure', () => {
    it('builds the structure', () => {
      const initialState = {
        app: {
          currentPlayer: 'PLAYER1',
          selectedCardId: 'GUARD_TOWER',
          selectedCardIdx: 1,
          lastHandAction: BUILD_STRUCTURE,
        },
        ages: [{ rounds: 0, discardedCards: [] }],
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            tableau: ['STOCKADE'],
            money: 3,
            hand: ['ALTAR', 'LOOM'],
            wonderAbilities: [],
          },
          PLAYER2: {
            id: 'PLAYER2',
            tableau: [],
            hand: ['TIMBER_YARD', 'PAWNSHOP'],
          },
          PLAYER3: {
            id: 'PLAYER3',
            tableau: [],
            hand: ['WORKSHOP', 'CLAY_PIT'],
          },
        },
      };
      const next = updater(chooseNeighbor('leftCost'))(initialState);
      expect(next.players).toEqual({
        PLAYER1: {
          id: 'PLAYER1',
          tableau: ['STOCKADE', 'GUARD_TOWER'],
          money: 3,
          hand: ['ALTAR', 'LOOM'],
          wonderAbilities: [],
        },
        PLAYER2: {
          id: 'PLAYER2',
          tableau: [],
          hand: ['TIMBER_YARD', 'PAWNSHOP'],
        },
        PLAYER3: {
          id: 'PLAYER3',
          tableau: [],
          hand: ['WORKSHOP', 'CLAY_PIT'],
        },
      });
    });
  });
  describe('when building wonder', () => {
    it('builds the wonder', () => {
      const initialState = {
        app: {
          currentPlayer: 'PLAYER1',
          selectedCardId: 'GUARD_TOWER',
          selectedCardIdx: 1,
          lastHandAction: BUILD_WONDER,
        },
        ages: [{ rounds: 0, discardedCards: [] }],
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            wonder: 'COLOSSUS_OF_RHODES',
            completedWonderStageCount: 1,
            wonderSide: 'A',
            tableau: ['EXCAVATION', 'TREE_FARM'],
            money: 3,
            hand: ['ALTAR', 'LOOM'],
            wonderAbilities: [],
          },
          PLAYER2: {
            id: 'PLAYER2',
            tableau: [],
            hand: ['TIMBER_YARD', 'PAWNSHOP'],
          },
          PLAYER3: {
            id: 'PLAYER3',
            tableau: [],
            hand: ['WORKSHOP', 'CLAY_PIT'],
          },
        },
      };
      const next = updater(chooseNeighbor('leftCost'))(initialState);
      expect(next.players).toEqual({
        PLAYER1: {
          id: 'PLAYER1',
          wonder: 'COLOSSUS_OF_RHODES',
          completedWonderStageCount: 2,
          wonderSide: 'A',
          tableau: ['EXCAVATION', 'TREE_FARM'],
          money: 3,
          hand: ['ALTAR', 'LOOM'],
          wonderAbilities: [],
        },
        PLAYER2: {
          id: 'PLAYER2',
          tableau: [],
          hand: ['TIMBER_YARD', 'PAWNSHOP'],
        },
        PLAYER3: {
          id: 'PLAYER3',
          tableau: [],
          hand: ['WORKSHOP', 'CLAY_PIT'],
        },
      });
    });
  });
});

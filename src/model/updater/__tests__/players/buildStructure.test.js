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

import { buildFreeStructure, buildStructure } from 'model/actions';
import updater from '../../players';

const PAYMENT = [{ payment: [], leftCost: 0, rightCost: 0 }];

describe('buildStructure', () => {
  describe('when has single payment', () => {
    it('builds the structure', () => {
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
            tableau: ['STOCKADE'],
            money: 3,
            hand: ['ALTAR', 'LOOM'],
            structurePayments: PAYMENT,
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
      const next = updater(buildStructure())(initialState);
      expect(next.players).toEqual({
        PLAYER1: {
          id: 'PLAYER1',
          tableau: ['STOCKADE', 'BATHS'],
          money: 3,
          hand: ['ALTAR', 'LOOM'],
          structurePayments: PAYMENT,
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
  describe('when can build discarded structure', () => {
    it('builds the structure', () => {
      const initialState = {
        app: {
          currentPlayer: 'PLAYER1',
          selectedCardId: null,
          selectedCardIdx: null,
        },
        ages: [{ rounds: 3, discardedCards: ['PRESS'] }],
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            tableau: ['STOCKADE'],
            money: 3,
            hand: ['ALTAR', 'LOOM'],
            structurePayments: PAYMENT,
            wonderAbilities: ['BUILD_DISCARDED'],
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
      const next = updater(buildStructure('BATHS'))(initialState);
      expect(next.players).toEqual({
        PLAYER1: {
          id: 'PLAYER1',
          tableau: ['STOCKADE', 'BATHS'],
          money: 3,
          hand: ['ALTAR', 'LOOM'],
          structurePayments: PAYMENT,
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
  describe('when structure is free', () => {
    it('builds the structure', () => {
      const initialState = {
        app: {
          currentPlayer: 'PLAYER1',
          selectedCardId: 'CLAY_PIT',
          selectedCardIdx: 1,
        },
        ages: [{ rounds: 0, discardedCards: [] }],
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            tableau: ['STOCKADE'],
            money: 3,
            hand: ['ALTAR', 'LOOM'],
            structurePayments: PAYMENT,
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
      const next = updater(buildFreeStructure())(initialState);
      expect(next.players).toEqual({
        PLAYER1: {
          id: 'PLAYER1',
          tableau: ['STOCKADE', 'CLAY_PIT'],
          money: 3,
          hand: ['ALTAR', 'LOOM'],
          structurePayments: PAYMENT,
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

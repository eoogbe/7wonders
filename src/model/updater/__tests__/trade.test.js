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

import {
  BUILD_STRUCTURE, addMoney, buildStructure, buildWonder, chooseNeighbor,
} from 'model/actions';
import updater from '../trade';

const MULTIPLE_PAYMENTS = [
  {
    payment: [{ playerId: 'PLAYER2', alternatives: ['Clay'] }],
    leftCost: 0,
    rightCost: 2,
  },
  {
    payment: [{ playerId: 'PLAYER3', alternatives: ['Clay'] }],
    leftCost: 2,
    rightCost: 0,
  },
];

const LEFT_PAYMENT = [
  {
    payment: [{ playerId: 'PLAYER3', alternatives: ['Clay'] }],
    leftCost: 2,
    rightCost: 0,
  },
];

const RIGHT_PAYMENT = [
  {
    payment: [{ playerId: 'PLAYER2', alternatives: ['Clay'] }],
    leftCost: 0,
    rightCost: 2,
  },
];

const COSTLESS_PAYMENT = [{ payment: [], leftCost: 0, rightCost: 0 }];

describe('updater', () => {
  describe('chooseNeighbor', () => {
    it('pays the trade costs for all players', () => {
      const initialState = {
        app: {
          currentPlayer: 'PLAYER1',
          lastHandAction: BUILD_STRUCTURE,
        },
        ages: [{ rounds: 0, discardedCards: [] }],
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            money: 6,
            structurePayments: LEFT_PAYMENT,
            wonderPayments: [],
            wonderAbilities: [],
          },
          PLAYER2: {
            id: 'PLAYER2',
            money: 6,
            structurePayments: RIGHT_PAYMENT,
            wonderPayments: [],
          },
          PLAYER3: {
            id: 'PLAYER3',
            money: 6,
            structurePayments: COSTLESS_PAYMENT,
            wonderPayments: [],
          },
        },
      };
      const next = updater(chooseNeighbor('leftCost'))(initialState);
      expect(next).toEqual({
        app: {
          currentPlayer: 'PLAYER1',
          lastHandAction: null,
        },
        ages: [{ rounds: 0, discardedCards: [] }],
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            money: 4,
            structurePayments: [],
            wonderPayments: [],
            wonderAbilities: [],
          },
          PLAYER2: {
            id: 'PLAYER2',
            money: 4,
            structurePayments: [],
            wonderPayments: [],
          },
          PLAYER3: {
            id: 'PLAYER3',
            money: 10,
            structurePayments: [],
            wonderPayments: [],
          },
        },
      });
    });
  });
  describe('buildStructure', () => {
    it('pays the trade costs for all the players', () => {
      const initialState = {
        app: {
          currentPlayer: 'PLAYER1',
          lastHandAction: null,
        },
        ages: [{ rounds: 0, discardedCards: [] }],
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            money: 6,
            structurePayments: LEFT_PAYMENT,
            wonderPayments: [],
            wonderAbilities: [],
          },
          PLAYER2: {
            id: 'PLAYER2',
            money: 6,
            structurePayments: RIGHT_PAYMENT,
            wonderPayments: [],
          },
          PLAYER3: {
            id: 'PLAYER3',
            money: 6,
            structurePayments: COSTLESS_PAYMENT,
            wonderPayments: [],
          },
        },
      };
      const next = updater(buildStructure())(initialState);
      expect(next).toEqual({
        app: {
          currentPlayer: 'PLAYER1',
          lastHandAction: null,
        },
        ages: [{ rounds: 0, discardedCards: [] }],
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            money: 4,
            structurePayments: [],
            wonderPayments: [],
            wonderAbilities: [],
          },
          PLAYER2: {
            id: 'PLAYER2',
            money: 4,
            structurePayments: [],
            wonderPayments: [],
          },
          PLAYER3: {
            id: 'PLAYER3',
            money: 10,
            structurePayments: [],
            wonderPayments: [],
          },
        },
      });
    });
  });
  describe('buildWonder', () => {
    it('pays the trade costs for all the players', () => {
      const initialState = {
        app: {
          currentPlayer: 'PLAYER1',
          lastHandAction: null,
        },
        ages: [{ rounds: 0, discardedCards: [] }],
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            money: 6,
            structurePayments: [],
            wonderPayments: LEFT_PAYMENT,
            wonderAbilities: [],
          },
          PLAYER2: {
            id: 'PLAYER2',
            money: 6,
            structurePayments: [],
            wonderPayments: RIGHT_PAYMENT,
          },
          PLAYER3: {
            id: 'PLAYER3',
            money: 6,
            structurePayments: [],
            wonderPayments: COSTLESS_PAYMENT,
          },
        },
      };
      const next = updater(buildWonder())(initialState);
      expect(next).toEqual({
        app: {
          currentPlayer: 'PLAYER1',
          lastHandAction: null,
        },
        ages: [{ rounds: 0, discardedCards: [] }],
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            money: 4,
            structurePayments: [],
            wonderPayments: [],
            wonderAbilities: [],
          },
          PLAYER2: {
            id: 'PLAYER2',
            money: 4,
            structurePayments: [],
            wonderPayments: [],
          },
          PLAYER3: {
            id: 'PLAYER3',
            money: 10,
            structurePayments: [],
            wonderPayments: [],
          },
        },
      });
    });
  });
  describe('addMoney', () => {
    it('pays the trade costs for all the players', () => {
      const initialState = {
        app: {
          currentPlayer: 'PLAYER1',
          lastHandAction: null,
        },
        ages: [{ rounds: 0, discardedCards: [] }],
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            money: 6,
            structurePayments: LEFT_PAYMENT,
            wonderPayments: [],
            wonderAbilities: [],
          },
          PLAYER2: {
            id: 'PLAYER2',
            money: 6,
            structurePayments: RIGHT_PAYMENT,
            wonderPayments: [],
          },
          PLAYER3: {
            id: 'PLAYER3',
            money: 6,
            structurePayments: COSTLESS_PAYMENT,
            wonderPayments: [],
          },
        },
      };
      const next = updater(addMoney())(initialState);
      expect(next).toEqual({
        app: {
          currentPlayer: 'PLAYER1',
          lastHandAction: null,
        },
        ages: [{ rounds: 0, discardedCards: [] }],
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            money: 4,
            structurePayments: [],
            wonderPayments: [],
            wonderAbilities: [],
          },
          PLAYER2: {
            id: 'PLAYER2',
            money: 4,
            structurePayments: [],
            wonderPayments: [],
          },
          PLAYER3: {
            id: 'PLAYER3',
            money: 10,
            structurePayments: [],
            wonderPayments: [],
          },
        },
      });
    });
  });
});

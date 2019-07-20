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
  BUILD_STRUCTURE, BUILD_WONDER, buildFreeStructure, buildStructure,
  buildWonder, chooseNeighbor,
} from 'model/actions';
import updater from '../neighbors';

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
    describe('when choosing structure payments', () => {
      it('when choosing left neighbor minimizes cost for left neighbor', () => {
        const initialState = {
          app: { currentPlayer: 'PLAYER1' },
          players: {
            PLAYER1: {
              id: 'PLAYER1',
              structurePayments: MULTIPLE_PAYMENTS,
              wonderPayments: [],
            },
          },
        };
        const next = updater(chooseNeighbor('leftCost'))(initialState);
        expect(next.players.PLAYER1).toEqual({
          id: 'PLAYER1',
          structurePayments: LEFT_PAYMENT,
          wonderPayments: [],
        });
      });
      it('when choosing right neighbor minimizes cost for right neighbor', () => {
        const initialState = {
          app: { currentPlayer: 'PLAYER1' },
          players: {
            PLAYER1: {
              id: 'PLAYER1',
              structurePayments: MULTIPLE_PAYMENTS,
              wonderPayments: [],
            },
          },
        };
        const next = updater(chooseNeighbor('rightCost'))(initialState);
        expect(next.players.PLAYER1).toEqual({
          id: 'PLAYER1',
          structurePayments: RIGHT_PAYMENT,
          wonderPayments: [],
        });
      });
    });
    describe('when choosing wonder payments', () => {
      it('when choosing left neighbor minimizes cost for left neighbor', () => {
        const initialState = {
          app: { currentPlayer: 'PLAYER1' },
          players: {
            PLAYER1: {
              id: 'PLAYER1',
              structurePayments: [],
              wonderPayments: MULTIPLE_PAYMENTS,
            },
          },
        };
        const next = updater(chooseNeighbor('leftCost'))(initialState);
        expect(next.players.PLAYER1).toEqual({
          id: 'PLAYER1',
          structurePayments: [],
          wonderPayments: LEFT_PAYMENT,
        });
      });
      it('when choosing right neighbor minimizes cost for right neighbor', () => {
        const initialState = {
          app: { currentPlayer: 'PLAYER1' },
          players: {
            PLAYER1: {
              id: 'PLAYER1',
              structurePayments: [],
              wonderPayments: MULTIPLE_PAYMENTS,
            },
          },
        };
        const next = updater(chooseNeighbor('rightCost'))(initialState);
        expect(next.players.PLAYER1).toEqual({
          id: 'PLAYER1',
          structurePayments: [],
          wonderPayments: RIGHT_PAYMENT,
        });
      });
    });
  });
  describe('buildStructure', () => {
    it('sets the structure payments', () => {
      const initialState = createState({
        app: {
          currentPlayer: 'PLAYER1',
          selectedCardId: 'BARRACKS',
          selectedCardIdx: 0,
        },
      });
      const next = updater(buildStructure())(initialState);
      expect(next.players.PLAYER1).toEqual({
        id: 'PLAYER1',
        wonder: 'PYRAMIDS_OF_GIZA',
        completedWonderStageCount: 0,
        wonderSide: 'A',
        tableau: ['APOTHECARY'],
        structurePayments: [
          {
            payment: [{ playerId: 'PLAYER2', alternatives: ['Ore'] }],
            leftCost: 0,
            rightCost: 2,
          },
        ],
        wonderPayments: [],
        wonderAbilities: [],
      });
    });
    describe('when building discarded structure', () => {
      it('sets the structure payments', () => {
        const initialState = createState({
          app: {
            currentPlayer: 'PLAYER1',
            selectedCardId: null,
            selectedCardIdx: null,
          },
          wonderAbilities: ['BUILD_DISCARDED'],
        });
        const next = updater(buildStructure('BARRACKS'))(initialState);
        expect(next.players.PLAYER1).toEqual({
          id: 'PLAYER1',
          wonder: 'PYRAMIDS_OF_GIZA',
          completedWonderStageCount: 0,
          wonderSide: 'A',
          tableau: ['APOTHECARY'],
          structurePayments: COSTLESS_PAYMENT,
          wonderPayments: [],
          wonderAbilities: ['BUILD_DISCARDED'],
        });
      });
    });
    describe('when structure is free', () => {
      it('sets the structure payments', () => {
        const initialState = createState({
          app: {
            currentPlayer: 'PLAYER1',
            selectedCardId: 'CLAY_PIT',
            selectedCardIdx: 0,
          },
          wonderAbilities: [],
        });
        const next = updater(buildFreeStructure())(initialState);
        expect(next.players.PLAYER1).toEqual({
          id: 'PLAYER1',
          wonder: 'PYRAMIDS_OF_GIZA',
          completedWonderStageCount: 0,
          wonderSide: 'A',
          tableau: ['APOTHECARY'],
          structurePayments: COSTLESS_PAYMENT,
          wonderPayments: [],
          wonderAbilities: [],
        });
      });
    });
  });
  describe('buildWonder', () => {
    it('sets the wonder payments', () => {
      const initialState = createState({
        app: {
          currentPlayer: 'PLAYER1',
          selectedCardId: 'BARRACKS',
          selectedCardIdx: 0,
        },
      });
      const next = updater(buildWonder())(initialState);
      expect(next.players.PLAYER1).toEqual({
        id: 'PLAYER1',
        wonder: 'PYRAMIDS_OF_GIZA',
        completedWonderStageCount: 0,
        wonderSide: 'A',
        tableau: ['APOTHECARY'],
        structurePayments: [],
        wonderPayments: [
          {
            payment: [
              { playerId: 'PLAYER3', alternatives: ['Stone'] },
              { playerId: 'PLAYER1', alternatives: ['Stone'] },
            ],
            leftCost: 2,
            rightCost: 0,
          },
        ],
        wonderAbilities: [],
      });
    });
  });
});

const createState = ({ app, ...player }) => ({
  app,
  players: {
    PLAYER1: {
      id: 'PLAYER1',
      wonder: 'PYRAMIDS_OF_GIZA',
      completedWonderStageCount: 0,
      wonderSide: 'A',
      tableau: ['APOTHECARY'],
      structurePayments: [],
      wonderPayments: [],
      wonderAbilities: [],
      ...player,
    },
    PLAYER2: {
      id: 'PLAYER2',
      wonder: 'COLOSSUS_OF_RHODES',
      completedWonderStageCount: 0,
      wonderSide: 'A',
      tableau: ['ALTAR'],
      structurePayments: [],
      wonderPayments: [],
      wonderAbilities: [],
    },
    PLAYER3: {
      id: 'PLAYER3',
      wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
      completedWonderStageCount: 0,
      wonderSide: 'A',
      tableau: ['STONE_PIT'],
      structurePayments: [],
      wonderPayments: [],
      wonderAbilities: [],
    },
  },
});

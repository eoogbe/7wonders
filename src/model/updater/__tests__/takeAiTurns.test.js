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
import updater from '../takeAiTurns';

const PAYMENT = [{ payment: [], leftCost: 0, rightCost: 0 }];

describe('updater', () => {
  describe('chooseNeighbor', () => {
    it('takes the AI turns', () => {
      const initialState = createMoreTurnsInitialState({
        lastHandAction: BUILD_STRUCTURE,
        structurePayments: PAYMENT,
      });
      const next = updater(chooseNeighbor('leftCost'))(initialState);
      expect(next).toEqual(createMoreTurnsNextState({
        lastHandAction: BUILD_STRUCTURE,
        structurePayments: PAYMENT,
      }));
    });
    describe('when playing 7th card', () => {
      it('takes two turns', () => {
        const initialState = createLastCardInitialState({
          lastHandAction: BUILD_STRUCTURE,
          structurePayments: PAYMENT,
        });
        const next = updater(chooseNeighbor('leftCost'))(initialState);
        expect(next).toEqual(createLastCardNextState({
          lastHandAction: BUILD_STRUCTURE,
          structurePayments: PAYMENT,
        }));
      });
    });
  });
  describe('buildStructure', () => {
    it('takes the AI turns', () => {
      const initialState = createMoreTurnsInitialState({
        structurePayments: PAYMENT,
      });
      const next = updater(buildStructure())(initialState);
      expect(next).toEqual(createMoreTurnsNextState({
        structurePayments: PAYMENT,
      }));
    });
    describe('when playing 7th card', () => {
      it('takes two turns', () => {
        const initialState = createLastCardInitialState({
          structurePayments: PAYMENT,
        });
        const next = updater(buildStructure())(initialState);
        expect(next).toEqual(createLastCardNextState({
          structurePayments: PAYMENT,
        }));
      });
    });
  });
  describe('buildWonder', () => {
    it('takes the AI turns', () => {
      const initialState = createMoreTurnsInitialState({
        wonderPayments: PAYMENT,
      });
      const next = updater(buildWonder())(initialState);
      expect(next).toEqual(createMoreTurnsNextState({
        wonderPayments: PAYMENT,
      }));
    });
    describe('when playing 7th card', () => {
      it('takes two turns', () => {
        const initialState = createLastCardInitialState({
          wonderPayments: PAYMENT,
        });
        const next = updater(buildWonder())(initialState);
        expect(next).toEqual(createLastCardNextState({
          wonderPayments: PAYMENT,
        }));
      });
    });
  });
  describe('addMoney', () => {
    it('takes the AI turns', () => {
      const initialState = createMoreTurnsInitialState({});
      const next = updater(addMoney())(initialState);
      expect(next).toEqual(createMoreTurnsNextState({}));
    });
    describe('when playing 7th card', () => {
      it('takes two turns', () => {
        const initialState = createLastCardInitialState({});
        const next = updater(addMoney())(initialState);
        expect(next).toEqual(createLastCardNextState({}));
      });
    });
  });
});

const createMoreTurnsInitialState = ({ lastHandAction, ...player }) => ({
  app: {
    currentPlayer: 'PLAYER1',
    lastHandAction,
  },
  ages: [{ rounds: 0, discardedCards: [] }],
  players: {
    PLAYER1: {
      id: 'PLAYER1',
      hand: ['CLAY_PIT', 'ALTAR'],
      wonder: 'COLOSSUS_OF_RHODES',
      wonderSide: 'A',
      money: 3,
      tableau: ['APOTHECARY', 'EAST_TRADING_POST'],
      completedWonderStageCount: 0,
      wonderAbilities: [],
      structurePayments: [],
      wonderPayments: [],
      ...player,
    },
    PLAYER2: {
      id: 'PLAYER2',
      hand: ['FOREST_CAVE', 'CLAY_POOL'],
      wonder: 'PYRAMIDS_OF_GIZA',
      wonderSide: 'A',
      money: 0,
      tableau: ['BARRACKS', 'EXCAVATION'],
      completedWonderStageCount: 0,
      structurePayments: [],
      wonderPayments: [],
      wonderAbilities: [],
    },
    PLAYER3: {
      id: 'PLAYER3',
      hand: ['GLASSWORKS', 'TREE_FARM'],
      wonder: 'HANGING_GARDEN_OF_BABYLON',
      wonderSide: 'A',
      money: 0,
      tableau: ['BATHS', 'GUARD_TOWER'],
      completedWonderStageCount: 0,
      structurePayments: [],
      wonderPayments: [],
      wonderAbilities: [],
    },
  },
});

const createMoreTurnsNextState = ({ lastHandAction, ...player }) => ({
  app: {
    currentPlayer: 'PLAYER1',
    lastHandAction,
  },
  ages: [{ rounds: 0, discardedCards: [] }],
  players: {
    PLAYER1: {
      id: 'PLAYER1',
      hand: ['CLAY_PIT', 'ALTAR'],
      wonder: 'COLOSSUS_OF_RHODES',
      wonderSide: 'A',
      money: 3,
      tableau: ['APOTHECARY', 'EAST_TRADING_POST'],
      completedWonderStageCount: 0,
      wonderAbilities: [],
      structurePayments: [],
      wonderPayments: [],
      ...player,
    },
    PLAYER2: {
      id: 'PLAYER2',
      hand: ['FOREST_CAVE'],
      wonder: 'PYRAMIDS_OF_GIZA',
      wonderSide: 'A',
      money: 0,
      tableau: ['BARRACKS', 'EXCAVATION', 'CLAY_POOL'],
      completedWonderStageCount: 0,
      structurePayments: PAYMENT,
      wonderPayments: [],
      wonderAbilities: [],
    },
    PLAYER3: {
      id: 'PLAYER3',
      hand: ['TREE_FARM'],
      wonder: 'HANGING_GARDEN_OF_BABYLON',
      wonderSide: 'A',
      money: 0,
      tableau: ['BATHS', 'GUARD_TOWER', 'GLASSWORKS'],
      completedWonderStageCount: 0,
      structurePayments: PAYMENT,
      wonderPayments: [],
      wonderAbilities: [],
    },
  },
});

const createLastCardInitialState = ({ lastHandAction, ...player }) => ({
  app: {
    currentPlayer: 'PLAYER1',
    lastHandAction,
  },
  ages: [{ rounds: 6, discardedCards: [] }],
  players: {
    PLAYER1: {
      id: 'PLAYER1',
      hand: ['CLAY_PIT', 'ALTAR'],
      wonder: 'COLOSSUS_OF_RHODES',
      wonderSide: 'A',
      money: 3,
      tableau: ['APOTHECARY', 'EAST_TRADING_POST'],
      completedWonderStageCount: 0,
      wonderAbilities: [],
      structurePayments: [],
      wonderPayments: [],
      ...player,
    },
    PLAYER2: {
      id: 'PLAYER2',
      hand: ['FOREST_CAVE', 'CLAY_POOL'],
      wonder: 'PYRAMIDS_OF_GIZA',
      wonderSide: 'A',
      money: 0,
      tableau: ['BARRACKS', 'EXCAVATION'],
      completedWonderStageCount: 0,
      structurePayments: [],
      wonderPayments: [],
      wonderAbilities: [],
    },
    PLAYER3: {
      id: 'PLAYER3',
      hand: ['GLASSWORKS', 'TREE_FARM'],
      wonder: 'HANGING_GARDEN_OF_BABYLON',
      wonderSide: 'B',
      money: 0,
      tableau: ['BATHS', 'GUARD_TOWER'],
      completedWonderStageCount: 2,
      structurePayments: [],
      wonderPayments: [],
      wonderAbilities: ['PLAY_LAST_CARD'],
    },
  },
});

const createLastCardNextState = ({ lastHandAction, ...player }) => ({
  app: {
    currentPlayer: 'PLAYER1',
    lastHandAction,
  },
  ages: [{ rounds: 6, discardedCards: [] }],
  players: {
    PLAYER1: {
      id: 'PLAYER1',
      hand: ['CLAY_PIT', 'ALTAR'],
      wonder: 'COLOSSUS_OF_RHODES',
      wonderSide: 'A',
      money: 3,
      tableau: ['APOTHECARY', 'EAST_TRADING_POST'],
      completedWonderStageCount: 0,
      wonderAbilities: [],
      structurePayments: [],
      wonderPayments: [],
      ...player,
    },
    PLAYER2: {
      id: 'PLAYER2',
      hand: ['FOREST_CAVE'],
      wonder: 'PYRAMIDS_OF_GIZA',
      wonderSide: 'A',
      money: 0,
      tableau: ['BARRACKS', 'EXCAVATION', 'CLAY_POOL'],
      completedWonderStageCount: 0,
      structurePayments: PAYMENT,
      wonderPayments: [],
      wonderAbilities: [],
    },
    PLAYER3: {
      id: 'PLAYER3',
      hand: [],
      wonder: 'HANGING_GARDEN_OF_BABYLON',
      wonderSide: 'B',
      money: 3,
      tableau: ['BATHS', 'GUARD_TOWER', 'GLASSWORKS'],
      completedWonderStageCount: 2,
      structurePayments: PAYMENT,
      wonderPayments: [],
      wonderAbilities: ['PLAY_LAST_CARD'],
    },
  },
});

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
import updater from '../copyAiGuild';

const PAYMENT = [{ payment: [], leftCost: 0, rightCost: 0 }];

describe('updater', () => {
  describe('chooseNeighbor', () => {
    it('copies the first guild card', () => {
      const initialState = createInitialState({
        lastHandAction: BUILD_STRUCTURE,
        structurePayments: PAYMENT,
      });
      const next = updater(chooseNeighbor('leftCost'))(initialState);
      expect(next).toEqual(createNextState({
        lastHandAction: BUILD_STRUCTURE,
        structurePayments: PAYMENT,
      }));
    });
  });
  describe('buildStructure', () => {
    it('copies the first guild card', () => {
      const initialState = createInitialState({
        structurePayments: PAYMENT,
      });
      const next = updater(buildStructure())(initialState);
      expect(next).toEqual(createNextState({
        structurePayments: PAYMENT,
      }));
    });
  });
  describe('buildWonder', () => {
    it('copies the first guild card', () => {
      const initialState = createInitialState({
        wonderPayments: PAYMENT,
      });
      const next = updater(buildWonder())(initialState);
      expect(next).toEqual(createNextState({
        wonderPayments: PAYMENT,
      }));
    });
  });
  describe('addMoney', () => {
    it('copies the first guild card', () => {
      const initialState = createInitialState({});
      const next = updater(addMoney())(initialState);
      expect(next).toEqual(createNextState({}));
    });
  });
});

const createInitialState = ({ lastHandAction, ...player }) => ({
  app: {
    currentPlayer: 'PLAYER1',
    lastHandAction,
  },
  ages: [
    { rounds: 6, discardedCards: [] },
    { rounds: 6, discardedCards: [] },
    { rounds: 6, discardedCards: [] },
  ],
  players: {
    PLAYER1: {
      id: 'PLAYER1',
      hand: ['CLAY_PIT', 'ALTAR'],
      wonder: 'COLOSSUS_OF_RHODES',
      wonderSide: 'A',
      money: 3,
      tableau: ['APOTHECARY', 'EAST_TRADING_POST', 'BUILDERS_GUILD'],
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
      tableau: ['BARRACKS', 'EXCAVATION', 'CRAFTSMENS_GUILD'],
      completedWonderStageCount: 0,
      structurePayments: [],
      wonderPayments: [],
      wonderAbilities: [],
    },
    PLAYER3: {
      id: 'PLAYER3',
      hand: ['GLASSWORKS', 'TREE_FARM'],
      wonder: 'STATUE_OF_ZEUS_IN_OLYMPIA',
      wonderSide: 'B',
      money: 0,
      tableau: ['BATHS', 'GUARD_TOWER'],
      completedWonderStageCount: 3,
      structurePayments: [],
      wonderPayments: [],
      wonderAbilities: ['COPY_GUILD'],
    },
  },
});

const createNextState = ({ lastHandAction, ...player }) => ({
  app: {
    currentPlayer: 'PLAYER1',
    lastHandAction,
  },
  ages: [
    { rounds: 6, discardedCards: [] },
    { rounds: 6, discardedCards: [] },
    { rounds: 6, discardedCards: [] },
  ],
  players: {
    PLAYER1: {
      id: 'PLAYER1',
      hand: ['CLAY_PIT', 'ALTAR'],
      wonder: 'COLOSSUS_OF_RHODES',
      wonderSide: 'A',
      money: 3,
      tableau: ['APOTHECARY', 'EAST_TRADING_POST', 'BUILDERS_GUILD'],
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
      tableau: ['BARRACKS', 'EXCAVATION', 'CRAFTSMENS_GUILD'],
      completedWonderStageCount: 0,
      structurePayments: [],
      wonderPayments: [],
      wonderAbilities: [],
    },
    PLAYER3: {
      id: 'PLAYER3',
      hand: ['GLASSWORKS', 'TREE_FARM'],
      wonder: 'STATUE_OF_ZEUS_IN_OLYMPIA',
      wonderSide: 'B',
      money: 0,
      tableau: ['BATHS', 'GUARD_TOWER', 'CRAFTSMENS_GUILD'],
      completedWonderStageCount: 3,
      structurePayments: [],
      wonderPayments: [],
      wonderAbilities: ['COPY_GUILD'],
    },
  },
});

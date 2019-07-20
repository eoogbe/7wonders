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
import updater from '../military';

const PAYMENT = [{ payment: [], leftCost: 0, rightCost: 0 }];

describe('updater', () => {
  describe('chooseNeighbor', () => {
    it('fights in a war', () => {
      const initialState = {
        app: {
          currentPlayer: 'PLAYER1',
          selectedCardId: 'GUARD_TOWER',
          selectedCardIdx: 1,
          lastHandAction: BUILD_STRUCTURE,
        },
        ages: [{ rounds: 6, discardedCards: [] }],
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            wonder: 'PYRAMIDS_OF_GIZA',
            completedWonderStageCount: 0,
            wonderSide: 'A',
            tableau: ['STOCKADE'],
            hand: [],
            militaryPoints: [],
            wonderAbilities: [],
          },
          PLAYER2: {
            id: 'PLAYER2',
            wonder: 'COLOSSUS_OF_RHODES',
            completedWonderStageCount: 0,
            wonderSide: 'A',
            tableau: ['LOOM'],
            militaryPoints: [],
            hand: [],
          },
          PLAYER3: {
            id: 'PLAYER3',
            wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
            completedWonderStageCount: 0,
            wonderSide: 'A',
            tableau: ['LOOM'],
            militaryPoints: [],
            hand: [],
          },
        },
      };
      const next = updater(chooseNeighbor('leftCost'))(initialState);
      expect(next.players).toEqual({
        PLAYER1: {
          id: 'PLAYER1',
          wonder: 'PYRAMIDS_OF_GIZA',
          completedWonderStageCount: 0,
          wonderSide: 'A',
          tableau: ['STOCKADE'],
          militaryPoints: [1, 1],
          hand: [],
          wonderAbilities: [],
        },
        PLAYER2: {
          id: 'PLAYER2',
          wonder: 'COLOSSUS_OF_RHODES',
          completedWonderStageCount: 0,
          wonderSide: 'A',
          tableau: ['LOOM'],
          militaryPoints: [-1, 0],
          hand: [],
        },
        PLAYER3: {
          id: 'PLAYER3',
          wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
          completedWonderStageCount: 0,
          wonderSide: 'A',
          tableau: ['LOOM'],
          militaryPoints: [0, -1],
          hand: [],
        },
      });
    });
  });
  describe('buildStructure', () => {
    it('fights in a war', () => {
      const initialState = {
        app: {
          currentPlayer: 'PLAYER1',
          selectedCardId: 'BATHS',
          selectedCardIdx: 1,
        },
        ages: [{ rounds: 6, discardedCards: [] }],
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            wonder: 'PYRAMIDS_OF_GIZA',
            completedWonderStageCount: 0,
            wonderSide: 'A',
            tableau: ['STOCKADE'],
            militaryPoints: [],
            hand: [],
            structurePayments: PAYMENT,
            wonderAbilities: [],
          },
          PLAYER2: {
            id: 'PLAYER2',
            wonder: 'COLOSSUS_OF_RHODES',
            completedWonderStageCount: 0,
            wonderSide: 'A',
            tableau: ['TAVERN'],
            militaryPoints: [],
            hand: [],
          },
          PLAYER3: {
            id: 'PLAYER3',
            wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
            completedWonderStageCount: 0,
            wonderSide: 'A',
            tableau: ['APOTHECARY'],
            militaryPoints: [],
            hand: [],
          },
        },
      };
      const next = updater(buildStructure())(initialState);
      expect(next.players).toEqual({
        PLAYER1: {
          id: 'PLAYER1',
          wonder: 'PYRAMIDS_OF_GIZA',
          completedWonderStageCount: 0,
          wonderSide: 'A',
          tableau: ['STOCKADE'],
          militaryPoints: [1, 1],
          hand: [],
          structurePayments: PAYMENT,
          wonderAbilities: [],
        },
        PLAYER2: {
          id: 'PLAYER2',
          wonder: 'COLOSSUS_OF_RHODES',
          completedWonderStageCount: 0,
          wonderSide: 'A',
          tableau: ['TAVERN'],
          militaryPoints: [-1, 0],
          hand: [],
        },
        PLAYER3: {
          id: 'PLAYER3',
          wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
          completedWonderStageCount: 0,
          wonderSide: 'A',
          tableau: ['APOTHECARY'],
          militaryPoints: [0, -1],
          hand: [],
        },
      });
    });
  });
  describe('buildWonder', () => {
    it('fights in a war', () => {
      const initialState = {
        app: {
          currentPlayer: 'PLAYER1',
          selectedCardId: 'BATHS',
          selectedCardIdx: 1,
        },
        ages: [{ rounds: 6, discardedCards: [] }],
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            wonder: 'PYRAMIDS_OF_GIZA',
            completedWonderStageCount: 1,
            wonderSide: 'A',
            tableau: ['STONE_PIT'],
            militaryPoints: [],
            hand: [],
            wonderPayments: PAYMENT,
            wonderAbilities: [],
          },
          PLAYER2: {
            id: 'PLAYER2',
            wonder: 'COLOSSUS_OF_RHODES',
            completedWonderStageCount: 2,
            wonderSide: 'A',
            tableau: ['TAVERN'],
            militaryPoints: [],
            hand: [],
          },
          PLAYER3: {
            id: 'PLAYER3',
            wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
            completedWonderStageCount: 0,
            wonderSide: 'A',
            tableau: ['APOTHECARY'],
            militaryPoints: [],
            hand: [],
          },
        },
      };
      const next = updater(buildWonder())(initialState);
      expect(next.players).toEqual({
        PLAYER1: {
          id: 'PLAYER1',
          wonder: 'PYRAMIDS_OF_GIZA',
          completedWonderStageCount: 1,
          wonderSide: 'A',
          tableau: ['STONE_PIT'],
          militaryPoints: [0, -1],
          hand: [],
          wonderPayments: PAYMENT,
          wonderAbilities: [],
        },
        PLAYER2: {
          id: 'PLAYER2',
          wonder: 'COLOSSUS_OF_RHODES',
          completedWonderStageCount: 2,
          wonderSide: 'A',
          tableau: ['TAVERN'],
          militaryPoints: [1, 1],
          hand: [],
        },
        PLAYER3: {
          id: 'PLAYER3',
          wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
          completedWonderStageCount: 0,
          wonderSide: 'A',
          tableau: ['APOTHECARY'],
          militaryPoints: [-1, 0],
          hand: [],
        },
      });
    });
  });
  describe('addMoney', () => {
    it('fights in a war', () => {
      const initialState = {
        app: {
          currentPlayer: 'PLAYER1',
          selectedCardId: 'BATHS',
          selectedCardIdx: 1,
        },
        ages: [{ rounds: 6, discardedCards: [] }],
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            wonder: 'PYRAMIDS_OF_GIZA',
            completedWonderStageCount: 0,
            wonderSide: 'A',
            tableau: ['STOCKADE'],
            militaryPoints: [],
            hand: [],
            wonderAbilities: [],
          },
          PLAYER2: {
            id: 'PLAYER2',
            wonder: 'COLOSSUS_OF_RHODES',
            completedWonderStageCount: 0,
            wonderSide: 'A',
            tableau: ['TAVERN'],
            militaryPoints: [],
            hand: [],
          },
          PLAYER3: {
            id: 'PLAYER3',
            wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
            completedWonderStageCount: 0,
            wonderSide: 'A',
            tableau: ['APOTHECARY'],
            militaryPoints: [],
            hand: [],
          },
        },
      };
      const next = updater(addMoney())(initialState);
      expect(next.players).toEqual({
        PLAYER1: {
          id: 'PLAYER1',
          wonder: 'PYRAMIDS_OF_GIZA',
          completedWonderStageCount: 0,
          wonderSide: 'A',
          tableau: ['STOCKADE'],
          militaryPoints: [1, 1],
          hand: [],
          wonderAbilities: [],
        },
        PLAYER2: {
          id: 'PLAYER2',
          wonder: 'COLOSSUS_OF_RHODES',
          completedWonderStageCount: 0,
          wonderSide: 'A',
          tableau: ['TAVERN'],
          militaryPoints: [-1, 0],
          hand: [],
        },
        PLAYER3: {
          id: 'PLAYER3',
          wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
          completedWonderStageCount: 0,
          wonderSide: 'A',
          tableau: ['APOTHECARY'],
          militaryPoints: [0, -1],
          hand: [],
        },
      });
    });
  });
});

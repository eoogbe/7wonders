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
  BUILD_STRUCTURE, BUILD_WONDER, addMoney, buildStructure, buildWonder,
  chooseNeighbor, selectHandCard,
} from 'model/actions';
import updater from '../../app';

const MULTIPLE_PAYMENTS = [
  {
    payment: [{ playerId: 'PLAYER2', alternatives: ['Clay'] }],
    leftCost: 2,
    rightCost: 0,
  },
  {
    payment: [{ playerId: 'PLAYER3', alternatives: ['Clay'] }],
    leftCost: 0,
    rightCost: 2,
  },
];

const SINGLE_PAYMENT = [{ payment: [], leftCost: 0, rightCost: 0 }];

describe('selectHandCard', () => {
  it('selects a card from the hand', () => {
    const initialState = {
      app: {
        currentPlayer: 'PLAYER1',
        selectedCardId: null,
        selectedCardIdx: null,
      },
      ages: [{ rounds: 0, discardedCards: [] }],
      players: {
        PLAYER1: {
          id: 'PLAYER1',
          hand: ['PAWNSHOP', 'ALTAR'],
          wonderAbilities: [],
        },
        PLAYER2: {
          id: 'PLAYER2',
          hand: [],
        },
        PLAYER3: {
          id: 'PLAYER3',
          hand: [],
        },
      },
    };
    const next = updater(selectHandCard('PAWNSHOP', 0))(initialState);
    expect(next.app).toEqual({
      currentPlayer: 'PLAYER1',
      selectedCardId: 'PAWNSHOP',
      selectedCardIdx: 0,
    });
  });
});

describe('chooseNeighbor', () => {
  it('unselects the card', () => {
    const initialState = {
      app: {
        currentPlayer: 'PLAYER1',
        selectedCardId: 'PAWNSHOP',
        selectedCardIdx: 0,
        lastHandAction: BUILD_STRUCTURE,
        scene: 'GAME_BOARD',
      },
      ages: [{ rounds: 0, discardedCards: [] }],
      players: {
        PLAYER1: {
          id: 'PLAYER1',
          hand: ['PAWNSHOP', 'ALTAR'],
          wonderAbilities: [],
        },
        PLAYER2: {
          id: 'PLAYER2',
          hand: [],
        },
        PLAYER3: {
          id: 'PLAYER3',
          hand: [],
        },
      },
    };
    const next = updater(chooseNeighbor('leftCost'))(initialState);
    expect(next.app).toEqual({
      currentPlayer: 'PLAYER1',
      selectedCardId: null,
      selectedCardIdx: null,
      lastHandAction: BUILD_STRUCTURE,
      scene: 'GAME_BOARD',
    });
  });
});

describe('buildStructure', () => {
  describe('when single structure payment', () => {
    it('unselects the card', () => {
      const initialState = {
        app: {
          currentPlayer: 'PLAYER1',
          selectedCardId: 'PAWNSHOP',
          selectedCardIdx: 0,
          lastHandAction: null,
          scene: 'GAME_BOARD',
        },
        ages: [{ rounds: 0, discardedCards: [] }],
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            hand: ['PAWNSHOP', 'ALTAR'],
            structurePayments: SINGLE_PAYMENT,
            wonderPayments: [],
            wonderAbilities: [],
          },
          PLAYER2: {
            id: 'PLAYER2',
            hand: [],
          },
          PLAYER3: {
            id: 'PLAYER3',
            hand: [],
          },
        },
      };
      const next = updater(buildStructure())(initialState);
      expect(next.app).toEqual({
        currentPlayer: 'PLAYER1',
        selectedCardId: null,
        selectedCardIdx: null,
        lastHandAction: BUILD_STRUCTURE,
        scene: 'GAME_BOARD',
      });
    });
  });
  describe('when multiple structure payments', () => {
    it('sets the last hand action', () => {
      const initialState = {
        app: {
          currentPlayer: 'PLAYER1',
          selectedCardId: 'PAWNSHOP',
          selectedCardIdx: 0,
          lastHandAction: null,
          scene: 'GAME_BOARD',
        },
        ages: [{ rounds: 0, discardedCards: [] }],
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            hand: ['PAWNSHOP', 'ALTAR'],
            structurePayments: MULTIPLE_PAYMENTS,
            wonderPayments: [],
            wonderAbilities: [],
          },
          PLAYER2: {
            id: 'PLAYER2',
            hand: [],
          },
          PLAYER3: {
            id: 'PLAYER3',
            hand: [],
          },
        },
      };
      const next = updater(buildStructure())(initialState);
      expect(next.app).toEqual({
        currentPlayer: 'PLAYER1',
        selectedCardId: 'PAWNSHOP',
        selectedCardIdx: 0,
        lastHandAction: BUILD_STRUCTURE,
        scene: 'GAME_BOARD',
      });
    });
  });
});

describe('buildWonder', () => {
  describe('when single wonder payment', () => {
    it('unselects the card', () => {
      const initialState = {
        app: {
          currentPlayer: 'PLAYER1',
          selectedCardId: 'PAWNSHOP',
          selectedCardIdx: 0,
          lastHandAction: null,
          scene: 'GAME_BOARD',
        },
        ages: [{ rounds: 0, discardedCards: [] }],
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            hand: ['PAWNSHOP', 'ALTAR'],
            wonder: 'PYRAMIDS_OF_GIZA',
            tableau: [],
            structurePayments: [],
            wonderPayments: SINGLE_PAYMENT,
            wonderAbilities: [],
          },
          PLAYER2: {
            id: 'PLAYER2',
            hand: [],
          },
          PLAYER3: {
            id: 'PLAYER3',
            hand: [],
          },
        },
      };
      const next = updater(buildWonder())(initialState);
      expect(next.app).toEqual({
        currentPlayer: 'PLAYER1',
        selectedCardId: null,
        selectedCardIdx: null,
        lastHandAction: BUILD_WONDER,
        scene: 'GAME_BOARD',
      });
    });
  });
  describe('when multiple wonder payments', () => {
    it('sets the last hand action', () => {
      const initialState = {
        app: {
          currentPlayer: 'PLAYER1',
          selectedCardId: 'PAWNSHOP',
          selectedCardIdx: 0,
          lastHandAction: null,
          scene: 'GAME_BOARD',
        },
        ages: [{ rounds: 0, discardedCards: [] }],
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            hand: ['PAWNSHOP', 'ALTAR'],
            wonder: 'PYRAMIDS_OF_GIZA',
            tableau: [],
            structurePayments: [],
            wonderPayments: MULTIPLE_PAYMENTS,
            wonderAbilities: [],
          },
          PLAYER2: {
            id: 'PLAYER2',
            hand: [],
          },
          PLAYER3: {
            id: 'PLAYER3',
            hand: [],
          },
        },
      };
      const next = updater(buildWonder())(initialState);
      expect(next.app).toEqual({
        currentPlayer: 'PLAYER1',
        selectedCardId: 'PAWNSHOP',
        selectedCardIdx: 0,
        lastHandAction: BUILD_WONDER,
        scene: 'GAME_BOARD',
      });
    });
  });
  describe('when can build discarded structure', () => {
    it('unselects the card', () => {
      const initialState = {
        app: {
          currentPlayer: 'PLAYER1',
          selectedCardId: 'PAWNSHOP',
          selectedCardIdx: 0,
          lastHandAction: null,
          scene: 'GAME_BOARD',
        },
        ages: [{ rounds: 0, discardedCards: [] }],
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            hand: ['PAWNSHOP', 'ALTAR'],
            wonder: 'MAUSOLEUM_OF_HALICARNASSUS',
            tableau: [],
            structurePayments: [],
            wonderPayments: SINGLE_PAYMENT,
            wonderAbilities: ['BUILD_DISCARDED'],
          },
          PLAYER2: {
            id: 'PLAYER2',
            hand: [],
          },
          PLAYER3: {
            id: 'PLAYER3',
            hand: [],
          },
        },
      };
      const next = updater(buildWonder())(initialState);
      expect(next.app).toEqual({
        currentPlayer: 'PLAYER1',
        selectedCardId: null,
        selectedCardIdx: null,
        lastHandAction: BUILD_WONDER,
        scene: 'GAME_BOARD',
      });
    });
  });
});

describe('addMoney', () => {
  it('unselects the card', () => {
    const initialState = {
      app: {
        currentPlayer: 'PLAYER1',
        selectedCardId: 'PAWNSHOP',
        selectedCardIdx: 0,
        lastHandAction: null,
        scene: 'GAME_BOARD',
      },
      ages: [{ rounds: 0, discardedCards: [] }],
      players: {
        PLAYER1: {
          id: 'PLAYER1',
          hand: ['PAWNSHOP', 'ALTAR'],
          wonderAbilities: [],
        },
        PLAYER2: {
          id: 'PLAYER2',
          hand: [],
        },
        PLAYER3: {
          id: 'PLAYER3',
          hand: [],
        },
      },
    };
    const next = updater(addMoney())(initialState);
    expect(next.app).toEqual({
      currentPlayer: 'PLAYER1',
      selectedCardId: null,
      selectedCardIdx: null,
      lastHandAction: null,
      scene: 'GAME_BOARD',
    });
  });
});

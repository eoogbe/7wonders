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
  startAge,
} from 'model/actions';
import updater from '../hands';

const PAYMENT = [{ payment: [], leftCost: 0, rightCost: 0 }];

describe('updater', () => {
  describe('startAge', () => {
    it('deals the cards to each hand of each player', () => {
      const initialState = {
        app: { currentPlayer: 'PLAYER1' },
        ages: [{ rounds: 0, discardedCards: [] }],
        players: createPlayersWithEmptyHands({}),
      };
      const next = updater(startAge())(initialState);
      expect(next.players.PLAYER1.hand).toHaveLength(7);
      expect(next.players.PLAYER2.hand).toHaveLength(7);
      expect(next.players.PLAYER3.hand).toHaveLength(7);
    });
  });
  describe('chooseNeighbor', () => {
    it('removes the selected hand card', () => {
      const initialState = createMoreTurnsInitialState({
        lastHandAction: BUILD_STRUCTURE,
        ages: [{ rounds: 0, discardedCards: [] }],
      });
      const next = updater(chooseNeighbor('leftCost'))(initialState);
      expect(next.players).toEqual(createClockwiseNextPlayers({}));
    });
    describe('when Age 2', () => {
      it('swaps hands counterclockwise', () => {
        const initialState = createMoreTurnsInitialState({
          lastHandAction: BUILD_STRUCTURE,
          ages: [
            { rounds: 6, discardedCards: [] },
            { rounds: 0, discardedCards: [] },
          ],
        });
        const next = updater(chooseNeighbor('leftCost'))(initialState);
        expect(next.players).toEqual(createCounterclockwiseNextPlayers({}));
      });
    });
    describe('when last round', () => {
      it('empties the hands', () => {
        const initialState = createLastRoundInitialState({
          lastHandAction: BUILD_STRUCTURE,
        });
        const next = updater(chooseNeighbor('leftCost'))(initialState);
        expect(next.players).toEqual(createPlayersWithEmptyHands({}));
      });
    });
  });
  describe('buildStructure', () => {
    it('removes the selected hand card', () => {
      const initialState = createMoreTurnsInitialState({
        ages: [{ rounds: 0, discardedCards: [] }],
        structurePayments: PAYMENT,
      });
      const next = updater(buildStructure())(initialState);
      expect(next.players).toEqual(createClockwiseNextPlayers({
        structurePayments: PAYMENT,
      }));
    });
    describe('when Age 2', () => {
      it('swaps hands counterclockwise', () => {
        const initialState = createMoreTurnsInitialState({
          ages: [
            { rounds: 6, discardedCards: [] },
            { rounds: 0, discardedCards: [] },
          ],
          structurePayments: PAYMENT,
        });
        const next = updater(buildStructure())(initialState);
        expect(next.players).toEqual(createCounterclockwiseNextPlayers({
          structurePayments: PAYMENT,
        }));
      });
    });
    describe('when last round', () => {
      it('empties the hands', () => {
        const initialState = createLastRoundInitialState({
          structurePayments: PAYMENT,
        });
        const next = updater(buildStructure())(initialState);
        expect(next.players).toEqual(createPlayersWithEmptyHands({
          structurePayments: PAYMENT,
        }));
      });
    });
  });
  describe('buildWonder', () => {
    it('removes the selected hand card', () => {
      const initialState = createMoreTurnsInitialState({
        ages: [{ rounds: 0, discardedCards: [] }],
        wonderPayments: PAYMENT,
      });
      const next = updater(buildWonder())(initialState);
      expect(next.players).toEqual(createClockwiseNextPlayers({
        wonderPayments: PAYMENT,
      }));
    });
    describe('when Age 2', () => {
      it('swaps hands counterclockwise', () => {
        const initialState = createMoreTurnsInitialState({
          ages: [
            { rounds: 6, discardedCards: [] },
            { rounds: 0, discardedCards: [] },
          ],
          wonderPayments: PAYMENT,
        });
        const next = updater(buildWonder())(initialState);
        expect(next.players).toEqual(createCounterclockwiseNextPlayers({
          wonderPayments: PAYMENT,
        }));
      });
    });
    describe('when last round', () => {
      it('empties the hands', () => {
        const initialState = createLastRoundInitialState({
          wonderPayments: PAYMENT,
        });
        const next = updater(buildWonder())(initialState);
        expect(next.players).toEqual(createPlayersWithEmptyHands({
          wonderPayments: PAYMENT,
        }));
      });
    });
  });
  describe('addMoney', () => {
    it('removes the selected hand card', () => {
      const initialState = createMoreTurnsInitialState({
        ages: [{ rounds: 0, discardedCards: [] }],
      });
      const next = updater(addMoney())(initialState);
      expect(next.players).toEqual(createClockwiseNextPlayers({}));
    });
    describe('when Age 2', () => {
      it('swaps hands counterclockwise', () => {
        const initialState = createMoreTurnsInitialState({
          ages: [
            { rounds: 6, discardedCards: [] },
            { rounds: 0, discardedCards: [] },
          ],
        });
        const next = updater(addMoney())(initialState);
        expect(next.players).toEqual(createCounterclockwiseNextPlayers({}));
      });
    });
    describe('when last round', () => {
      it('empties the hands', () => {
        const initialState = createLastRoundInitialState({});
        const next = updater(addMoney())(initialState);
        expect(next.players).toEqual(createPlayersWithEmptyHands({}));
      });
    });
  });
});

const createMoreTurnsInitialState = ({ lastHandAction, ages, ...player }) => ({
  ages,
  app: {
    currentPlayer: 'PLAYER1',
    selectedCardId: 'GUARD_TOWER',
    selectedCardIdx: 1,
    lastHandAction,
  },
  players: {
    PLAYER1: {
      id: 'PLAYER1',
      hand: ['ALTAR', 'GUARD_TOWER', 'BATHS'],
      wonderAbilities: [],
      ...player,
    },
    PLAYER2: {
      id: 'PLAYER2',
      hand: ['TIMBER_YARD', 'PAWNSHOP'],
    },
    PLAYER3: {
      id: 'PLAYER3',
      hand: ['WORKSHOP', 'GLASSWORKS'],
    },
  },
});

const createLastRoundInitialState = ({ lastHandAction, ...player }) => ({
  app: {
    currentPlayer: 'PLAYER1',
    selectedCardId: 'GUARD_TOWER',
    selectedCardIdx: 1,
    lastHandAction,
  },
  ages: [{ rounds: 6, discardedCards: [] }],
  players: {
    PLAYER1: {
      id: 'PLAYER1',
      hand: ['ALTAR', 'GUARD_TOWER'],
      wonderAbilities: [],
      ...player,
    },
    PLAYER2: {
      id: 'PLAYER2',
      hand: ['TIMBER_YARD'],
    },
    PLAYER3: {
      id: 'PLAYER3',
      hand: ['WORKSHOP'],
    },
  },
});

const createPlayersWithEmptyHands = (player) => ({
  PLAYER1: {
    id: 'PLAYER1',
    hand: [],
    wonderAbilities: [],
    ...player,
  },
  PLAYER2: {
    id: 'PLAYER2',
    hand: [],
  },
  PLAYER3: {
    id: 'PLAYER3',
    hand: [],
  },
});

const createClockwiseNextPlayers = (player) => ({
  PLAYER1: {
    id: 'PLAYER1',
    hand: ['TIMBER_YARD', 'PAWNSHOP'],
    wonderAbilities: [],
    ...player,
  },
  PLAYER2: {
    id: 'PLAYER2',
    hand: ['WORKSHOP', 'GLASSWORKS'],
  },
  PLAYER3: {
    id: 'PLAYER3',
    hand: ['ALTAR', 'BATHS'],
  },
});

const createCounterclockwiseNextPlayers = (player) => ({
  PLAYER1: {
    id: 'PLAYER1',
    hand: ['WORKSHOP', 'GLASSWORKS'],
    wonderAbilities: [],
    ...player,
  },
  PLAYER2: {
    id: 'PLAYER2',
    hand: ['ALTAR', 'BATHS'],
  },
  PLAYER3: {
    id: 'PLAYER3',
    hand: ['TIMBER_YARD', 'PAWNSHOP'],
  },
});

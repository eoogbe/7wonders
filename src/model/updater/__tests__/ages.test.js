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
  BUILD_STRUCTURE, addMoney, buildStructure, buildWonder, chooseNeighbor, quit,
  startAge,
} from 'model/actions';
import updater from '../ages';

const PAYMENT = [{ payment: [], leftCost: 0, rightCost: 0 }];

describe('updater', () => {
  describe('startAge', () => {
    it('adds the next age to the game', () => {
      const initialState = {
        app: { currentPlayer: 'PLAYER1' },
        ages: [],
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            wonderAbilities: [],
          },
        },
      };
      const next = updater(startAge())(initialState);
      expect(next.ages).toEqual([{ rounds: 0, discardedCards: [] }]);
    });
  });
  describe('addMoney', () => {
    it('discards the selected card', () => {
      const initialState = createMoreTurnsState({
        structurePayments: [],
        wonderPayments: [],
      });
      const next = updater(addMoney())(initialState);
      expect(next.ages).toEqual([{ rounds: 1, discardedCards: ['PAWNSHOP'] }]);
    });
    describe('when last round', () => {
      it('discards the remaining cards in each hand', () => {
        const initialState = createLastRoundState({
          structurePayments: [],
          wonderPayments: [],
        });
        const next = updater(addMoney())(initialState);
        expect(next.ages).toEqual([
          { rounds: 6, discardedCards: ['PAWNSHOP', 'ALTAR', 'LOOM'] },
        ]);
      });
    });
  });
  describe('chooseNeighbor', () => {
    it('increments the round', () => {
      const initialState = createMoreTurnsState({
        lastHandAction: BUILD_STRUCTURE,
        structurePayments: PAYMENT,
        wonderPayments: [],
      });
      const next = updater(chooseNeighbor('leftCost'))(initialState);
      expect(next.ages).toEqual([{ rounds: 1, discardedCards: [] }]);
    });
    describe('when last round', () => {
      it('discards the remaining cards in each hand', () => {
        const initialState = createLastRoundState({
          lastHandAction: BUILD_STRUCTURE,
          structurePayments: PAYMENT,
          wonderPayments: [],
        });
        const next = updater(chooseNeighbor('leftCost'))(initialState);
        expect(next.ages).toEqual([
          { rounds: 6, discardedCards: ['PAWNSHOP', 'ALTAR', 'LOOM'] },
        ]);
      });
    });
  });
  describe('buildStructure', () => {
    it('increments the round', () => {
      const initialState = createMoreTurnsState({
        structurePayments: PAYMENT,
        wonderPayments: [],
      });
      const next = updater(buildStructure())(initialState);
      expect(next.ages).toEqual([{ rounds: 1, discardedCards: [] }]);
    });
    describe('when last round', () => {
      it('discards the remaining cards in each hand', () => {
        const initialState = createLastRoundState({
          structurePayments: PAYMENT,
          wonderPayments: [],
        });
        const next = updater(buildStructure())(initialState);
        expect(next.ages).toEqual([
          { rounds: 6, discardedCards: ['PAWNSHOP', 'ALTAR', 'LOOM'] },
        ]);
      });
    });
  });
  describe('buildWonder', () => {
    it('increments the round', () => {
      const initialState = createMoreTurnsState({
        structurePayments: [],
        wonderPayments: PAYMENT,
      });
      const next = updater(buildWonder())(initialState);
      expect(next.ages).toEqual([{ rounds: 1, discardedCards: [] }]);
    });
    describe('when last round', () => {
      it('discards the remaining cards in each hand', () => {
        const initialState = createLastRoundState({
          structurePayments: [],
          wonderPayments: PAYMENT,
        });
        const next = updater(buildWonder())(initialState);
        expect(next.ages).toEqual([
          { rounds: 6, discardedCards: ['PAWNSHOP', 'ALTAR', 'LOOM'] },
        ]);
      });
    });
  });
  describe('quit', () => {
    it('resets the game state', () => {
      const initialState = {
        app: {},
        ages: [{ rounds: 0, discardedCards: [] }],
      };
      const next = updater(quit())(initialState);
      expect(next.ages).toEqual([]);
    });
  });
});

const createMoreTurnsState = ({
  lastHandAction, structurePayments, wonderPayments,
}) => ({
  app: {
    currentPlayer: 'PLAYER1',
    selectedCardId: 'PAWNSHOP',
    selectedCardIdx: 0,
    lastHandAction,
  },
  ages: [{ rounds: 0, discardedCards: [] }],
  players: {
    PLAYER1: {
      id: 'PLAYER1',
      hand: ['PAWNSHOP', 'TAVERN'],
      wonderAbilities: [],
      structurePayments,
      wonderPayments,
    },
    PLAYER2: {
      id: 'PLAYER2',
      hand: ['ALTAR', 'SCRIPTORIUM'],
      structurePayments: [],
      wonderPayments: [],
    },
    PLAYER3: {
      id: 'PLAYER3',
      hand: ['LOOM', 'WORKSHOP'],
      structurePayments: [],
      wonderPayments: [],
    },
  },
});

const createLastRoundState = ({
  lastHandAction, structurePayments, wonderPayments,
}) => ({
  app: {
    currentPlayer: 'PLAYER1',
    selectedCardId: 'PAWNSHOP',
    selectedCardIdx: 0,
    lastHandAction,
  },
  ages: [{ rounds: 5, discardedCards: [] }],
  players: {
    PLAYER1: {
      id: 'PLAYER1',
      hand: ['PAWNSHOP'],
      wonderAbilities: [],
      structurePayments,
      wonderPayments,
    },
    PLAYER2: {
      id: 'PLAYER2',
      hand: ['ALTAR'],
      structurePayments: [],
      wonderPayments: [],
    },
    PLAYER3: {
      id: 'PLAYER3',
      hand: ['LOOM'],
      structurePayments: [],
      wonderPayments: [],
    },
  },
});

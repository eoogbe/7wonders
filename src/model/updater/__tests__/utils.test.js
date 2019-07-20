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
  chooseNeighbor, startAge,
} from 'model/actions';
import {
  hasMoreTurns, isFinishingAge, isLastRound, isPlayingHand, isTryBuildStructure,
  isTryBuildWonder, matchActions,
} from '../utils';

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

describe('matchActions', () => {
  it('updates when one of the actions matches', () => {
    const updater = matchActions(['ACTION1', 'ACTION2'], () => (n) => n + 1);
    const initialState = 1;
    const next = updater({ type: 'ACTION2' })(initialState);
    expect(next).toBe(2);
  });
});

describe('isTryBuildStructure', () => {
  describe('when choosing neighbor', () => {
    it('when last hand action is BUILD_STRUCTURE returns true', () => {
      const state = createPlayingHandState({
        lastHandAction: BUILD_STRUCTURE,
        discardedCards: [],
        structurePayments: MULTIPLE_PAYMENTS,
      });
      expect(isTryBuildStructure(chooseNeighbor('leftCost'))(state)).toBe(true);
    });
    it('when last hand action is not BUILD_STRUCTURE returns false', () => {
      const state = createPlayingHandState({
        lastHandAction: BUILD_WONDER,
        discardedCards: [],
        structurePayments: MULTIPLE_PAYMENTS,
      });
      const next = isTryBuildStructure(chooseNeighbor('leftCost'))(state);
      expect(next).toBe(false);
    });
  });
  describe('when building structure', () => {
    it('when single structure payment returns true', () => {
      const state = createPlayingHandState({
        lastHandAction: BUILD_STRUCTURE,
        discardedCards: [],
        structurePayments: SINGLE_PAYMENT,
      });
      expect(isTryBuildStructure(buildStructure())(state)).toBe(true);
    });
    it('when multiple structure payments returns false', () => {
      const state = createPlayingHandState({
        lastHandAction: BUILD_STRUCTURE,
        discardedCards: [],
        structurePayments: MULTIPLE_PAYMENTS,
      });
      expect(isTryBuildStructure(buildStructure())(state)).toBe(false);
    });
  });
  describe('when not choosing neighbor or building structure', () => {
    it('returns false', () => {
      expect(isTryBuildStructure(startAge())()).toBe(false);
    });
  });
});

describe('isTryBuildWonder', () => {
  describe('when choosing neighbor', () => {
    it('when last hand action is BUILD_WONDER returns true', () => {
      const state = createPlayingHandState({
        lastHandAction: BUILD_WONDER,
        discardedCards: [],
        wonderPayments: MULTIPLE_PAYMENTS,
      });
      expect(isTryBuildWonder(chooseNeighbor('leftCost'))(state)).toBe(true);
    });
    it('when last hand action is not BUILD_WONDER returns false', () => {
      const state = createPlayingHandState({
        lastHandAction: BUILD_STRUCTURE,
        discardedCards: [],
        wonderPayments: MULTIPLE_PAYMENTS,
      });
      expect(isTryBuildWonder(chooseNeighbor('leftCost'))(state)).toBe(false);
    });
  });
  describe('when building wonder', () => {
    it('when single wonder payment returns true', () => {
      const state = createPlayingHandState({
        lastHandAction: BUILD_WONDER,
        discardedCards: [],
        wonderPayments: SINGLE_PAYMENT,
      });
      expect(isTryBuildWonder(buildWonder())(state)).toBe(true);
    });
    it('when multiple wonder payments returns false', () => {
      const state = createPlayingHandState({
        lastHandAction: BUILD_WONDER,
        discardedCards: [],
        wonderPayments: MULTIPLE_PAYMENTS,
      });
      expect(isTryBuildWonder(buildWonder())(state)).toBe(false);
    });
  });
  describe('when not building wonder or choosing neighbor', () => {
    it('returns false', () => {
      expect(isTryBuildWonder(startAge())()).toBe(false);
    });
  });
});

describe('isPlayingHand', () => {
  it('when choosing neighbor returns true', () => {
    const state = createPlayingHandState({
      lastHandAction: BUILD_STRUCTURE,
      discardedCards: [],
      structurePayments: MULTIPLE_PAYMENTS,
    });
    expect(isPlayingHand(chooseNeighbor('leftCost'))(state)).toBe(true);
  });
  it('when not playing a hand action returns false', () => {
    const state = createPlayingHandState({ discardedCards: [] });
    expect(isPlayingHand(startAge())(state)).toBe(false);
  });
  it('when single structure payment returns true', () => {
    const state = createPlayingHandState({
      lastHandAction: BUILD_STRUCTURE,
      discardedCards: [],
      structurePayments: SINGLE_PAYMENT,
    });
    expect(isPlayingHand(buildStructure())(state)).toBe(true);
  });
  it('when multiple structure payments returns false', () => {
    const state = createPlayingHandState({
      lastHandAction: BUILD_STRUCTURE,
      discardedCards: [],
      structurePayments: MULTIPLE_PAYMENTS,
    });
    expect(isPlayingHand(buildStructure())(state)).toBe(false);
  });
  it('when single wonder payment returns true', () => {
    const state = createPlayingHandState({
      lastHandAction: BUILD_WONDER,
      discardedCards: [],
      wonderPayments: SINGLE_PAYMENT,
    });
    expect(isPlayingHand(buildWonder())(state)).toBe(true);
  });
  it('when multiple wonder payments returns false', () => {
    const state = createPlayingHandState({
      lastHandAction: BUILD_WONDER,
      discardedCards: [],
      wonderPayments: MULTIPLE_PAYMENTS,
    });
    expect(isPlayingHand(buildWonder())(state)).toBe(false);
  });
  it('when adding money returns true', () => {
    const state = createPlayingHandState({ discardedCards: [] });
    expect(isPlayingHand(addMoney())(state)).toBe(true);
  });
  it('when can build discarded structure returns false', () => {
    const state = createPlayingHandState({
      lastHandAction: BUILD_STRUCTURE,
      discardedCards: ['PRESS'],
      structurePayments: SINGLE_PAYMENT,
      wonderAbilities: ['BUILD_DISCARDED'],
    });
    expect(isPlayingHand(buildStructure())(state)).toBe(false);
  });
  it('without current player returns false', () => {
    const state = { app: {} };
    expect(isPlayingHand(startAge())(state)).toBe(false);
  });
});

describe('hasMoreTurns', () => {
  it('when not playing a hand returns false', () => {
    const state = createMoreTurnsState({ rounds: 0 });
    expect(hasMoreTurns(startAge())(state)).toBe(false);
  });
  it('when 6th round of current age returns false', () => {
    const state = createLastCardsState({ rounds: 6 });
    expect(hasMoreTurns(addMoney())(state)).toBe(false);
  });
  it('when more rounds left in current age returns true', () => {
    const state = createMoreTurnsState({ rounds: 0 });
    expect(hasMoreTurns(addMoney())(state)).toBe(true);
  });
});

describe('isLastRound', () => {
  it('when not playing a hand returns false', () => {
    const state = createLastCardsState({ rounds: 6 });
    expect(isLastRound(startAge())(state)).toBe(false);
  });
  it('when 6th round of current age returns false', () => {
    const state = createMoreTurnsState({ rounds: 0 });
    expect(isLastRound(addMoney())(state)).toBe(false);
  });
  it('when more rounds left in current age returns true', () => {
    const state = createLastCardsState({ rounds: 6 });
    expect(isLastRound(addMoney())(state)).toBe(true);
  });
});

describe('isFinishingAge', () => {
  it('when not playing a hand returns false', () => {
    const state = createPlayingHandState({
      discardedCards: [],
      hand: [],
    });
    expect(isFinishingAge(startAge())(state)).toBe(false);
  });
  it('when players have multiple cards in their hands returns false', () => {
    const state = createPlayingHandState({
      discardedCards: [],
      hand: ['PAWNSHOP'],
    });
    expect(isFinishingAge(addMoney())(state)).toBe(false);
  });
  it('when players have no cards in their hands returns true', () => {
    const state = createPlayingHandState({
      discardedCards: [],
      hand: [],
    });
    expect(isFinishingAge(addMoney())(state)).toBe(true);
  });
});

const createPlayingHandState = ({ lastHandAction, discardedCards, ...player }) => ({
  app: {
    currentPlayer: 'PLAYER1',
    lastHandAction,
  },
  ages: [{ rounds: 3, discardedCards }],
  players: {
    PLAYER1: {
      id: 'PLAYER1',
      wonder: 'PYRAMIDS_OF_GIZA',
      tableau: [],
      structurePayments: [],
      wonderPayments: [],
      wonderAbilities: [],
      ...player,
    },
    PLAYER2: {
      id: 'PLAYER2',
      hand: [],
      structurePayments: [],
      wonderPayments: [],
    },
    PLAYER3: {
      id: 'PLAYER3',
      hand: [],
      structurePayments: [],
      wonderPayments: [],
    },
  },
});

const createMoreTurnsState = ({ rounds, ...player }) => ({
  app: { currentPlayer: 'PLAYER1' },
  ages: [{ rounds, discardedCards: [] }],
  players: {
    PLAYER1: {
      id: 'PLAYER1',
      hand: ['PAWNSHOP', 'TAVERN'],
      wonder: 'PYRAMIDS_OF_GIZA',
      tableau: [],
      wonderAbilities: [],
      ...player,
    },
    PLAYER2: {
      id: 'PLAYER2',
      hand: ['ALTAR', 'SCRIPTORIUM'],
    },
    PLAYER3: {
      id: 'PLAYER3',
      hand: ['LOOM', 'WORKSHOP'],
    },
  },
});

const createLastCardsState = ({ rounds, ...player }) => ({
  app: { currentPlayer: 'PLAYER1' },
  ages: [{ rounds, discardedCards: [] }],
  players: {
    PLAYER1: {
      id: 'PLAYER1',
      hand: ['PAWNSHOP'],
      wonder: 'PYRAMIDS_OF_GIZA',
      tableau: [],
      wonderAbilities: [],
      ...player,
    },
    PLAYER2: {
      id: 'PLAYER2',
      hand: ['ALTAR'],
    },
    PLAYER3: {
      id: 'PLAYER3',
      hand: ['LOOM'],
    },
  },
});

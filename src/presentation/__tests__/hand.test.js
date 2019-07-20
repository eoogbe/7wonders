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

import PLAYERS from '__fixtures__/players';
import { getHand, getHandCallout } from '../hand';

describe('getHand', () => {
  it('return the hand app state', () => {
    const state = createState({
      hand: ['LUMBER_YARD', 'BATHS', 'LOOM', 'LUMBER_YARD'],
    });
    expect(getHand(state)).toEqual([
      {
        id: 'LUMBER_YARD',
        name: 'Lumber yard',
        type: 'RAW_MATERIAL',
        effects: ['Wood'],
        cost: [],
        payment: 0,
      },
      {
        id: 'BATHS',
        name: 'Baths',
        type: 'CIVIC',
        effects: ['3 points'],
        cost: ['Stone'],
        payment: null,
      },
      {
        id: 'LOOM',
        name: 'Loom',
        type: 'MANUFACTURED_GOOD',
        effects: ['Loom'],
        cost: [],
        payment: 0,
      },
      {
        id: 'LUMBER_YARD',
        name: 'Lumber yard',
        type: 'RAW_MATERIAL',
        effects: ['Wood'],
        cost: [],
        payment: 0,
      },
    ]);
  });
});

describe('getHandCallout', () => {
  it('selects a hand card for the callout', () => {
    const state = createState({});
    expect(getHandCallout({ cardId: 'LUMBER_YARD' })(state)).toEqual({
      name: 'Lumber yard',
      type: 'Raw material',
      effects: ['1 Wood'],
      cost: [],
      chainedStructures: [],
      payment: 'You can build this structure for free.',
    });
  });
  describe('when payment is unaffordable', () => {
    it('uses the unaffordable payment message', () => {
      const state = createState({});
      expect(getHandCallout({ cardId: 'APOTHECARY' })(state)).toEqual({
        name: 'Apothecary',
        type: 'Science',
        effects: ['Compass'],
        cost: ['1 Loom'],
        chainedStructures: ['Dispensary', 'Stables'],
        payment: 'You cannot afford to build this structure.',
      });
    });
  });
  describe('when payment has a trade cost', () => {
    it('uses the payment cost message', () => {
      const state = createState({
        hand: ['EAST_TRADING_POST', 'GUARD_TOWER', 'MINE'],
        money: 3,
      });
      expect(getHandCallout({ cardId: 'GUARD_TOWER' })(state)).toEqual({
        name: 'Guard tower',
        type: 'Military',
        effects: ['1 shield'],
        cost: ['1 Clay'],
        chainedStructures: [],
        payment: 'It will cost 2 coins to build this structure.',
      });
    });
  });
  describe('with a chained structure', () => {
    it('uses the chained structure payment message', () => {
      const state = createState({
        hand: ['FORUM', 'DISPENSARY', 'COURTHOUSE'],
        tableau: ['STOCKADE', 'TAVERN', 'APOTHECARY'],
      });
      expect(getHandCallout({ cardId: 'DISPENSARY' })(state)).toEqual({
        name: 'Dispensary',
        type: 'Science',
        effects: ['Compass'],
        cost: ['2 Ore', '1 Glass'],
        chainedStructures: ['Arena', 'Lodge'],
        payment: 'You can build this structure for free because you have Apothecary.',
      });
    });
  });
  describe('when tableau has the card', () => {
    it('uses the same card payment message', () => {
      const state = createState({
        tableau: ['STOCKADE', 'TAVERN', 'LOOM'],
        hand: ['AQUEDUCT', 'LOOM2', 'BRICKYARD'],
      });
      expect(getHandCallout({ cardId: 'LOOM2' })(state)).toEqual({
        name: 'Loom',
        type: 'Manufactured good',
        effects: ['1 Loom'],
        cost: [],
        chainedStructures: [],
        payment: 'You cannot build this structure because you already have it.',
      });
    });
  });
  describe('when can build discarded', () => {
    it('uses the affordable payment message', () => {
      const state = createState({
        wonderAbilities: ['BUILD_DISCARDED'],
      });
      expect(getHandCallout({ cardId: 'APOTHECARY' })(state)).toEqual({
        name: 'Apothecary',
        type: 'Science',
        effects: ['Compass'],
        cost: ['1 Loom'],
        chainedStructures: ['Dispensary', 'Stables'],
        payment: 'You can build this structure for free.',
      });
    });
  });
  describe('when cannot afford coin cost', () => {
    it('uses the unaffordable payment message', () => {
      const state = createState({});
      expect(getHandCallout({ cardId: 'MINE' })(state)).toEqual({
        name: 'Mine',
        type: 'Raw material',
        effects: ['1 Ore or Stone'],
        cost: ['1 coin'],
        chainedStructures: [],
        payment: 'You cannot afford to build this structure.',
      });
    });
  });
  describe('when can afford coin cost', () => {
    it('uses the payment cost message', () => {
      const state = createState({
        money: 3,
      });
      expect(getHandCallout({ cardId: 'MINE' })(state)).toEqual({
        name: 'Mine',
        type: 'Raw material',
        effects: ['1 Ore or Stone'],
        cost: ['1 coin'],
        chainedStructures: [],
        payment: 'It will cost 1 coin to build this structure.',
      });
    });
  });
});

const createState = (player) => ({
  app: { currentPlayer: 'PLAYER1' },
  ages: [{ rounds: 0, discardedCards: [] }],
  players: {
    ...PLAYERS,
    PLAYER1: {
      id: 'PLAYER1',
      wonder: 'COLOSSUS_OF_RHODES',
      completedWonderStageCount: 0,
      wonderSide: 'A',
      tableau: [],
      money: 0,
      hand: ['LUMBER_YARD', 'BATHS', 'CLAY_PIT', 'LUMBER_YARD'],
      wonderAbilities: [],
      ...player,
    },
  },
});

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

import { deal, getHand, removeHandCard, swapHands } from '../hands';

const PLAYERS_WITH_EMPTY_HANDS = {
  PLAYER1: {
    id: 'PLAYER1',
    hand: [],
  },
  PLAYER2: {
    id: 'PLAYER2',
    hand: [],
  },
  PLAYER3: {
    id: 'PLAYER3',
    hand: [],
  },
};

describe('getHand', () => {
  it('returns the hand of the player', () => {
    const state = {
      currentPlayerId: 'PLAYER1',
      ages: [{ rounds: 0, discardedCards: [] }],
      players: {
        PLAYER1: {
          id: 'PLAYER1',
          wonder: 'PYRAMIDS_OF_GIZA',
          hand: ['EAST_TRADING_POST', 'APOTHECARY', 'MINE'],
          tableau: [],
          wonderAbilities: [],
        },
        PLAYER2: {
          id: 'PLAYER2',
          tableau: [],
        },
        PLAYER3: {
          id: 'PLAYER3',
          tableau: [],
        },
      },
    };
    expect(getHand(state)).toEqual([
      {
        id: 'EAST_TRADING_POST',
        name: 'East trading post',
        type: 'TRADE',
        age: 0,
        frequencies: [1, 1, 1, 1, 2],
        resources: [],
        points: 0,
        money: 0,
        shields: 0,
        leftTradeDiscounts: [],
        rightTradeDiscounts: ['Clay', 'Ore', 'Stone', 'Wood'],
        chainedStructures: ['FORUM'],
        resourceCost: [],
        coinCost: 0,
        structureCost: [],
      },
      {
        id: 'APOTHECARY',
        name: 'Apothecary',
        type: 'SCIENCE',
        age: 0,
        frequencies: [1, 1, 2, 2, 2],
        resources: [],
        points: 0,
        money: 0,
        shields: 0,
        science: 'Compass',
        leftTradeDiscounts: [],
        rightTradeDiscounts: [],
        chainedStructures: ['DISPENSARY', 'STABLES'],
        resourceCost: ['Loom'],
        coinCost: 0,
        structureCost: [],
      },
      {
        id: 'MINE',
        name: 'Mine',
        type: 'RAW_MATERIAL',
        age: 0,
        frequencies: [0, 0, 0, 1, 1],
        resources: [{ alternatives: ['Ore', 'Stone'] }],
        points: 0,
        money: 0,
        shields: 0,
        leftTradeDiscounts: [],
        rightTradeDiscounts: [],
        chainedStructures: [],
        resourceCost: [],
        coinCost: 1,
        structureCost: [],
      },
    ]);
  });
  describe('when can build discarded structure', () => {
    it('returns the discarded cards', () => {
      const state = {
        currentPlayerId: 'PLAYER1',
        ages: [
          {
            rounds: 3,
            discardedCards: ['PRESS', 'BATHS', 'CLAY_PIT'],
          },
        ],
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            wonder: 'PYRAMIDS_OF_GIZA',
            tableau: [],
            wonderAbilities: ['BUILD_DISCARDED'],
          },
          PLAYER2: {
            id: 'PLAYER2',
            tableau: [],
          },
          PLAYER3: {
            id: 'PLAYER3',
            tableau: [],
          },
        },
      };
      expect(getHand(state)).toEqual([
        {
          id: 'PRESS',
          name: 'Press',
          type: 'MANUFACTURED_GOOD',
          age: 0,
          frequencies: [1, 1, 1, 2, 2],
          resources: [{ 'alternatives': ['Papyrus'] }],
          points: 0,
          money: 0,
          shields: 0,
          leftTradeDiscounts: [],
          rightTradeDiscounts: [],
          chainedStructures: [],
          resourceCost: [],
          coinCost: 0,
          structureCost: [],
        },
        {
          id: 'BATHS',
          name: 'Baths',
          type: 'CIVIC',
          age: 0,
          frequencies: [1, 1, 1, 1, 2],
          resources: [],
          points: 3,
          money: 0,
          shields: 0,
          leftTradeDiscounts: [],
          rightTradeDiscounts: [],
          chainedStructures: ['AQUEDUCT'],
          resourceCost: [],
          coinCost: 0,
          structureCost: [],
        },
        {
          id: 'CLAY_PIT',
          name: 'Clay Pit',
          type: 'RAW_MATERIAL',
          age: 0,
          frequencies: [1, 1, 1, 1, 1],
          resources: [{ 'alternatives': ['Clay', 'Ore'] }],
          points: 0,
          money: 0,
          shields: 0,
          leftTradeDiscounts: [],
          rightTradeDiscounts: [],
          chainedStructures: [],
          resourceCost: [],
          coinCost: 0,
          structureCost: [],
        },
      ]);
    });
  });
  describe('when is copying guild card', () => {
    it('returns the guild cards of the neighbors', () => {
      const state = {
        currentPlayerId: 'PLAYER1',
        ages: [
          { rounds: 6, discardedCards: [] },
          { rounds: 6, discardedCards: [] },
          { rounds: 6, discardedCards: [] },
        ],
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            wonder: 'PYRAMIDS_OF_GIZA',
            tableau: [],
            wonderAbilities: ['COPY_GUILD'],
          },
          PLAYER2: {
            id: 'PLAYER2',
            tableau: ['LOOM', 'BUILDERS_GUILD'],
          },
          PLAYER3: {
            id: 'PLAYER3',
            tableau: ['CRAFTSMENS_GUILD', 'PRESS'],
          },
        },
      };
      expect(getHand(state)).toEqual([
        {
          id: 'CRAFTSMENS_GUILD',
          name: "Craftsmen's guild",
          type: 'GUILD',
          age: 2,
          frequencies: [0, 0, 0, 0, 0],
          resources: [],
          points: 0,
          money: 0,
          shields: 0,
          leftTradeDiscounts: [],
          rightTradeDiscounts: [],
          chainedStructures: [],
          special: 'CRAFTSMENS_GUILD',
          resourceCost: ['Ore', 'Ore', 'Stone', 'Stone'],
          coinCost: 0,
          structureCost: [],
        },
        {
          id: 'BUILDERS_GUILD',
          name: "Builder's guild",
          type: 'GUILD',
          age: 2,
          frequencies: [0, 0, 0, 0, 0],
          resources: [],
          points: 0,
          money: 0,
          shields: 0,
          leftTradeDiscounts: [],
          rightTradeDiscounts: [],
          chainedStructures: [],
          special: 'BUILDERS_GUILD',
          resourceCost: ['Stone', 'Stone', 'Clay', 'Clay', 'Glass'],
          coinCost: 0,
          structureCost: [],
        },
      ]);
    });
  });
});


describe('deal', () => {
  it('assigns hands to each player', () => {
    const hand1 = [
      'ALTAR', 'APOTHECARY', 'BARRACKS', 'BATHS', 'CLAY_PIT', 'CLAY_POOL',
      'EAST_TRADING_POST',
    ];
    const hand2 = [
      'TIMBER_YARD', 'WEST_TRADING_POST', 'GLASSWORKS', 'GUARD_TOWER', 'LOOM',
      'LUMBER_YARD', 'MARKETPLACE',
    ];
    const hand3 = [
      'WORKSHOP', 'ORE_VEIN', 'PRESS', 'SCRIPTORIUM', 'STOCKADE', 'STONE_PIT',
      'THEATRE',
    ];
    const hands = [hand1, hand2, hand3];
    const next = deal({ hands })(PLAYERS_WITH_EMPTY_HANDS);
    expect(next).toEqual({
      PLAYER1: {
        id: 'PLAYER1',
        hand: hand1,
      },
      PLAYER2: {
        id: 'PLAYER2',
        hand: hand2,
      },
      PLAYER3: {
        id: 'PLAYER3',
        hand: hand3,
      },
    });
  });
});

describe('swapHands', () => {
  it('moves each hand to each neighbor', () => {
    const initialState = {
      PLAYER1: {
        id: 'PLAYER1',
        hand: ['ALTAR', 'BATHS'],
      },
      PLAYER2: {
        id: 'PLAYER2',
        hand: ['TIMBER_YARD', 'PAWNSHOP'],
      },
      PLAYER3: {
        id: 'PLAYER3',
        hand: ['WORKSHOP', 'SCRIPTORIUM'],
      },
    };
    const next = swapHands({ neighborIdx: 2 })(initialState);
    expect(next).toEqual({
      PLAYER1: {
        id: 'PLAYER1',
        hand: ['TIMBER_YARD', 'PAWNSHOP'],
      },
      PLAYER2: {
        id: 'PLAYER2',
        hand: ['WORKSHOP', 'SCRIPTORIUM'],
      },
      PLAYER3: {
        id: 'PLAYER3',
        hand: ['ALTAR', 'BATHS'],
      },
    });
  });
});

describe('removeHandCard', () => {
  it('removes a card from the hand', () => {
    const initialState = {
      hand: ['ALTAR', 'CLAY_PIT'],
    };
    const next = removeHandCard({ cardIdx: 1 })(initialState);
    expect(next).toEqual({
      hand: ['ALTAR'],
    });
  });
});

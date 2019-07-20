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
import {
  getNeighborGuildCards, getNeighboringIds, getNeighboringPlayers,
  getNeighboringTableauCards,
} from '../neighbors';

describe('getNeighboringIds', () => {
  it('returns the ids of the current player and its neighbors', () => {
    const state = {
      playerIds: ['PLAYER1', 'PLAYER2', 'PLAYER3'],
      currentPlayerId: 'PLAYER2',
    };
    expect(getNeighboringIds(state)).toEqual(['PLAYER1', 'PLAYER2', 'PLAYER3']);
  });
  it('when current player is at 0th index loops left neighbor', () => {
    const state = {
      playerIds: ['PLAYER1', 'PLAYER2', 'PLAYER3'],
      currentPlayerId: 'PLAYER1',
    };
    expect(getNeighboringIds(state)).toEqual(['PLAYER3', 'PLAYER1', 'PLAYER2']);
  });
  it('when current player is at last index loops right neighbor', () => {
    const state = {
      playerIds: ['PLAYER1', 'PLAYER2', 'PLAYER3'],
      currentPlayerId: 'PLAYER3',
    };
    expect(getNeighboringIds(state)).toEqual(['PLAYER2', 'PLAYER3', 'PLAYER1']);
  });
});

describe('getNeighboringPlayers', () => {
  it('selects the current player and its neighbors', () => {
    const state = {
      players: PLAYERS,
      currentPlayerId: 'PLAYER2',
    }
    expect(getNeighboringPlayers(state)).toEqual([
      {
        id: 'PLAYER1',
        wonder: 'PYRAMIDS_OF_GIZA',
        hand: ['EAST_TRADING_POST', 'APOTHECARY', 'MINE'],
        tableau: ['STOCKADE', 'TAVERN', 'GLASSWORKS'],
        completedWonderStageCount: 1,
        wonderSide: 'A',
        money: 3,
        militaryPoints: [],
        structurePayments: [],
        wonderPayments: [],
        wonderAbilities: [],
      },
      {
        id: 'PLAYER2',
        wonder: 'COLOSSUS_OF_RHODES',
        hand: ['PRESS', 'TIMBER_YARD', 'TREE_FARM'],
        tableau: ['BATHS', 'CLAY_PIT', 'ALTAR'],
        completedWonderStageCount: 2,
        wonderSide: 'A',
        money: 3,
        militaryPoints: [],
        structurePayments: [],
        wonderPayments: [],
        wonderAbilities: [],
      },
      {
        id: 'PLAYER3',
        wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
        hand: ['LUMBER_YARD', 'GUARD_TOWER', 'EXCAVATION'],
        tableau: ['BARRACKS', 'CLAY_POOL'],
        completedWonderStageCount: 3,
        wonderSide: 'A',
        money: 3,
        militaryPoints: [],
        structurePayments: [],
        wonderPayments: [],
        wonderAbilities: [],
      },
    ]);
  });
});

describe('getNeighboringTableauCards', () => {
  it('returns the tableau cards of the current player and its neighbors', () => {
    const state = {
      players: PLAYERS,
      currentPlayerId: 'PLAYER1',
    };
    expect(getNeighboringTableauCards(state)).toEqual([
      [
        {
          id: 'BARRACKS',
          name: 'Barracks',
          type: 'MILITARY',
          age: 0,
          frequencies: [1, 1, 2, 2, 2],
          resources: [],
          points: 0,
          money: 0,
          shields: 1,
          leftTradeDiscounts: [],
          rightTradeDiscounts: [],
          chainedStructures: [],
          resourceCost: ['Ore'],
          coinCost: 0,
          structureCost: [],
        },
        {
          id: 'CLAY_POOL',
          name: 'Clay pool',
          type: 'RAW_MATERIAL',
          age: 0,
          frequencies: [1, 1, 2, 2, 2],
          resources: [{ 'alternatives': ['Clay'] }],
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
      ],
      [
        {
          id: 'STOCKADE',
          name: 'Stockage',
          type: 'MILITARY',
          age: 0,
          frequencies: [1, 1, 1, 1, 2],
          resources: [],
          points: 0,
          money: 0,
          shields: 1,
          leftTradeDiscounts: [],
          rightTradeDiscounts: [],
          chainedStructures: [],
          resourceCost: ['Wood'],
          coinCost: 0,
          structureCost: [],
        },
        {
          id: 'TAVERN',
          name: 'Tavern',
          type: 'TRADE',
          age: 0,
          frequencies: [0, 1, 2, 2, 3],
          resources: [],
          points: 0,
          money: 5,
          shields: 0,
          leftTradeDiscounts: [],
          rightTradeDiscounts: [],
          chainedStructures: [],
          resourceCost: [],
          coinCost: 0,
          structureCost: [],
        },
        {
          id: 'GLASSWORKS',
          name: 'Glassworks',
          type: 'MANUFACTURED_GOOD',
          age: 0,
          frequencies: [1, 1, 1, 2, 2],
          resources: [{ 'alternatives': ['Glass'] }],
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
      ],
      [
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
          resourceCost: ['Stone'],
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
          coinCost: 1,
          structureCost: [],
        },
        {
          id: 'ALTAR',
          name: 'Altar',
          type: 'CIVIC',
          age: 0,
          frequencies: [1, 1, 2, 2, 2],
          resources: [],
          points: 2,
          money: 0,
          shields: 0,
          leftTradeDiscounts: [],
          rightTradeDiscounts: [],
          chainedStructures: ['TEMPLE'],
          resourceCost: [],
          coinCost: 0,
          structureCost: [],
        },
      ],
    ]);
  });
});

describe('getNeighborGuildCards', () => {
  it('returns the guild cards of the left and right neighbors', () => {
    const state = {
      currentPlayerId: 'PLAYER1',
      players: {
        PLAYER1: {
          id: 'PLAYER1',
          tableau: [],
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
    expect(getNeighborGuildCards(state)).toEqual([
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

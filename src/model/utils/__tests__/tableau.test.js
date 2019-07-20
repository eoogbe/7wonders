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
  getTableauCards, getTableauCardsWithoutWonder, getShareableTableauResources,
  getTableauResources,
} from '../tableau';

describe('getTableauCardsWithoutWonder', () => {
  it('returns the cards in the tableau excluding the wonder initial resource', () => {
    const tableauCards = getTableauCardsWithoutWonder({
      wonder: 'PYRAMIDS_OF_GIZA',
      tableau: ['STOCKADE', 'TAVERN', 'APOTHECARY'],
    });
    expect(tableauCards).toEqual([
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
    ]);
  });
});

describe('getTableauCards', () => {
  it('returns the cards in the tableau', () => {
    const tableauCards = getTableauCards({
      wonder: 'PYRAMIDS_OF_GIZA',
      tableau: ['STOCKADE', 'TAVERN', 'APOTHECARY'],
    });
    expect(tableauCards).toEqual([
      {
        id: 'PYRAMIDS_OF_GIZA_INITIAL',
        name: 'Pyramids of Giza',
        type: 'RAW_MATERIAL',
        age: -1,
        frequencies: [0, 0, 0, 0, 0],
        resources: [{ alternatives: ['Stone'] }],
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
    ]);
  });
});

describe('getShareableTableauResources', () => {
  it('returns the resources in the tableau open for trading', () => {
    const resources = getShareableTableauResources({
      id: 'PLAYER1',
      wonder: 'LIGHTHOUSE_OF_ALEXANDRIA',
      completedWonderStageCount: 2,
      tableau: ['STOCKADE', 'BRICKYARD', 'CLAY_PIT', 'FORUM'],
    });
    expect(resources).toEqual([
      { playerId: 'PLAYER1', alternatives: ['Glass'] },
      { playerId: 'PLAYER1', alternatives: ['Clay'] },
      { playerId: 'PLAYER1', alternatives: ['Clay'] },
      { playerId: 'PLAYER1', alternatives: ['Clay', 'Ore'] },
    ]);
  });
});

describe('getTableauResources', () => {
  it('returns all the resources in the tableau', () => {
    const resources = getTableauResources({
      id: 'PLAYER1',
      wonder: 'LIGHTHOUSE_OF_ALEXANDRIA',
      completedWonderStageCount: 2,
      wonderSide: 'A',
      tableau: ['STOCKADE', 'BRICKYARD', 'CLAY_PIT', 'FORUM'],
    });
    expect(resources).toEqual([
      { playerId: 'PLAYER1', alternatives: ['Glass'] },
      { playerId: 'PLAYER1', alternatives: ['Clay'] },
      { playerId: 'PLAYER1', alternatives: ['Clay'] },
      { playerId: 'PLAYER1', alternatives: ['Clay', 'Ore'] },
      { playerId: 'PLAYER1', alternatives: ['Glass', 'Loom', 'Papyrus'] },
      { playerId: 'PLAYER1', alternatives: ['Clay', 'Ore', 'Stone', 'Wood'] },
    ]);
  });
});

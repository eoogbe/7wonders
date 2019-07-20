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

import { getDiscardedCards } from '../ages';

describe('getDiscardedCards', () => {
  it('returns all the discarded cards since the beginning of the game', () => {
    const state = {
      ages: [
        { rounds: 6, discardedCards: ['LOOM', 'APOTHECARY', 'PRESS'] },
        { rounds: 1, discardedCards: ['BRICKYARD'] },
      ],
      currentPlayer: {
        id: 'PLAYER1',
        wonder: 'PYRAMIDS_OF_GIZA',
        tableau: ['PRESS2'],
      },
    };
    expect(getDiscardedCards(state)).toEqual([
      {
        id: 'LOOM',
        name: 'Loom',
        type: 'MANUFACTURED_GOOD',
        age: 0,
        frequencies: [1, 1, 1, 2, 2],
        resources: [{ alternatives: ['Loom'] }],
        points: 0,
        money: 0,
        shields: 0,
        leftTradeDiscounts: [],
        rightTradeDiscounts: [],
        chainedStructures: [],
        resourceCost: [],
        coinCost: 0,
        structureCost: []
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
        structureCost: []
      },
      {
        id: 'BRICKYARD',
        name: 'Brickyard',
        type: 'RAW_MATERIAL',
        age: 1,
        frequencies: [1, 2, 2, 2, 2],
        resources: [
          { alternatives: ['Clay'] },
          { alternatives: ['Clay'] }
        ],
        points: 0,
        money: 0,
        shields: 0,
        leftTradeDiscounts: [],
        rightTradeDiscounts: [],
        chainedStructures: [],
        resourceCost: [],
        coinCost: 1,
        structureCost: []
      },
    ]);
  });
});

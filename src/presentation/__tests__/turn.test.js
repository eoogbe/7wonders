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
  getAddMoneyCost, getBuildStructureCost, getBuildWonderCost,
} from '../turn';

describe('getBuildStructureCost', () => {
  it('selects the cost of building a structure', () => {
    const state = createState({
      selectedCardId: 'LOOM',
      money: 3,
      tableau: ['APOTHECARY', 'BRICKYARD', 'CLAY_POOL'],
    });
    expect(getBuildStructureCost(state)).toBe('0 coins');
  });
});

describe('getBuildWonderCost', () => {
  it('selects the cost of building the next stage of the wonder', () => {
    const state = createState({
      selectedCardId: 'LOOM',
      tableau: ['APOTHECARY', 'BRICKYARD', 'CLAY_POOL'],
      completedWonderStageCount: 1,
    });
    expect(getBuildWonderCost(state)).toBe('0 coins');
  });
});

describe('getAddMoneyCost', () => {
  it('selects the cost of adding money', () => {
    const state = createState({ selectedCardId: 'LOOM' });
    expect(getAddMoneyCost(state)).toBe('0 coins');
  });
});

const createState = ({ selectedCardId, ...player }) => ({
  app: {
    currentPlayer: 'PLAYER1',
    selectedCardId,
  },
  players: {
    PLAYER1: {
      id: 'PLAYER1',
      wonder: 'COLOSSUS_OF_RHODES',
      wonderSide: 'A',
      money: 3,
      wonderAbilities: [],
      ...player,
    },
    PLAYER2: {
      id: 'PLAYER2',
      wonder: 'PYRAMIDS_OF_GIZA',
      tableau: [],
    },
    PLAYER3: {
      id: 'PLAYER3',
      wonder: 'COLOSSUS_OF_RHODES',
      tableau: [],
    },
  },
});

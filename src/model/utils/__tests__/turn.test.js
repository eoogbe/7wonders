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
  it('without selected card cannot build structure', () => {
    const state = createState({
      selectedCardId: null,
      tableau: ['APOTHECARY', 'BRICKYARD', 'CLAY_POOL'],
    });
    expect(getBuildStructureCost(state)).toBe(null);
  });
  it('with card already in tableau cannot build structure', () => {
    const state = createState({
      selectedCardId: 'LOOM2',
      money: 3,
      tableau: ['APOTHECARY', 'BRICKYARD', 'LOOM', 'CLAY_POOL'],
    });
    expect(getBuildStructureCost(state)).toBe(null);
  });
  it('without enough resources to afford selected card cannot build structure', () => {
    const state = createState({
      selectedCardId: 'APOTHECARY',
      money: 3,
      tableau: ['BATHS', 'BRICKYARD', 'CLAY_POOL'],
    });
    expect(getBuildStructureCost(state)).toBe(null);
  });
  it('without enough money to afford selected card cannot build structure', () => {
    const state = createState({
      selectedCardId: 'BRICKYARD',
      money: 0,
      tableau: ['APOTHECARY', 'CLAY_POOL'],
    });
    expect(getBuildStructureCost(state)).toBe(null);
  });
  it('when structure cost paid can build structure', () => {
    const state = createState({
      selectedCardId: 'AQUEDUCT',
      money: 0,
      tableau: ['BATHS'],
    });
    expect(getBuildStructureCost(state)).toBe(0);
  });
  it('with enough resources and money to afford selected card can build structure', () => {
    const state = createState({
      selectedCardId: 'LOOM',
      money: 3,
      tableau: ['APOTHECARY', 'BRICKYARD', 'CLAY_POOL'],
    });
    expect(getBuildStructureCost(state)).toBe(0);
  });
  it('when can build discarded structure ignores coin cost', () => {
    const state = createState({
      selectedCardId: 'BRICKYARD',
      money: 0,
      tableau: ['APOTHECARY', 'CLAY_POOL'],
      wonderAbilities: ['BUILD_DISCARDED'],
    });
    expect(getBuildStructureCost(state)).toBe(0);
  });
});

describe('getBuildWonderCost', () => {
  it('without selected card cannot build wonder', () => {
    const state = createState({
      selectedCardId: null,
      tableau: ['APOTHECARY', 'BRICKYARD', 'CLAY_POOL'],
      completedWonderStageCount: 1,
    });
    expect(getBuildWonderCost(state)).toBe(null);
  });
  it('when all wonder stages completed cannot build wonder', () => {
    const state = createState({
      selectedCardId: 'LOOM',
      tableau: ['APOTHECARY', 'BRICKYARD', 'CLAY_POOL'],
      completedWonderStageCount: 3,
    });
    expect(getBuildWonderCost(state)).toBe(null);
  });
  it('without enough resources to afford wonder cannot build wonder', () => {
    const state = createState({
      selectedCardId: 'LOOM',
      tableau: ['APOTHECARY', 'CLAY_POOL'],
      completedWonderStageCount: 1,
    });
    expect(getBuildWonderCost(state)).toBe(null);
  });
  it('with enough resources to afford next stage of wonder can build wonder', () => {
    const state = createState({
      selectedCardId: 'LOOM',
      tableau: ['APOTHECARY', 'BRICKYARD', 'CLAY_POOL'],
      completedWonderStageCount: 1,
    });
    expect(getBuildWonderCost(state)).toBe(0);
  });
});

describe('getAddMoneyCost', () => {
  it('with selected card can add money', () => {
    const state = createState({ selectedCardId: 'LOOM' });
    expect(getAddMoneyCost(state)).toBe(0);
  });
  it('without selected card cannot add money', () => {
    const state = createState({ selectedCardId: null });
    expect(getAddMoneyCost(state)).toBe(null);
  });
});

const createState = ({ selectedCardId, ...player }) => ({
  selectedCardId,
  currentPlayerId: 'PLAYER1',
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
      wonder: 'HANGING_GARDEN_OF_BABYLON',
      tableau: [],
    },
  },
});

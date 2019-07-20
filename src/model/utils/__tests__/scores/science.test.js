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

import { getPlayerScores } from '../../scores';

describe('getPlayerScores', () => {
  it('calculates the science set points', () => {
    const state = createState({
      tableau: ['WORKSHOP', 'SCRIPTORIUM', 'APOTHECARY'],
    });
    expect(getPlayerScores(state)).toEqual({
      winner: 'PYRAMIDS_OF_GIZA',
      playerScores: [
        {
          player: 'PYRAMIDS_OF_GIZA',
          scores: [
            { score: -1, type: 'MILITARY' },
            { score: 0, type: 'MONEY' },
            { score: 3, type: 'WONDER' },
            { score: 0, type: 'CIVIC' },
            { score: 10, type: 'SCIENCE' },
            { score: 0, type: 'TRADE' },
            { score: 0, type: 'GUILD' },
            { score: 12, type: 'TOTAL' },
          ],
        },
        {
          player: 'COLOSSUS_OF_RHODES',
          scores: [
            { score: 2, type: 'MILITARY' },
            { score: 1, type: 'MONEY' },
            { score: 3, type: 'WONDER' },
            { score: 5, type: 'CIVIC' },
            { score: 0, type: 'SCIENCE' },
            { score: 0, type: 'TRADE' },
            { score: 0, type: 'GUILD' },
            { score: 11, type: 'TOTAL' },
          ],
        },
        {
          player: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
          scores: [
            { score: -1, type: 'MILITARY' },
            { score: 2, type: 'MONEY' },
            { score: 10, type: 'WONDER' },
            { score: 0, type: 'CIVIC' },
            { score: 0, type: 'SCIENCE' },
            { score: 0, type: 'TRADE' },
            { score: 0, type: 'GUILD' },
            { score: 11, type: 'TOTAL' },
          ],
        },
      ],
    });
  });
  it('calculates the science symbol points', () => {
    const state = createState({
      tableau: ['DISPENSARY', 'LODGE', 'ACADEMY'],
    });
    expect(getPlayerScores(state)).toEqual({
      winner: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
      playerScores: [
        {
          player: 'PYRAMIDS_OF_GIZA',
          scores: [
            { score: -1, type: 'MILITARY' },
            { score: 0, type: 'MONEY' },
            { score: 3, type: 'WONDER' },
            { score: 0, type: 'CIVIC' },
            { score: 9, type: 'SCIENCE' },
            { score: 0, type: 'TRADE' },
            { score: 0, type: 'GUILD' },
            { score: 11, type: 'TOTAL' },
          ],
        },
        {
          player: 'COLOSSUS_OF_RHODES',
          scores: [
            { score: 2, type: 'MILITARY' },
            { score: 1, type: 'MONEY' },
            { score: 3, type: 'WONDER' },
            { score: 5, type: 'CIVIC' },
            { score: 0, type: 'SCIENCE' },
            { score: 0, type: 'TRADE' },
            { score: 0, type: 'GUILD' },
            { score: 11, type: 'TOTAL' },
          ],
        },
        {
          player: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
          scores: [
            { score: -1, type: 'MILITARY' },
            { score: 2, type: 'MONEY' },
            { score: 10, type: 'WONDER' },
            { score: 0, type: 'CIVIC' },
            { score: 0, type: 'SCIENCE' },
            { score: 0, type: 'TRADE' },
            { score: 0, type: 'GUILD' },
            { score: 11, type: 'TOTAL' },
          ],
        },
      ],
    });
  });
  it('calculates the points for the SCIENTISTS_GUILD card', () => {
    const state = createState({
      tableau: ['WORKSHOP', 'SCRIPTORIUM', 'SCIENTISTS_GUILD'],
    });
    expect(getPlayerScores(state)).toEqual({
      winner: 'PYRAMIDS_OF_GIZA',
      playerScores: [
        {
          player: 'PYRAMIDS_OF_GIZA',
          scores: [
            { score: -1, type: 'MILITARY' },
            { score: 0, type: 'MONEY' },
            { score: 3, type: 'WONDER' },
            { score: 0, type: 'CIVIC' },
            { score: 10, type: 'SCIENCE' },
            { score: 0, type: 'TRADE' },
            { score: 0, type: 'GUILD' },
            { score: 12, type: 'TOTAL' },
          ],
        },
        {
          player: 'COLOSSUS_OF_RHODES',
          scores: [
            { score: 2, type: 'MILITARY' },
            { score: 1, type: 'MONEY' },
            { score: 3, type: 'WONDER' },
            { score: 5, type: 'CIVIC' },
            { score: 0, type: 'SCIENCE' },
            { score: 0, type: 'TRADE' },
            { score: 0, type: 'GUILD' },
            { score: 11, type: 'TOTAL' },
          ],
        },
        {
          player: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
          scores: [
            { score: -1, type: 'MILITARY' },
            { score: 2, type: 'MONEY' },
            { score: 10, type: 'WONDER' },
            { score: 0, type: 'CIVIC' },
            { score: 0, type: 'SCIENCE' },
            { score: 0, type: 'TRADE' },
            { score: 0, type: 'GUILD' },
            { score: 11, type: 'TOTAL' },
          ],
        },
      ],
    });
  });
  it('calculates the points for the extra science wonder ability', () => {
    const state = createState({
      wonder: 'HANGING_GARDEN_OF_BABYLON',
      completedWonderStageCount: 2,
      tableau: ['WORKSHOP', 'SCRIPTORIUM'],
    });
    expect(getPlayerScores(state)).toEqual({
      winner: 'HANGING_GARDEN_OF_BABYLON',
      playerScores: [
        {
          player: 'HANGING_GARDEN_OF_BABYLON',
          scores: [
            { score: -1, type: 'MILITARY' },
            { score: 0, type: 'MONEY' },
            { score: 3, type: 'WONDER' },
            { score: 0, type: 'CIVIC' },
            { score: 10, type: 'SCIENCE' },
            { score: 0, type: 'TRADE' },
            { score: 0, type: 'GUILD' },
            { score: 12, type: 'TOTAL' },
          ],
        },
        {
          player: 'COLOSSUS_OF_RHODES',
          scores: [
            { score: 2, type: 'MILITARY' },
            { score: 1, type: 'MONEY' },
            { score: 3, type: 'WONDER' },
            { score: 5, type: 'CIVIC' },
            { score: 0, type: 'SCIENCE' },
            { score: 0, type: 'TRADE' },
            { score: 0, type: 'GUILD' },
            { score: 11, type: 'TOTAL' },
          ],
        },
        {
          player: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
          scores: [
            { score: -1, type: 'MILITARY' },
            { score: 2, type: 'MONEY' },
            { score: 10, type: 'WONDER' },
            { score: 0, type: 'CIVIC' },
            { score: 0, type: 'SCIENCE' },
            { score: 0, type: 'TRADE' },
            { score: 0, type: 'GUILD' },
            { score: 11, type: 'TOTAL' },
          ],
        },
      ],
    });
  });
});

const createState = (player) => ({
  currentPlayerId: 'PLAYER1',
  players: {
    PLAYER1: {
      id: 'PLAYER1',
      wonder: 'PYRAMIDS_OF_GIZA',
      completedWonderStageCount: 1,
      wonderSide: 'A',
      money: 0,
      militaryPoints: [0, -1],
      ...player,
    },
    PLAYER2: {
      id: 'PLAYER2',
      wonder: 'COLOSSUS_OF_RHODES',
      tableau: ['BATHS', 'CLAY_PIT', 'ALTAR'],
      completedWonderStageCount: 2,
      wonderSide: 'A',
      money: 3,
      militaryPoints: [1, 1],
    },
    PLAYER3: {
      id: 'PLAYER3',
      wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
      tableau: ['BARRACKS', 'CLAY_POOL'],
      completedWonderStageCount: 3,
      wonderSide: 'A',
      money: 6,
      militaryPoints: [-1, 0],
    },
  },
});

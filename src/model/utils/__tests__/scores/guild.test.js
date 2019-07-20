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
  it('calculates the points for the BUILDERS_GUILD card', () => {
    const state = createState({
      tableau: ['STOCKADE', 'TAVERN', 'GLASSWORKS', 'BUILDERS_GUILD'],
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
            { score: 0, type: 'SCIENCE' },
            { score: 0, type: 'TRADE' },
            { score: 6, type: 'GUILD' },
            { score: 8, type: 'TOTAL' },
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
  it('calculates the points for the CRAFTSMENS_GUILD card', () => {
    const state = {
      currentPlayerId: 'PLAYER1',
      players: {
        PLAYER1: {
          id: 'PLAYER1',
          wonder: 'PYRAMIDS_OF_GIZA',
          tableau: ['STOCKADE', 'TAVERN', 'GLASSWORKS', 'CRAFTSMENS_GUILD'],
          completedWonderStageCount: 1,
          wonderSide: 'A',
          money: 0,
          militaryPoints: [0, -1],
        },
        PLAYER2: {
          id: 'PLAYER2',
          wonder: 'COLOSSUS_OF_RHODES',
          tableau: ['BATHS', 'CLAY_PIT', 'ALTAR', 'LOOM', 'PRESS'],
          completedWonderStageCount: 2,
          wonderSide: 'A',
          money: 3,
          militaryPoints: [1, 1],
        },
        PLAYER3: {
          id: 'PLAYER3',
          wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
          tableau: ['BARRACKS', 'CLAY_POOL', 'PRESS'],
          completedWonderStageCount: 3,
          wonderSide: 'A',
          money: 6,
          militaryPoints: [-1, 0],
        },
      },
    };
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
            { score: 0, type: 'SCIENCE' },
            { score: 0, type: 'TRADE' },
            { score: 6, type: 'GUILD' },
            { score: 8, type: 'TOTAL' },
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
  it('calculates the points for the MAGISTRATES_GUILD card', () => {
    const state = createState({
      tableau: ['STOCKADE', 'TAVERN', 'GLASSWORKS', 'MAGISTRATES_GUILD'],
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
            { score: 0, type: 'SCIENCE' },
            { score: 0, type: 'TRADE' },
            { score: 2, type: 'GUILD' },
            { score: 4, type: 'TOTAL' },
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
  it('calculates the points for the PHILOSOPHERS_GUILD card', () => {
    const state = {
      currentPlayerId: 'PLAYER1',
      players: {
        PLAYER1: {
          id: 'PLAYER1',
          wonder: 'PYRAMIDS_OF_GIZA',
          tableau: ['STOCKADE', 'TAVERN', 'GLASSWORKS', 'PHILOSOPHERS_GUILD'],
          completedWonderStageCount: 1,
          wonderSide: 'A',
          money: 0,
          militaryPoints: [0, -1],
        },
        PLAYER2: {
          id: 'PLAYER2',
          wonder: 'COLOSSUS_OF_RHODES',
          tableau: ['BATHS', 'CLAY_PIT', 'ALTAR', 'APOTHECARY'],
          completedWonderStageCount: 2,
          wonderSide: 'A',
          money: 3,
          militaryPoints: [1, 1],
        },
        PLAYER3: {
          id: 'PLAYER3',
          wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
          tableau: ['BARRACKS', 'CLAY_POOL', 'WORKSHOP', 'SCRIPTORIUM'],
          completedWonderStageCount: 3,
          wonderSide: 'A',
          money: 6,
          militaryPoints: [-1, 0],
        },
      },
    };
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
            { score: 0, type: 'SCIENCE' },
            { score: 0, type: 'TRADE' },
            { score: 3, type: 'GUILD' },
            { score: 5, type: 'TOTAL' },
          ],
        },
        {
          player: 'COLOSSUS_OF_RHODES',
          scores: [
            { score: 2, type: 'MILITARY' },
            { score: 1, type: 'MONEY' },
            { score: 3, type: 'WONDER' },
            { score: 5, type: 'CIVIC' },
            { score: 1, type: 'SCIENCE' },
            { score: 0, type: 'TRADE' },
            { score: 0, type: 'GUILD' },
            { score: 12, type: 'TOTAL' },
          ],
        },
        {
          player: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
          scores: [
            { score: -1, type: 'MILITARY' },
            { score: 2, type: 'MONEY' },
            { score: 10, type: 'WONDER' },
            { score: 0, type: 'CIVIC' },
            { score: 2, type: 'SCIENCE' },
            { score: 0, type: 'TRADE' },
            { score: 0, type: 'GUILD' },
            { score: 13, type: 'TOTAL' },
          ],
        },
      ],
    });
  });
  it('calculates the points for the SHIPOWNERS_GUILD card', () => {
    const state = createState({
      tableau: ['STOCKADE', 'LUMBER_YARD', 'GLASSWORKS', 'SHIPOWNERS_GUILD'],
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
            { score: 0, type: 'SCIENCE' },
            { score: 0, type: 'TRADE' },
            { score: 3, type: 'GUILD' },
            { score: 5, type: 'TOTAL' },
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
  it('calculates the points for the SPIES_GUILD card', () => {
    const state = createState({
      tableau: ['STOCKADE', 'TAVERN', 'GLASSWORKS', 'SPIES_GUILD'],
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
            { score: 0, type: 'SCIENCE' },
            { score: 0, type: 'TRADE' },
            { score: 1, type: 'GUILD' },
            { score: 3, type: 'TOTAL' },
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
  it('calculates the points for the STRATEGISTS_GUILD card', () => {
    const state = createState({
      tableau: ['STOCKADE', 'TAVERN', 'GLASSWORKS', 'STRATEGISTS_GUILD'],
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
            { score: 0, type: 'SCIENCE' },
            { score: 0, type: 'TRADE' },
            { score: 1, type: 'GUILD' },
            { score: 3, type: 'TOTAL' },
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
  it('calculates the points for the TRADERS_GUILD card', () => {
    const state = {
      currentPlayerId: 'PLAYER1',
      players: {
        PLAYER1: {
          id: 'PLAYER1',
          wonder: 'PYRAMIDS_OF_GIZA',
          tableau: ['STOCKADE', 'TAVERN', 'GLASSWORKS', 'TRADERS_GUILD'],
          completedWonderStageCount: 1,
          wonderSide: 'A',
          money: 0,
          militaryPoints: [0, -1],
        },
        PLAYER2: {
          id: 'PLAYER2',
          wonder: 'COLOSSUS_OF_RHODES',
          tableau: ['BATHS', 'CLAY_PIT', 'ALTAR', 'EAST_TRADING_POST'],
          completedWonderStageCount: 2,
          wonderSide: 'A',
          money: 3,
          militaryPoints: [1, 1],
        },
        PLAYER3: {
          id: 'PLAYER3',
          wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
          tableau: [
            'BARRACKS', 'CLAY_POOL', 'WEST_TRADING_POST', 'MARKETPLACE',
          ],
          completedWonderStageCount: 3,
          wonderSide: 'A',
          money: 6,
          militaryPoints: [-1, 0],
        },
      },
    };
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
            { score: 0, type: 'SCIENCE' },
            { score: 0, type: 'TRADE' },
            { score: 3, type: 'GUILD' },
            { score: 5, type: 'TOTAL' },
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
  it('calculates the points for the WORKERS_GUILD card', () => {
    const state = createState({
      tableau: ['STOCKADE', 'TAVERN', 'GLASSWORKS', 'WORKERS_GUILD'],
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
            { score: 0, type: 'SCIENCE' },
            { score: 0, type: 'TRADE' },
            { score: 2, type: 'GUILD' },
            { score: 4, type: 'TOTAL' },
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

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
import { fight, getConflicts, getShields } from '../military';

describe('getShields', () => {
  it('returns all the shields from the tableau and wonder', () => {
    const player = {
      id: 'PLAYER1',
      wonder: 'COLOSSUS_OF_RHODES',
      completedWonderStageCount: 2,
      wonderSide: 'A',
      tableau: ['LUMBER_YARD', 'STOCKADE', 'WALLS', 'TAVERN'],
    };
    expect(getShields(player)).toBe(5);
  });
});

describe('getConflicts', () => {
  it('adds up the military points for the current age', () => {
    const state = {
      currentPlayerId: 'PLAYER1',
      players: PLAYERS,
      ageIdx: 1,
    };
    expect(getConflicts(state)).toEqual([
      { shields: 1, points: 0 },
      { shields: 1 },
      { shields: 2, points: -1 },
    ]);
  });
});

describe('fight', () => {
  it('adds the military points from all conflicts in the current age', () => {
    const initialState = {
      PLAYER1: {
        id: 'PLAYER1',
        wonder: 'PYRAMIDS_OF_GIZA',
        completedWonderStageCount: 0,
        wonderSide: 'A',
        tableau: ['STOCKADE', 'BATHS'],
        militaryPoints: [],
      },
      PLAYER2: {
        id: 'PLAYER2',
        wonder: 'COLOSSUS_OF_RHODES',
        completedWonderStageCount: 2,
        wonderSide: 'A',
        tableau: ['ALTAR', 'APOTHECARY'],
        militaryPoints: [],
      },
      PLAYER3: {
        id: 'PLAYER3',
        wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
        completedWonderStageCount: 0,
        wonderSide: 'A',
        tableau: ['TAVERN', 'PAWNSHOP'],
        militaryPoints: [],
      },
    };
    const next = fight({ ageIdx: 2 })(initialState);
    expect(next).toEqual({
      PLAYER1: {
        id: 'PLAYER1',
        wonder: 'PYRAMIDS_OF_GIZA',
        completedWonderStageCount: 0,
        wonderSide: 'A',
        tableau: ['STOCKADE', 'BATHS'],
        militaryPoints: [5, -1],
      },
      PLAYER2: {
        id: 'PLAYER2',
        wonder: 'COLOSSUS_OF_RHODES',
        completedWonderStageCount: 2,
        wonderSide: 'A',
        tableau: ['ALTAR', 'APOTHECARY'],
        militaryPoints: [5, 5],
      },
      PLAYER3: {
        id: 'PLAYER3',
        wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
        completedWonderStageCount: 0,
        wonderSide: 'A',
        tableau: ['TAVERN', 'PAWNSHOP'],
        militaryPoints: [-1, -1],
      },
    });
  });
});

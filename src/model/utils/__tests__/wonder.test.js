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
  getCompletedWonderStages, hasCompletedWonderAbility, selectWonder,
} from '../wonder';

describe('getCompletedWonderStages', () => {
  it('returns the completed stages of the wonder', () => {
    const state = {
      id: 'PLAYER1',
      wonder: 'PYRAMIDS_OF_GIZA',
      completedWonderStageCount: 2,
      wonderSide: 'A',
    };
    expect(getCompletedWonderStages(state)).toEqual([
      {
        points: 3,
        money: 0,
        shields: 0,
        resources: [],
        leftTradeDiscounts: [],
        rightTradeDiscounts: [],
        cost: ['Stone', 'Stone'],
      },
      {
        points: 5,
        money: 0,
        shields: 0,
        resources: [],
        leftTradeDiscounts: [],
        rightTradeDiscounts: [],
        cost: ['Wood', 'Wood', 'Wood'],
      },
    ]);
  });
});

describe('hasCompletedWonderAbility', () => {
  it('when wonder ability in completed stages returns true', () => {
    const player = {
      id: 'PLAYER1',
      wonder: 'STATUE_OF_ZEUS_IN_OLYMPIA',
      completedWonderStageCount: 3,
      wonderSide: 'A',
    };
    const result = hasCompletedWonderAbility({
      player,
      wonderAbility: 'BUILD_FREE',
    });
    expect(result).toBe(true);
  });
  it('when wonder ability not in completed stages returns false', () => {
    const player = {
      id: 'PLAYER1',
      wonder: 'STATUE_OF_ZEUS_IN_OLYMPIA',
      completedWonderStageCount: 1,
      wonderSide: 'A',
    };
    const result = hasCompletedWonderAbility({
      player,
      wonderAbility: 'BUILD_FREE',
    });
    expect(result).toBe(false);
  });
});

describe('selectWonder', () => {
  it('sets the wonder for the current player', () => {
    const players = {
      PLAYER1: {
        id: 'PLAYER1',
        wonder: 'PYRAMIDS_OF_GIZA',
      },
      PLAYER2: {
        id: 'PLAYER2',
        wonder: 'COLOSSUS_OF_RHODES',
      },
      PLAYER3: {
        id: 'PLAYER3',
        wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
      },
    };
    const nextPlayers = selectWonder({
      currentPlayerId: 'PLAYER1',
      wonderId: 'HANGING_GARDEN_OF_BABYLON',
    })(players);
    expect(nextPlayers).toEqual({
      PLAYER1: {
        id: 'PLAYER1',
        wonder: 'HANGING_GARDEN_OF_BABYLON',
      },
      PLAYER2: {
        id: 'PLAYER2',
        wonder: 'COLOSSUS_OF_RHODES',
      },
      PLAYER3: {
        id: 'PLAYER3',
        wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
      },
    });
  });
  describe('when same wonder as another player', () => {
    it('swaps the wonders', () => {
      const players = {
        PLAYER1: {
          id: 'PLAYER1',
          wonder: 'PYRAMIDS_OF_GIZA',
        },
        PLAYER2: {
          id: 'PLAYER2',
          wonder: 'COLOSSUS_OF_RHODES',
        },
        PLAYER3: {
          id: 'PLAYER3',
          wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
        },
      };
      const nextPlayers = selectWonder({
        currentPlayerId: 'PLAYER1',
        wonderId: 'COLOSSUS_OF_RHODES',
      })(players);
      expect(nextPlayers).toEqual({
        PLAYER1: {
          id: 'PLAYER1',
          wonder: 'COLOSSUS_OF_RHODES',
        },
        PLAYER2: {
          id: 'PLAYER2',
          wonder: 'PYRAMIDS_OF_GIZA',
        },
        PLAYER3: {
          id: 'PLAYER3',
          wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
        },
      });
    });
  });
});

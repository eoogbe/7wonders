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
  getPlayerWonders, getWonderCallout, getWonderChooserStages,
  getWonderChooserWonders, getWonderChooserWonderSide, getWonderStages,
} from '../wonder';

describe('getWonderStages', () => {
  it('selects the stages of the current wonder', () => {
    const state = createState({
      wonder: 'PYRAMIDS_OF_GIZA',
      completedWonderStageCount: 1,
      wonderSide: 'A',
      money: 3,
      tableau: ['FOREST_CAVE', 'LUMBER_YARD', 'TIMBER_YARD'],
    });
    expect(getWonderStages(state)).toEqual([
      {
        effects: ['3 points'],
        cost: ['Stone', 'Stone'],
        isCompleted: true,
        isNext: false,
        payment: 0,
      },
      {
        effects: ['5 points'],
        cost: ['Wood', 'Wood', 'Wood'],
        isCompleted: false,
        isNext: true,
        payment: 0,
      },
      {
        effects: ['7 points'],
        cost: ['Stone', 'Stone', 'Stone', 'Stone'],
        isCompleted: false,
        isNext: false,
        payment: 0,
      },
    ]);
  });
});

describe('getWonderCallout', () => {
  it('selects a wonder stage of the current player from the callout', () => {
    const state = createState({
      wonder: 'PYRAMIDS_OF_GIZA',
      completedWonderStageCount: 0,
      wonderSide: 'A',
    });
    expect(getWonderCallout({ stageIdx: 0 })(state)).toEqual({
      cost: ['2 Stone'],
      effects: ['3 points'],
      payment: 'It will cost 2 coins to build this stage.',
    });
  });
  describe('when the payment is affordable', () => {
    it('uses the affordable payment message', () => {
      const state = createState({
        wonder: 'PYRAMIDS_OF_GIZA',
        completedWonderStageCount: 1,
        wonderSide: 'A',
        tableau: ['FOREST_CAVE', 'LUMBER_YARD', 'TIMBER_YARD'],
      });
      expect(getWonderCallout({ stageIdx: 1 })(state)).toEqual({
        cost: ['3 Wood'],
        effects: ['5 points'],
        payment: 'You can build this stage for free.',
      });
    });
  });
  describe('when the payment is unaffordable', () => {
    it('uses the unaffordable payment message', () => {
      const state = createState({
        wonder: 'PYRAMIDS_OF_GIZA',
        completedWonderStageCount: 1,
        wonderSide: 'A',
      });
      expect(getWonderCallout({ stageIdx: 1 })(state)).toEqual({
        cost: ['3 Wood'],
        effects: ['5 points'],
        payment: 'You cannot afford to build this stage.',
      });
    });
  });
  describe('when the stage has been built', () => {
    it('indicates the stage has been built in the payment message', () => {
      const state = createState({
        wonder: 'PYRAMIDS_OF_GIZA',
        completedWonderStageCount: 1,
        wonderSide: 'A',
      });
      expect(getWonderCallout({ stageIdx: 0 })(state)).toEqual({
        cost: ['2 Stone'],
        effects: ['3 points'],
        payment: 'You have built this stage.',
      });
    });
  });
  describe('when the stage is needs a previous stage to be built', () => {
    it('indicates the stage is not ready to be built in the payment message', () => {
      const state = createState({
        wonder: 'PYRAMIDS_OF_GIZA',
        completedWonderStageCount: 1,
        wonderSide: 'A',
      });
      expect(getWonderCallout({ stageIdx: 2 })(state)).toEqual({
        cost: ['4 Stone'],
        effects: ['7 points'],
        payment: 'You need to build Stage 2 before building this stage.',
      });
    });
  });
});

describe('getPlayerWonders', () => {
  it('selects the wonders of the game players', () => {
    const state = createState({});
    expect(getPlayerWonders(state)).toEqual([
      {
        id: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
        name: 'Temple of Artemis in Ephesus (A)',
        playerId: 'PLAYER3',
        isCurrentPlayer: false,
      },
      {
        id: 'PYRAMIDS_OF_GIZA',
        name: 'Pyramids of Giza (A)',
        playerId: 'PLAYER1',
        isCurrentPlayer: true,
      },
      {
        id: 'COLOSSUS_OF_RHODES',
        name: 'Colossus of Rhodes (A)',
        playerId: 'PLAYER2',
        isCurrentPlayer: false,
      },
    ]);
  });
});

describe('getWonderChooserWonders', () => {
  it('selects the wonders of the chosen player', () => {
    const state = createState({
      wonder: 'PYRAMIDS_OF_GIZA',
    });
    expect(getWonderChooserWonders(state)).toEqual([
      {
        id: 'COLOSSUS_OF_RHODES',
        name: 'Colossus of Rhodes',
        isSelected: false,
      },
      {
        id: 'HANGING_GARDEN_OF_BABYLON',
        name: 'Hanging garden of Babylon',
        isSelected: false,
      },
      {
        id: 'LIGHTHOUSE_OF_ALEXANDRIA',
        name: 'Lighthouse of Alexandria',
        isSelected: false,
      },
      {
        id: 'MAUSOLEUM_OF_HALICARNASSUS',
        name: 'Mausoleum of Halicarnassus',
        isSelected: false,
      },
      {
        id: 'PYRAMIDS_OF_GIZA',
        name: 'Pyramids of Giza',
        isSelected: true,
      },
      {
        id: 'STATUE_OF_ZEUS_IN_OLYMPIA',
        name: 'Statue of Zeus in Olympia',
        isSelected: false,
      },
      {
        id: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
        name: 'Temple of Artemis in Ephesus',
        isSelected: false,
      },
    ]);
  });
});

describe('getWonderChooserStages', () => {
  it('selects the wonder stages of the chosen player', () => {
    const state = createState({
      wonder: 'PYRAMIDS_OF_GIZA',
    });
    expect(getWonderChooserStages(state)).toEqual([
      {
        effects: ['3 points'],
        cost: ['Stone', 'Stone'],
      },
      {
        effects: ['5 points'],
        cost: ['Wood', 'Wood', 'Wood'],
      },
      {
        effects: ['7 points'],
        cost: ['Stone', 'Stone', 'Stone', 'Stone'],
      },
    ]);
  });
});

describe('getWonderChooserWonderSide', () => {
  it('selects the wonder side of the chosen player', () => {
    const state = createState({
      wonderSide: 'B',
    });
    expect(getWonderChooserWonderSide(state)).toBe('B');
  });
});

const createState = (player) => ({
  app: {
    currentPlayer: 'PLAYER1',
    wonderChooserPlayer: 'PLAYER1',
  },
  players: {
    PLAYER1: {
      id: 'PLAYER1',
      wonder: 'PYRAMIDS_OF_GIZA',
      completedWonderStageCount: 1,
      wonderSide: 'A',
      tableau: ['STOCKADE', 'TAVERN', 'GLASSWORKS'],
      money: 3,
      ...player,
    },
    PLAYER2: {
      id: 'PLAYER2',
      wonder: 'COLOSSUS_OF_RHODES',
      wonderSide: 'A',
      tableau: ['BATHS', 'CLAY_PIT', 'ALTAR'],
    },
    PLAYER3: {
      id: 'PLAYER3',
      wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
      wonderSide: 'A',
      tableau: ['BARRACKS', 'CLAY_POOL', 'EXCAVATION'],
    },
  },
});

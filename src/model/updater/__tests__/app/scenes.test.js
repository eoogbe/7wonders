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
  BUILD_STRUCTURE, BUILD_WONDER, addMoney, buildStructure, buildWonder,
  chooseNeighbor, copyGuild, pickPlayerCount, scoreGame, startAge,
  viewGameBoard, viewWonderChooser, viewWonderPanel,
} from 'model/actions';
import updater from '../../app';

const SINGLE_PAYMENT = [{ payment: [], leftCost: 0, rightCost: 0 }];

describe('pickPlayerCount', () => {
  it('changes to the WONDER_PANEL scene', () => {
    const initialState = {
      app: { scene: 'PLAYER_PICKER' },
      players: {},
    };
    const next = updater(pickPlayerCount())(initialState);
    expect(next.app).toEqual({ scene: 'WONDER_PANEL' });
  });
});

describe('viewWonderPanel', () => {
  it('changes to the WONDER_PANEL scene', () => {
    const initialState = {
      app: { scene: 'WONDER_CHOOSER' },
      players: {},
    };
    const next = updater(pickPlayerCount())(initialState);
    expect(next.app).toEqual({ scene: 'WONDER_PANEL' });
  });
});

describe('viewWonderChooser', () => {
  it('changes to the WONDER_CHOOSER scene', () => {
    const initialState = {
      app: {
        scene: 'WONDER_PANEL',
        wonderChooserPlayer: null,
      },
      players: {},
    };
    const next = updater(viewWonderChooser('PLAYER1'))(initialState);
    expect(next.app).toEqual({
      scene: 'WONDER_CHOOSER',
      wonderChooserPlayer: 'PLAYER1',
    });
  });
});

describe('startAge', () => {
  it('changes to the AGE scene', () => {
    const initialState = {
      app: {
        currentPlayer: 'PLAYER1',
        scene: 'WAR',
      },
      ages: [{ rounds: 0, discardedCards: [] }],
      players: {
        PLAYER1: {
          id: 'PLAYER1',
          hand: [],
          wonderAbilities: [],
        },
        PLAYER2: {
          id: 'PLAYER2',
          hand: [],
        },
        PLAYER3: {
          id: 'PLAYER3',
          hand: [],
        },
      },
    };
    const next = updater(startAge())(initialState);
    expect(next.app).toEqual({
      currentPlayer: 'PLAYER1',
      scene: 'AGE',
    });
  });
});

describe('viewGameBoard', () => {
  it('changes to the GAME_BOARD scene', () => {
    const initialState = {
      app: {
        currentPlayer: 'PLAYER1',
        scene: 'AGE',
      },
      ages: [{ rounds: 0, discardedCards: [] }],
      players: {
        PLAYER1: {
          id: 'PLAYER1',
          hand: [
            'PAWNSHOP', 'ALTAR', 'BATHS', 'APOTHECARY', 'TAVERN', 'STOCKADE',
            'WORKSHOP',
          ],
          wonderAbilities: [],
        },
        PLAYER2: {
          id: 'PLAYER2',
          hand: [],
        },
        PLAYER3: {
          id: 'PLAYER3',
          hand: [],
        },
      },
    };
    const next = updater(viewGameBoard())(initialState);
    expect(next.app).toEqual({
      currentPlayer: 'PLAYER1',
      scene: 'GAME_BOARD',
    });
  });
});

describe('chooseNeighbor', () => {
  describe('when last round', () => {
    it('changes the scene to WAR', () => {
      const initialState = {
        app: {
          currentPlayer: 'PLAYER1',
          selectedCardId: 'PAWNSHOP',
          selectedCardIdx: 0,
          lastHandAction: BUILD_STRUCTURE,
          scene: 'GAME_BOARD',
        },
        ages: [{ rounds: 6, discardedCards: [] }],
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            hand: [],
            wonderAbilities: [],
          },
          PLAYER2: {
            id: 'PLAYER2',
            hand: [],
          },
          PLAYER3: {
            id: 'PLAYER3',
            hand: [],
          },
        },
      };
      const next = updater(chooseNeighbor('leftCost'))(initialState);
      expect(next.app).toEqual({
        currentPlayer: 'PLAYER1',
        selectedCardId: null,
        selectedCardIdx: null,
        lastHandAction: BUILD_STRUCTURE,
        scene: 'WAR',
      });
    });
  });
});

describe('buildStructure', () => {
  describe('when last round', () => {
    it('changes the scene to WAR', () => {
      const initialState = {
        app: {
          currentPlayer: 'PLAYER1',
          selectedCardId: 'PAWNSHOP',
          selectedCardIdx: 0,
          lastHandAction: null,
          scene: 'GAME_BOARD',
        },
        ages: [{ rounds: 6, discardedCards: [] }],
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            hand: [],
            structurePayments: SINGLE_PAYMENT,
            wonderPayments: [],
            wonderAbilities: [],
          },
          PLAYER2: {
            id: 'PLAYER2',
            hand: [],
          },
          PLAYER3: {
            id: 'PLAYER3',
            hand: [],
          },
        },
      };
      const next = updater(buildStructure())(initialState);
      expect(next.app).toEqual({
        currentPlayer: 'PLAYER1',
        selectedCardId: null,
        selectedCardIdx: null,
        lastHandAction: BUILD_STRUCTURE,
        scene: 'WAR',
      });
    });
  });
});

describe('buildWonder', () => {
  describe('when last round', () => {
    it('changes the scene to WAR', () => {
      const initialState = {
        app: {
          currentPlayer: 'PLAYER1',
          selectedCardId: 'PAWNSHOP',
          selectedCardIdx: 0,
          lastHandAction: null,
          scene: 'GAME_BOARD',
        },
        ages: [{ rounds: 6, discardedCards: [] }],
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            hand: [],
            wonder: 'PYRAMIDS_OF_GIZA',
            tableau: [],
            structurePayments: [],
            wonderPayments: SINGLE_PAYMENT,
            wonderAbilities: [],
          },
          PLAYER2: {
            id: 'PLAYER2',
            hand: [],
          },
          PLAYER3: {
            id: 'PLAYER3',
            hand: [],
          },
        },
      };
      const next = updater(buildWonder())(initialState);
      expect(next.app).toEqual({
        currentPlayer: 'PLAYER1',
        selectedCardId: null,
        selectedCardIdx: null,
        lastHandAction: BUILD_WONDER,
        scene: 'WAR',
      });
    });
  });
});

describe('addMoney', () => {
  describe('when last round', () => {
    it('changes the scene to WAR', () => {
      const initialState = {
        app: {
          currentPlayer: 'PLAYER1',
          selectedCardId: 'PAWNSHOP',
          selectedCardIdx: 0,
          lastHandAction: null,
          scene: 'GAME_BOARD',
        },
        ages: [{ rounds: 6, discardedCards: [] }],
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            hand: [],
            wonderAbilities: [],
          },
          PLAYER2: {
            id: 'PLAYER2',
            hand: [],
          },
          PLAYER3: {
            id: 'PLAYER3',
            hand: [],
          },
        },
      };
      const next = updater(addMoney())(initialState);
      expect(next.app).toEqual({
        currentPlayer: 'PLAYER1',
        selectedCardId: null,
        selectedCardIdx: null,
        lastHandAction: null,
        scene: 'WAR',
      });
    });
  });
});

describe('scoreGame', () => {
  it('changes to the SCORE_BOARD scene', () => {
    const initialState = {
      app: {
        currentPlayer: 'PLAYER1',
        scene: 'WAR',
      },
      ages: [{ rounds: 6, discardedCards: [] }],
      players: {
        PLAYER1: {
          id: 'PLAYER1',
          hand: [],
          wonderAbilities: [],
        },
        PLAYER2: {
          id: 'PLAYER2',
          hand: [],
        },
        PLAYER3: {
          id: 'PLAYER3',
          hand: [],
        },
      },
    };
    const next = updater(scoreGame())(initialState);
    expect(next.app).toEqual({
      currentPlayer: 'PLAYER1',
      scene: 'SCORE_BOARD',
    });
  });
});

describe('copyGuild', () => {
  it('changes to the SCORE_BOARD scene', () => {
    const initialState = {
      app: {
        currentPlayer: 'PLAYER1',
        scene: 'GAME_BOARD',
      },
      ages: [{ rounds: 6, discardedCards: [] }],
      players: {
        PLAYER1: {
          id: 'PLAYER1',
          hand: [],
          wonderAbilities: [],
        },
        PLAYER2: {
          id: 'PLAYER2',
          hand: [],
        },
        PLAYER3: {
          id: 'PLAYER3',
          hand: [],
        },
      },
    };
    const next = updater(copyGuild('BUILDERS_GUILD'))(initialState);
    expect(next.app).toEqual({
      currentPlayer: 'PLAYER1',
      scene: 'SCORE_BOARD',
    });
  });
});

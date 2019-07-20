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
  getCanBuildDiscarded, getCanBuildFree, getCanCopyGuild, getCanPlayLastCard,
  getCompletedWonderStageCount, getCurrentPlayer, getHasEmptyHands, getHand,
  getHandCardIds, getIsBuildingFree, getIsCopyingGuild, getIsGameOver,
  getIsPlayingLastRound, getMoney, getOtherPlayerIds, getOtherPlayers,
  getShields, getStructurePayments, getTableau, getTableauCards, getWonder,
  getWonderAbilities, getWonderChooserPlayer, getWonderPayments, getWonderSide,
  getWonderStages,
} from '../players';

const PAYMENT = [{ payment: [], leftCost: 0, rightCost: 0 }];

describe('getCurrentPlayer', () => {
  it('selects the data of the current player', () => {
    const state = createState({});
    expect(getCurrentPlayer(state)).toEqual({
      id: 'PLAYER1',
      hand: ['EAST_TRADING_POST', 'APOTHECARY', 'MINE'],
      tableau: ['STOCKADE', 'TAVERN', 'GLASSWORKS'],
      wonder: 'PYRAMIDS_OF_GIZA',
      completedWonderStageCount: 1,
      wonderSide: 'A',
      money: 3,
      militaryPoints: [],
      structurePayments: [],
      wonderPayments: [],
      wonderAbilities: [],
    });
  });
});

describe('getOtherPlayerIds', () => {
  it('selects the ids of the players other than the current player', () => {
    const state = {
      app: { currentPlayer: 'PLAYER1' },
      players: {
        PLAYER1: {
          id: 'PLAYER1',
        },
        PLAYER2: {
          id: 'PLAYER2',
        },
        PLAYER3: {
          id: 'PLAYER3',
        },
        PLAYER4: {
          id: 'PLAYER4',
        },
        PLAYER5: {
          id: 'PLAYER5',
        },
      },
    };
    expect(getOtherPlayerIds(state)).toEqual([
      'PLAYER5', 'PLAYER3', 'PLAYER4', 'PLAYER2',
    ]);
  });
});

describe('getOtherPlayers', () => {
  it('selects the players other than the current player', () => {
    const state = createState({});
    expect(getOtherPlayers(state)).toEqual([
      {
        id: 'PLAYER3',
        wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
        hand: ['LUMBER_YARD', 'GUARD_TOWER', 'EXCAVATION'],
        tableau: ['BARRACKS', 'CLAY_POOL'],
        completedWonderStageCount: 3,
        wonderSide: 'A',
        money: 3,
        militaryPoints: [],
        structurePayments: [],
        wonderPayments: [],
        wonderAbilities: [],
      },
      {
        id: 'PLAYER2',
        wonder: 'COLOSSUS_OF_RHODES',
        hand: ['PRESS', 'TIMBER_YARD', 'TREE_FARM'],
        tableau: ['BATHS', 'CLAY_PIT', 'ALTAR'],
        completedWonderStageCount: 2,
        wonderSide: 'A',
        money: 3,
        militaryPoints: [],
        structurePayments: [],
        wonderPayments: [],
        wonderAbilities: [],
      },
    ]);
  });
});

describe('getWonder', () => {
  it('selects the wonder of the current player', () => {
    const state = createState({ wonder: 'PYRAMIDS_OF_GIZA' });
    expect(getWonder(state)).toEqual({
      id: 'PYRAMIDS_OF_GIZA',
      name: 'Pyramids of Giza',
      initialResource: 'PYRAMIDS_OF_GIZA_INITIAL',
      A: [
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
        {
          points: 7,
          money: 0,
          shields: 0,
          resources: [],
          leftTradeDiscounts: [],
          rightTradeDiscounts: [],
          cost: ['Stone', 'Stone', 'Stone', 'Stone'],
        },
      ],
      B: [
        {
          points: 3,
          money: 0,
          shields: 0,
          resources: [],
          leftTradeDiscounts: [],
          rightTradeDiscounts: [],
          cost: ['Wood', 'Wood'],
        },
        {
          points: 5,
          money: 0,
          shields: 0,
          resources: [],
          leftTradeDiscounts: [],
          rightTradeDiscounts: [],
          cost: ['Stone', 'Stone', 'Stone'],
        },
        {
          points: 5,
          money: 0,
          shields: 0,
          resources: [],
          leftTradeDiscounts: [],
          rightTradeDiscounts: [],
          cost: ['Clay', 'Clay', 'Clay'],
        },
        {
          points: 7,
          money: 0,
          shields: 0,
          resources: [],
          leftTradeDiscounts: [],
          rightTradeDiscounts: [],
          cost: ['Stone', 'Stone', 'Stone', 'Stone'],
        }
      ],
    });
  });
});

describe('getWonderSide', () => {
  it('selects the side of the wonder the current player is using', () => {
    const state = createState({ wonderSide: 'A' });
    expect(getWonderSide(state)).toBe('A');
  });
});

describe('getWonderStages', () => {
  it('selects the wonder stages of the current player', () => {
    const state = createState({ wonder: 'PYRAMIDS_OF_GIZA' });
    expect(getWonderStages(state)).toEqual([
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
      {
        points: 7,
        money: 0,
        shields: 0,
        resources: [],
        leftTradeDiscounts: [],
        rightTradeDiscounts: [],
        cost: ['Stone', 'Stone', 'Stone', 'Stone'],
      },
    ]);
  });
});

describe('getTableau', () => {
  it('selects the tableau of the current player', () => {
    const tableau = ['STOCKADE', 'TAVERN', 'GLASSWORKS'];
    const state = createState({ tableau });
    expect(getTableau(state)).toEqual(tableau);
  });
});

describe('getTableauCards', () => {
  it('selects the tableau cards of the current player', () => {
    const state = createState({
      tableau: ['STOCKADE', 'TAVERN', 'GLASSWORKS'],
    });
    expect(getTableauCards(state)).toEqual([
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
        id: 'GLASSWORKS',
        name: 'Glassworks',
        type: 'MANUFACTURED_GOOD',
        age: 0,
        frequencies: [1, 1, 1, 2, 2],
        resources: [{ 'alternatives': ['Glass'] }],
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
    ]);
  });
});

describe('getMoney', () => {
  it('selects the money of the current player', () => {
    const money = 3;
    const state = createState({ money });
    expect(getMoney(state)).toBe(money);
  });
});

describe('getCompletedWonderStageCount', () => {
  it('selects the number of completed wonder stages of the current player', () => {
    const completedWonderStageCount = 1;
    const state = createState({ completedWonderStageCount });
    expect(getCompletedWonderStageCount(state)).toBe(completedWonderStageCount);
  });
});

describe('getStructurePayments', () => {
  it('selects the methods of payment for building a structure for the current player', () => {
    const structurePayments = PAYMENT;
    const state = createState({ structurePayments });
    expect(getStructurePayments(state)).toEqual(structurePayments);
  });
});

describe('getWonderPayments', () => {
  it('selects the methods of payment for building the wonder of the current player', () => {
    const wonderPayments = PAYMENT;
    const state = createState({ wonderPayments });
    expect(getWonderPayments(state)).toEqual(wonderPayments);
  })
});

describe('getWonderAbilities', () => {
  it('selects the special wonder ability enabled', () => {
    const wonderAbilities = ['BUILD_DISCARDED'];
    const state = createState({ wonderAbilities });
    expect(getWonderAbilities(state)).toBe(wonderAbilities);
  });
});

describe('getCanBuildDiscarded', () => {
  it('without current player selects false', () => {
    const state = {
      app: {},
      players: {},
    };
    expect(getCanBuildDiscarded(state)).toBe(false);
  });
  it('when does not have BUILD_DISCARDED wonder ability selects false', () => {
    const state = createState({
      wonder: 'MAUSOLEUM_OF_HALICARNASSUS',
      tableau: [],
      wonderAbilities: [],
    });
    expect(getCanBuildDiscarded(state)).toBe(false);
  });
  it('when does not have discarded cards selects false', () => {
    const state = {
      app: { currentPlayer: 'PLAYER1' },
      ages: [{ rounds: 0, discardedCards: [] }],
      players: {
        PLAYER1: {
          id: 'PLAYER1',
          wonder: 'MAUSOLEUM_OF_HALICARNASSUS',
          tableau: [],
          wonderAbilities: ['BUILD_DISCARDED'],
        },
      },
    };
    expect(getCanBuildDiscarded(state)).toBe(false);
  });
  it('when has BUILD_DISCARDED wonder ability and discarded cards selects true', () => {
    const state = createState({
      wonder: 'MAUSOLEUM_OF_HALICARNASSUS',
      tableau: [],
      wonderAbilities: ['BUILD_DISCARDED'],
    });
    expect(getCanBuildDiscarded(state)).toBe(true);
  });
});

describe('getCanBuildFree', () => {
  it('selects whether the current player can build a structure for free', () => {
    const state = createState({ wonderAbilities: ['BUILD_FREE'] });
    expect(getCanBuildFree(state)).toBe(true);
  });
});

describe('getCanPlayLastCard', () => {
  it('selects whether the current player can play the 7th card', () => {
    const state = createState({ wonderAbilities: ['PLAY_LAST_CARD'] });
    expect(getCanPlayLastCard(state)).toBe(true);
  });
});

describe('getCanCopyGuild', () => {
  it('selects whether the current player can copy a guild card from their neighbor', () => {
    const state = createState({ wonderAbilities: ['COPY_GUILD'] });
    expect(getCanCopyGuild(state)).toBe(true);
  });
});

describe('getIsCopyingGuild', () => {
  it('selects whether the game state is ready for the current player to copy a guild card', () => {
    const state = {
      app: { currentPlayer: 'PLAYER1' },
      ages: [
        { rounds: 6, discardedCards: [] },
        { rounds: 6, discardedCards: [] },
        { rounds: 6, discardedCards: [] },
      ],
      players: {
        PLAYER1: {
          id: 'PLAYER1',
          tableau: ['STOCKADE', 'MAGISTRATES_GUILD'],
          wonderAbilities: ['COPY_GUILD'],
        },
        PLAYER2: {
          id: 'PLAYER2',
          tableau: ['LOOM', 'BUILDERS_GUILD'],
        },
        PLAYER3: {
          id: 'PLAYER3',
          tableau: ['CRAFTSMENS_GUILD', 'PRESS'],
        },
      },
    };
    expect(getIsCopyingGuild(state)).toBe(true);
  });
});

describe('getHandCardIds', () => {
  it('selects the ids of the hand cards of the current player', () => {
    const hand = ['EAST_TRADING_POST', 'APOTHECARY', 'MINE'];
    const state = createState({ hand });
    expect(getHandCardIds(state)).toEqual(hand);
  });
});

describe('getHand', () => {
  it('selects the hand of the current player', () => {
    const state = createState({
      hand: ['EAST_TRADING_POST', 'APOTHECARY', 'MINE'],
    });
    expect(getHand(state)).toEqual([
      {
        id: 'EAST_TRADING_POST',
        name: 'East trading post',
        type: 'TRADE',
        age: 0,
        frequencies: [1, 1, 1, 1, 2],
        resources: [],
        points: 0,
        money: 0,
        shields: 0,
        leftTradeDiscounts: [],
        rightTradeDiscounts: ['Clay', 'Ore', 'Stone', 'Wood'],
        chainedStructures: ['FORUM'],
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
      {
        id: 'MINE',
        name: 'Mine',
        type: 'RAW_MATERIAL',
        age: 0,
        frequencies: [0, 0, 0, 1, 1],
        resources: [{ alternatives: ['Ore', 'Stone'] }],
        points: 0,
        money: 0,
        shields: 0,
        leftTradeDiscounts: [],
        rightTradeDiscounts: [],
        chainedStructures: [],
        resourceCost: [],
        coinCost: 1,
        structureCost: [],
      },
    ]);
  });
});

describe('getShields', () => {
  it('selects the shields of the current player', () => {
    const shields = 1;
    const state = createState({ shields });
    expect(getShields(state)).toBe(shields);
  });
});

describe('getIsBuildingFree', () => {
  it('selects whether the selected card can be built for free', () => {
    const state = createState({
      selectedCardId: 'CLAY_PIT',
      wonderAbilities: ['BUILD_FREE'],
    });
    expect(getIsBuildingFree(state)).toBe(true);
  });
});

describe('getIsPlayingLastRound', () => {
  describe('when not playing 7th card', () => {
    it('when 6th round of age selects true', () => {
      const state = {
        app: { currentPlayer: 'PLAYER1' },
        ages: [{ rounds: 6, discardedCards: [] }],
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            wonderAbilities: [],
          },
        },
      };
      expect(getIsPlayingLastRound(state)).toBe(true);
    });
    it('when more rounds left in age selects false', () => {
      const state = {
        app: { currentPlayer: 'PLAYER1' },
        ages: [{ rounds: 5, discardedCards: [] }],
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            wonderAbilities: [],
          },
        },
      };
      expect(getIsPlayingLastRound(state)).toBe(false);
    });
  });
  describe('when playing 7th card', () => {
    it('when 7th round of age selects true', () => {
      const state = {
        app: { currentPlayer: 'PLAYER1' },
        ages: [{ rounds: 7, discardedCards: [] }],
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            wonderAbilities: ['PLAY_LAST_CARD'],
          },
        },
      };
      expect(getIsPlayingLastRound(state)).toBe(true);
    });
    it('when more rounds left in age selects false', () => {
      const state = {
        app: { currentPlayer: 'PLAYER1' },
        ages: [{ rounds: 6, discardedCards: [] }],
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            wonderAbilities: ['PLAY_LAST_CARD'],
          },
        },
      };
      expect(getIsPlayingLastRound(state)).toBe(false);
    });
  });
});

describe('getHasEmptyHands', () => {
  it('when players have multiple cards in their hands selects false', () => {
    const state = {
      players: {
        PLAYER1: {
          id: 'PLAYER1',
          hand: ['PAWNSHOP'],
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
    expect(getHasEmptyHands(state)).toBe(false);
  });
  it('when players have no cards in their hands selects true', () => {
    const state = {
      players: {
        PLAYER1: {
          id: 'PLAYER1',
          hand: [],
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
    expect(getHasEmptyHands(state)).toBe(true);
  });
});

describe('getIsGameOver', () => {
  it('when players have multiple cards in their hands selects false', () => {
    const state = {
      ages: [
        { rounds: 6, discardedCards: [] },
        { rounds: 6, discardedCards: [] },
        { rounds: 6, discardedCards: [] },
      ],
      players: {
        PLAYER1: {
          id: 'PLAYER1',
          hand: ['PAWNSHOP'],
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
    expect(getIsGameOver(state)).toBe(false);
  });
  it('when more ages left selects false', () => {
    const state = {
      ages: [{ rounds: 6, discardedCards: [] }],
      players: {
        PLAYER1: {
          id: 'PLAYER1',
          hand: [],
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
    expect(getIsGameOver(state)).toBe(false);
  });
  it('when players have no cards in their hands in the last age selects true', () => {
    const state = {
      ages: [
        { rounds: 6, discardedCards: [] },
        { rounds: 6, discardedCards: [] },
        { rounds: 6, discardedCards: [] },
      ],
      players: {
        PLAYER1: {
          id: 'PLAYER1',
          hand: [],
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
    expect(getIsGameOver(state)).toBe(true);
  });
});

describe('getWonderChooserPlayer', () => {
  it('selects the chosen player for the wonder chooser', () => {
    const state = {
      app: { wonderChooserPlayer: 'PLAYER1' },
      players: PLAYERS,
    };
    expect(getWonderChooserPlayer(state)).toEqual({
      id: 'PLAYER1',
      hand: ['EAST_TRADING_POST', 'APOTHECARY', 'MINE'],
      tableau: ['STOCKADE', 'TAVERN', 'GLASSWORKS'],
      wonder: 'PYRAMIDS_OF_GIZA',
      completedWonderStageCount: 1,
      wonderSide: 'A',
      money: 3,
      militaryPoints: [],
      structurePayments: [],
      wonderPayments: [],
      wonderAbilities: [],
    });
  });
});

const createState = ({ selectedCardId, ...player }) => ({
  app: {
    currentPlayer: 'PLAYER1',
    selectedCardId,
  },
  ages: [
    {
      rounds: 3,
      discardedCards: ['PRESS', 'BATHS', 'CLAY_PIT', 'GLASSWORKS'],
    },
  ],
  players: {
    ...PLAYERS,
    PLAYER1: {
      ...PLAYERS.PLAYER1,
      ...player,
    },
  },
});

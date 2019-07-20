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
  addMoney, buildStructure, buildWonder, copyGuild, getIsBuildingFree,
  getIsCopyingGuild, resetWonderEffects, setStructurePayments,
  setWonderPayments, setupPlayers,
} from '../players';

const COSTLESS_PAYMENT = [{ payment: [], leftCost: 0, rightCost: 0 }];

const WONDER_SIDES = ['A', 'B'];

describe('getIsCopyingGuild', () => {
  it('when cannot copy guild hand returns false', () => {
    const state = {
      currentPlayerId: 'PLAYER1',
      ages: [
        { rounds: 6, discardedCards: [] },
        { rounds: 6, discardedCards: [] },
        { rounds: 6, discardedCards: [] },
      ],
      players: {
        PLAYER1: createCurrentPlayer({}),
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
    expect(getIsCopyingGuild(state)).toBe(false);
  });
  it('when not last age returns false', () => {
    const state = {
      currentPlayerId: 'PLAYER1',
      ages: [
        { rounds: 6, discardedCards: [] },
        { rounds: 6, discardedCards: [] },
      ],
      players: {
        PLAYER1: createCurrentPlayer({
          wonderAbilities: ['COPY_GUILD'],
        }),
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
    expect(getIsCopyingGuild(state)).toBe(false);
  });
  it('when not last round returns false', () => {
    const state = {
      currentPlayerId: 'PLAYER1',
      ages: [
        { rounds: 6, discardedCards: [] },
        { rounds: 6, discardedCards: [] },
        { rounds: 0, discardedCards: [] },
      ],
      players: {
        PLAYER1: createCurrentPlayer({
          wonderAbilities: ['COPY_GUILD'],
        }),
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
    expect(getIsCopyingGuild(state)).toBe(false);
  });
  it('when neighbors do not have guild cards returns false', () => {
    const state = {
      currentPlayerId: 'PLAYER1',
      ages: [
        { rounds: 6, discardedCards: [] },
        { rounds: 6, discardedCards: [] },
        { rounds: 6, discardedCards: [] },
      ],
      players: {
        PLAYER1: createCurrentPlayer({
          wonderAbilities: ['COPY_GUILD'],
        }),
        PLAYER2: {
          id: 'PLAYER2',
          tableau: ['LOOM', 'TIMBER_YARD'],
        },
        PLAYER3: {
          id: 'PLAYER3',
          tableau: ['GUARD_TOWER', 'PRESS'],
        },
      },
    };
    expect(getIsCopyingGuild(state)).toBe(false);
  });
  it('when can copy guild card from neighbors in last round of last age returns true', () => {
    const state = {
      currentPlayerId: 'PLAYER1',
      ages: [
        { rounds: 6, discardedCards: [] },
        { rounds: 6, discardedCards: [] },
        { rounds: 6, discardedCards: [] },
      ],
      players: {
        PLAYER1: createCurrentPlayer({
          wonderAbilities: ['COPY_GUILD'],
        }),
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

describe('getIsBuildingFree', () => {
  it('when cannot build free returns false', () => {
    const state = {
      selectedCardId: 'CLAY_PIT',
      currentPlayerId: 'PLAYER1',
      players: {
        PLAYER1: createCurrentPlayer({}),
        PLAYER2: {
          id: 'PLAYER2',
          wonder: 'COLOSSUS_OF_RHODES',
          tableau: ['BATHS', 'CLAY_PIT', 'ALTAR'],
        },
        PLAYER3: {
          id: 'PLAYER3',
          wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
          tableau: ['BARRACKS', 'CLAY_POOL'],
        },
      },
    };
    expect(getIsBuildingFree(state)).toBe(false);
  });
  it('when no selected hand card returns false', () => {
    const state = {
      selectedCardId: null,
      currentPlayerId: 'PLAYER1',
      players: {
        PLAYER1: createCurrentPlayer({
          wonderAbilities: ['BUILD_FREE'],
        }),
        PLAYER2: {
          id: 'PLAYER2',
          wonder: 'COLOSSUS_OF_RHODES',
          tableau: ['BATHS', 'CLAY_PIT', 'ALTAR'],
        },
        PLAYER3: {
          id: 'PLAYER3',
          wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
          tableau: ['BARRACKS', 'CLAY_POOL'],
        },
      },
    };
    expect(getIsBuildingFree(state)).toBe(false);
  });
  it('when card already in tableau returns false', () => {
    const state = {
      selectedCardId: 'CLAY_PIT',
      currentPlayerId: 'PLAYER1',
      players: {
        PLAYER1: createCurrentPlayer({
          tableau: ['STOCKADE', 'CLAY_PIT', 'TAVERN'],
          wonderAbilities: ['BUILD_FREE'],
        }),
        PLAYER2: {
          id: 'PLAYER2',
          wonder: 'COLOSSUS_OF_RHODES',
          tableau: ['BATHS', 'CLAY_PIT', 'ALTAR'],
        },
        PLAYER3: {
          id: 'PLAYER3',
          wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
          tableau: ['BARRACKS', 'CLAY_POOL'],
        },
      },
    };
    expect(getIsBuildingFree(state)).toBe(false);
  });
  it('when payment cost is 0 returns false', () => {
    const state = {
      selectedCardId: 'LOOM',
      currentPlayerId: 'PLAYER1',
      players: {
        PLAYER1: createCurrentPlayer({
          wonderAbilities: ['BUILD_FREE'],
        }),
        PLAYER2: {
          id: 'PLAYER2',
          wonder: 'COLOSSUS_OF_RHODES',
          tableau: ['BATHS', 'CLAY_PIT', 'ALTAR'],
        },
        PLAYER3: {
          id: 'PLAYER3',
          wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
          tableau: ['BARRACKS', 'CLAY_POOL'],
        },
      },
    };
    expect(getIsBuildingFree(state)).toBe(false);
  });
  it('when payment cost is null returns true', () => {
    const state = {
      selectedCardId: 'APOTHECARY',
      currentPlayerId: 'PLAYER1',
      players: {
        PLAYER1: createCurrentPlayer({
          wonderAbilities: ['BUILD_FREE'],
        }),
        PLAYER2: {
          id: 'PLAYER2',
          wonder: 'COLOSSUS_OF_RHODES',
          tableau: ['BATHS', 'CLAY_PIT', 'ALTAR'],
        },
        PLAYER3: {
          id: 'PLAYER3',
          wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
          tableau: ['BARRACKS', 'CLAY_POOL'],
        },
      },
    };
    expect(getIsBuildingFree(state)).toBe(true);
  });
  it('when payment cost is positive returns true', () => {
    const state = {
      selectedCardId: 'CLAY_PIT',
      currentPlayerId: 'PLAYER1',
      players: {
        PLAYER1: createCurrentPlayer({
          wonderAbilities: ['BUILD_FREE'],
        }),
        PLAYER2: {
          id: 'PLAYER2',
          wonder: 'COLOSSUS_OF_RHODES',
          tableau: ['BATHS', 'CLAY_PIT', 'ALTAR'],
        },
        PLAYER3: {
          id: 'PLAYER3',
          wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
          tableau: ['BARRACKS', 'CLAY_POOL'],
        },
      },
    };
    expect(getIsBuildingFree(state)).toBe(true);
  });
});

describe('setupPlayers', () => {
  it('initializes the players', () => {
    const playerWonders = [
      { id: 'PLAYER1', wonder: 'PYRAMIDS_OF_GIZA' },
      { id: 'PLAYER2', wonder: 'COLOSSUS_OF_RHODES' },
      { id: 'PLAYER3', wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS' },
    ];
    expect(setupPlayers({ playerWonders })).toMatchObject({
      PLAYER1: {
        id: 'PLAYER1',
        wonder: 'PYRAMIDS_OF_GIZA',
        completedWonderStageCount: 0,
        tableau: [],
        money: 3,
        hand: [],
        militaryPoints: [],
        structurePayments: [],
        wonderPayments: [],
        wonderAbilities: [],
      },
      PLAYER2: {
        id: 'PLAYER2',
        wonder: 'COLOSSUS_OF_RHODES',
        completedWonderStageCount: 0,
        tableau: [],
        money: 3,
        hand: [],
        militaryPoints: [],
        structurePayments: [],
        wonderPayments: [],
        wonderAbilities: [],
      },
      PLAYER3: {
        id: 'PLAYER3',
        wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
        completedWonderStageCount: 0,
        tableau: [],
        money: 3,
        hand: [],
        militaryPoints: [],
        structurePayments: [],
        wonderPayments: [],
        wonderAbilities: [],
      },
    });
  });
  it('shuffles the wonder sides', () => {
    const playerWonders = [
      { id: 'PLAYER1', wonder: 'PYRAMIDS_OF_GIZA' },
      { id: 'PLAYER2', wonder: 'COLOSSUS_OF_RHODES' },
      { id: 'PLAYER3', wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS' },
    ];
    const next = setupPlayers({ playerWonders });
    expect(WONDER_SIDES).toContain(next.PLAYER1.wonderSide);
    expect(WONDER_SIDES).toContain(next.PLAYER2.wonderSide);
    expect(WONDER_SIDES).toContain(next.PLAYER3.wonderSide);
  });
});

describe('resetWonderEffects', () => {
  it('when has BUILD_FREE effect can build free', () => {
    const initialState = createCurrentPlayer({
      wonder: 'STATUE_OF_ZEUS_IN_OLYMPIA',
      completedWonderStageCount: 3,
    });
    const next = resetWonderEffects()(initialState);
    expect(next).toEqual(createCurrentPlayer({
      wonder: 'STATUE_OF_ZEUS_IN_OLYMPIA',
      completedWonderStageCount: 3,
      wonderAbilities: ['BUILD_FREE'],
    }));
  });
  it('when does not have BUILD_FREE effect cannot build free', () => {
    const initialState = createCurrentPlayer({
      wonder: 'STATUE_OF_ZEUS_IN_OLYMPIA',
      completedWonderStageCount: 1,
    });
    const next = resetWonderEffects()(initialState);
    expect(next).toEqual(createCurrentPlayer({
      wonder: 'STATUE_OF_ZEUS_IN_OLYMPIA',
      completedWonderStageCount: 1,
    }));
  });
});

describe('setStructurePayments', () => {
  it('sets the structure payments', () => {
    const initialState = createCurrentPlayer({
      tableau: [],
    });
    const next = setStructurePayments({
      getPayments,
      cardId: 'BATHS',
    })(initialState);
    expect(next).toEqual(createCurrentPlayer({
      tableau: [],
      structurePayments: getPayments(['Stone']),
    }));
  });
  describe('when structure cost paid', () => {
    it('sets the structure payments to no cost', () => {
      const initialState = createCurrentPlayer(createCurrentPlayer({
        tableau: ['BATHS'],
      }));
      const next = setStructurePayments({
        getPayments,
        cardId: 'AQUEDUCT',
      })(initialState);
      expect(next).toEqual(createCurrentPlayer({
        tableau: ['BATHS'],
        structurePayments: COSTLESS_PAYMENT,
      }));
    });
  });
  describe('when can build discarded structure', () => {
    it('sets the structure payments to no cost', () => {
      const initialState = createCurrentPlayer({
        tableau: [],
        wonderAbilities: ['BUILD_DISCARDED'],
      });
      const next = setStructurePayments({
        getPayments,
        cardId: 'BATHS',
      })(initialState);
      expect(next).toEqual(createCurrentPlayer({
        tableau: [],
        structurePayments: COSTLESS_PAYMENT,
        wonderAbilities: ['BUILD_DISCARDED'],
      }));
    });
  });
  describe('when structure is free', () => {
    it('sets the structure payments to no cost', () => {
      const initialState = createCurrentPlayer({
        tableau: [],
        wonderAbilities: ['BUILD_FREE'],
      });
      const next = setStructurePayments({
        getPayments,
        cardId: 'BATHS',
        isFree: true,
      })(initialState);
      expect(next).toEqual(createCurrentPlayer({
        tableau: [],
        structurePayments: COSTLESS_PAYMENT,
        wonderAbilities: [],
      }));
    });
  });
});

describe('setWonderPayments', () => {
  it('sets the wonder payments', () => {
    const initialState = createCurrentPlayer({});
    const next = setWonderPayments({ getPayments })(initialState);
    expect(next).toEqual(createCurrentPlayer({
      wonderPayments: getPayments(['Wood', 'Wood', 'Wood']),
    }));
  });
});

describe('buildStructure', () => {
  it('adds to the tableau', () => {
    const initialState = createCurrentPlayer({
      tableau: ['STOCKADE'],
      wonderAbilities: ['BUILD_DISCARDED'],
    });
    const card = { id: 'TAVERN', money: 5 };
    const next = buildStructure({ card })(initialState);
    expect(next).toEqual(createCurrentPlayer({
      tableau: ['STOCKADE', 'TAVERN'],
      money: 8,
      wonderAbilities: [],
    }));
  });
});

describe('buildWonder', () => {
  it('increments the completed wonder stage', () => {
    const initialState = createCurrentPlayer({
      wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
    });
    const next = buildWonder()(initialState);
    expect(next).toEqual(createCurrentPlayer({
      money: 12,
      wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
      completedWonderStageCount: 2,
    }));
  });
  it('when wonder has special effect adds wonder ability', () => {
    const initialState = createCurrentPlayer({
      wonder: 'MAUSOLEUM_OF_HALICARNASSUS',
      wonderAbilities: [],
    });
    const next = buildWonder()(initialState);
    expect(next).toEqual(createCurrentPlayer({
      wonder: 'MAUSOLEUM_OF_HALICARNASSUS',
      completedWonderStageCount: 2,
      wonderAbilities: ['BUILD_DISCARDED'],
    }));
  });
});

describe('addMoney', () => {
  it('adds 3 coins to the purse', () => {
    const initialState = createCurrentPlayer({});
    const next = addMoney()(initialState);
    expect(next).toEqual(createCurrentPlayer({ money: 6 }));
  });
});

describe('copyGuild', () => {
  it('copies the guild card of a neighbor', () => {
    const initialState = createCurrentPlayer({});
    const next = copyGuild({ cardId: 'BUILDERS_GUILD' })(initialState);
    expect(next).toEqual(createCurrentPlayer({
      tableau: ['STOCKADE', 'TAVERN', 'GLASSWORKS', 'BUILDERS_GUILD'],
    }));
  });
});

const getPayments = (cost) => [
  {
    payment: [{ playerId: 'PLAYER1', alternatives: cost }],
    leftCost: 0,
    rightCost: 0,
  },
];

const createCurrentPlayer = (player) => ({
  ...PLAYERS.PLAYER1,
  ...player,
});

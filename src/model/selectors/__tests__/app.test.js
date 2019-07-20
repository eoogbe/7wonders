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
  getCallout, getCurrentPlayerId, getPlayerPickerCount, getScene,
  getSelectedCard, getSelectedCardId, getSelectedCardIndex,
  getWonderChooserPlayerId,
} from '../app';

describe('getCurrentPlayerId', () => {
  it('selects the id of the current player in the game', () => {
    const state = {
      app: { currentPlayer: 'PLAYER1' },
    };
    expect(getCurrentPlayerId(state)).toBe('PLAYER1');
  });
});

describe('getSelectedCardId', () => {
  it('selects the id of the selected hand card', () => {
    const state = {
      app: { selectedCardId: 'PAWNSHOP' },
    };
    expect(getSelectedCardId(state)).toBe('PAWNSHOP');
  });
});

describe('getSelectedCardIndex', () => {
  it('selects the index of the selected hand card', () => {
    const state = {
      app: { selectedCardIdx: 0 },
    };
    expect(getSelectedCardIndex(state)).toBe(0);
  });
});

describe('getScene', () => {
  it('selects the current scene', () => {
    const state = {
      app: { scene: 'BOARD' },
    };
    expect(getScene(state)).toBe('BOARD');
  });
});

describe('getPlayerPickerCount', () => {
  it('selects the player count for the player picker', () => {
    const state = {
      app: { playerPickerCount: 3 },
    };
    expect(getPlayerPickerCount(state)).toBe(3);
  });
});

describe('getSelectedCard', () => {
  it('selects the selected hand card', () => {
    const state = {
      app: { selectedCardId: 'PAWNSHOP' },
    };
    expect(getSelectedCard(state)).toEqual({
      id: 'PAWNSHOP',
      name: 'Pawnshop',
      type: 'CIVIC',
      age: 0,
      frequencies: [0, 1, 1, 1, 2],
      resources: [],
      points: 3,
      money: 0,
      shields: 0,
      leftTradeDiscounts: [],
      rightTradeDiscounts: [],
      chainedStructures: [],
      resourceCost: [],
      coinCost: 0,
      structureCost: [],
    });
  });
  it('when selected hand card id is null selects null', () => {
    const state = {
      app: { selectedCardId: null },
    };
    expect(getSelectedCard(state)).toBe(null);
  });
});

describe('getWonderChooserPlayerId', () => {
  it('selects the id of the chosen player for the wonder chooser', () => {
    const state = {
      app: { wonderChooserPlayer: 'PLAYER1' },
    };
    expect(getWonderChooserPlayerId(state)).toBe('PLAYER1');
  });
});

describe('getCallout', () => {
  it('selects the callout app state', () => {
    const callout = {
      type: 'PLAYER',
      data: { playerId: 'PLAYER1' },
    };
    const state = {
      app: { callout },
    };
    expect(getCallout(state)).toEqual(callout);
  });
});

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
import { getPaymentCost, getPayments } from '../paymentCost';

describe('getPayments', () => {
  it('when no payment methods returns empty', () => {
    const state = createState({
      tableau: ['STOCKADE', 'TAVERN', 'GLASSWORKS'],
      cost: ['Wood'],
    });
    expect(getPayments(state)).toHaveLength(0);
  });
  it('when current player has resources returns payment without cost', () => {
    const state = createState({
      tableau: ['STOCKADE', 'TAVERN', 'GLASSWORKS'],
      cost: ['Glass'],
    });
    expect(getPayments(state)).toEqual([
      {
        payment: [{ playerId: 'PLAYER1', alternatives: ['Glass'] }],
        leftCost: 0,
        rightCost: 0,
      },
    ]);
  });
  it('when neighbors have resources buys from neighbors', () => {
    const state = createState({
      tableau: ['STOCKADE', 'TAVERN', 'GLASSWORKS'],
      cost: ['Clay', 'Clay'],
    });
    expect(getPayments(state)).toEqual([
      {
        payment: [
          { playerId: 'PLAYER2', alternatives: ['Clay', 'Ore'] },
          { playerId: 'PLAYER3', alternatives: ['Clay'] },
        ],
        leftCost: 2,
        rightCost: 2,
      },
    ]);
  });
  it('when multiple possible payments returns both', () => {
    const state = createState({
      tableau: ['STOCKADE', 'TAVERN', 'GLASSWORKS'],
      cost: ['Clay'],
    });
    expect(getPayments(state)).toEqual([
      {
        payment: [{ playerId: 'PLAYER3', alternatives: ['Clay'] }],
        leftCost: 2,
        rightCost: 0,
      },
      {
        payment: [{ playerId: 'PLAYER2', alternatives: ['Clay', 'Ore'] }],
        leftCost: 0,
        rightCost: 2,
      },
    ]);
  });
  it('when multiple possible payments with the same cost returns a single payment', () => {
    const state = createState({
      tableau: ['STOCKADE', 'TAVERN', 'ORE_VEIN', 'FOREST_CAVE'],
      cost: ['Ore'],
    });
    expect(getPayments(state)).toEqual([
      {
        payment: [{ playerId: 'PLAYER1', alternatives: ['Ore'] }],
        leftCost: 0,
        rightCost: 0,
      },
    ]);
  });
  it('when one payment costs less returns the minimum', () => {
    const state = createState({
      tableau: ['STOCKADE', 'TAVERN', 'GLASSWORKS', 'EAST_TRADING_POST'],
      cost: ['Clay'],
    });
    expect(getPayments(state)).toEqual([
      {
        payment: [{ playerId: 'PLAYER2', alternatives: ['Clay', 'Ore'] }],
        leftCost: 0,
        rightCost: 1,
      },
    ]);
  });
});

describe('getPaymentCost', () => {
  it('with payment methods can afford cost', () => {
    const state = createState({
      tableau: ['STOCKADE', 'TAVERN', 'APOTHECARY'],
      money: 3,
      cost: ['Stone'],
    });
    expect(getPaymentCost(state)).toBe(0);
  });
  it('when neighbor has resources can afford cost', () => {
    const state = createState({
      tableau: ['STOCKADE', 'TAVERN', 'APOTHECARY'],
      money: 6,
      cost: ['Clay', 'Clay'],
    });
    expect(getPaymentCost(state)).toBe(4);
  });
  it('when cannot afford to pay neighbor cannot afford cost', () => {
    const state = createState({
      tableau: ['STOCKADE', 'TAVERN', 'APOTHECARY'],
      money: 3,
      cost: ['Clay', 'Clay'],
    });
    expect(getPaymentCost(state)).toBe(null);
  });
  it('with empty payment methods cannot afford cost', () => {
    const state = createState({
      tableau: ['STOCKADE', 'TAVERN', 'APOTHECARY'],
      money: 3,
      cost: ['Wood'],
    });
    expect(getPaymentCost(state)).toBe(null);
  });
});

const createState = ({ cost, ...player }) => ({
  currentPlayerId: 'PLAYER1',
  players: {
    ...PLAYERS,
    PLAYER1: {
      ...PLAYERS.PLAYER1,
      ...player,
    },
  },
  cost,
});

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

import { getHasTradeChoice } from '../trade';

const MULTIPLE_PAYMENTS = [
  {
    payment: [{ playerId: 'PLAYER2', alternatives: ['Clay'] }],
    leftCost: 2,
    rightCost: 0,
  },
  {
    payment: [{ playerId: 'PLAYER3', alternatives: ['Clay'] }],
    leftCost: 0,
    rightCost: 2,
  },
];

const SINGLE_PAYMENT = [
  {
    payment: [{ playerId: 'PLAYER1', alternatives: ['Ore'] }],
    leftCost: 0,
    rightCost: 0,
  },
];

describe('getHasTradeChoice', () => {
  it('when multiple structure payments selects true', () => {
    const state = createState({
      structurePayments: MULTIPLE_PAYMENTS,
      wonderPayments: SINGLE_PAYMENT,
    });
    expect(getHasTradeChoice(state)).toBe(true);
  });
  it('when multiple wonder payments selects true', () => {
    const state = createState({
      structurePayments: SINGLE_PAYMENT,
      wonderPayments: MULTIPLE_PAYMENTS,
    });
    expect(getHasTradeChoice(state)).toBe(true);
  });
  it('when single structure and wonder payments selects false', () => {
    const state = createState({
      structurePayments: SINGLE_PAYMENT,
      wonderPayments: SINGLE_PAYMENT,
    });
    expect(getHasTradeChoice(state)).toBe(false);
  });
});

const createState = ({ structurePayments, wonderPayments }) => ({
  app: { currentPlayer: 'PLAYER1' },
  players: {
    PLAYER1: {
      structurePayments,
      wonderPayments,
    },
  },
});

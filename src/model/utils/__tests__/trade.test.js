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

import { playerTrade } from '../trade';

const PAYMENT = [
  {
    payment: [
      { playerId: 'PLAYER3', alternatives: ['Stone'] },
      { playerId: 'PLAYER2', alternatives: ['Stone'] },
    ],
    leftCost: 1,
    rightCost: 2,
  },
];

describe('playerTrade', () => {
  it('when has a structure payment pays neighbors', () => {
    const players = createPlayers({
      structurePayments: PAYMENT,
      wonderPayments: [],
    });
    const next = playerTrade(players, 'PLAYER1');
    expect(next).toEqual({
      PLAYER1: {
        id: 'PLAYER1',
        money: 3,
        structurePayments: [],
        wonderPayments: [],
      },
      PLAYER2: {
        id: 'PLAYER2',
        money: 5,
        structurePayments: [],
        wonderPayments: [],
      },
      PLAYER3: {
        id: 'PLAYER3',
        money: 4,
        structurePayments: [],
        wonderPayments: [],
      },
    });
  });
  it('when has a wonder payment pays neighbors', () => {
    const players = createPlayers({
      structurePayments: [],
      wonderPayments: PAYMENT,
    });
    const next = playerTrade(players, 'PLAYER1');
    expect(next).toEqual({
      PLAYER1: {
        id: 'PLAYER1',
        money: 3,
        structurePayments: [],
        wonderPayments: [],
      },
      PLAYER2: {
        id: 'PLAYER2',
        money: 5,
        structurePayments: [],
        wonderPayments: [],
      },
      PLAYER3: {
        id: 'PLAYER3',
        money: 4,
        structurePayments: [],
        wonderPayments: [],
      },
    });
  });
  it('when has neither payments does nothing', () => {
    const players = createPlayers({
      structurePayments: [],
      wonderPayments: [],
    });
    const next = playerTrade(players, 'PLAYER1');
    expect(next).toEqual(players);
  });
});

const createPlayers = ({ structurePayments, wonderPayments }) => ({
  PLAYER1: {
    id: 'PLAYER1',
    money: 6,
    structurePayments,
    wonderPayments,
  },
  PLAYER2: {
    id: 'PLAYER2',
    money: 3,
    structurePayments: [],
    wonderPayments: [],
  },
  PLAYER3: {
    id: 'PLAYER3',
    money: 3,
    structurePayments: [],
    wonderPayments: [],
  },
});

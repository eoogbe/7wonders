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

import { pickPlayerCount } from 'model/actions';
import { WONDER_IDS } from 'model/utils/wonder';
import updater from '../../players';

describe('pickPlayerCount', () => {
  it('sets up the players', () => {
    const initialState = {
      app: { playerPickerCount: 3 },
      players: {},
    };
    const next = updater(pickPlayerCount())(initialState);
    expect(next).toMatchObject({
      app: { currentPlayer: 'PLAYER0' },
      players: {
        PLAYER0: {
          id: 'PLAYER0',
          completedWonderStageCount: 0,
          tableau: [],
          money: 3,
          hand: [],
          militaryPoints: [],
          structurePayments: [],
          wonderPayments: [],
          wonderAbilities: [],
        },
        PLAYER1: {
          id: 'PLAYER1',
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
          completedWonderStageCount: 0,
          tableau: [],
          money: 3,
          hand: [],
          militaryPoints: [],
          structurePayments: [],
          wonderPayments: [],
          wonderAbilities: [],
        },
      },
    });
  });
  it('shuffles the wonders', () => {
    const initialState = {
      app: { playerPickerCount: 3 },
      players: {},
    };
    const next = updater(pickPlayerCount())(initialState);
    const playerWonders = [
      next.players.PLAYER0.wonder,
      next.players.PLAYER1.wonder,
      next.players.PLAYER2.wonder,
    ];
    expect(WONDER_IDS).toEqual(expect.arrayContaining(playerWonders));
  });
});

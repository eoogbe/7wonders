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
import { getMoney, getOtherPlayers, getPlayerScores } from '../players';

describe('getOtherPlayers', () => {
  it('returns the players other than the current player', () => {
    const state = {
      app: { currentPlayer: 'PLAYER1' },
      players: PLAYERS,
    };
    expect(getOtherPlayers(state)).toEqual([
      {
        id: 'PLAYER3',
        name: 'Temple of Artemis in Ephesus',
        money: '3 coins',
        shields: '1 shield',
        stages: [
          { effects: ['3 points'], isCompleted: true },
          { effects: ['9 coins'], isCompleted: true },
          { effects: ['7 points'], isCompleted: true },
        ],
      },
      {
        id: 'PLAYER2',
        name: 'Colossus of Rhodes',
        money: '3 coins',
        shields: '2 shields',
        stages: [
          { effects: ['3 points'], isCompleted: true },
          { effects: ['2 shields'], isCompleted: true },
          { effects: ['7 points'], isCompleted: false },
        ],
      },
    ]);
  });
});

describe('getMoney', () => {
  it('selects the pluralized money of the current player', () => {
    const state = {
      app: { currentPlayer: 'PLAYER1' },
      players: {
        PLAYER1: {
          id: 'PLAYER1',
          money: 3,
        },
        PLAYER2: {
          id: 'PLAYER2',
        },
        PLAYER3: {
          id: 'PLAYER3',
        },
      },
    };
    expect(getMoney(state)).toBe('3 coins');
  });
});

describe('getPlayerScores', () => {
  it('selects the scores of all the players', () => {
    const state = {
      app: { currentPlayer: 'PLAYER1' },
      players: PLAYERS,
    };
    expect(getPlayerScores(state)).toEqual({
      winner: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
      playerScores: [
        {
          player: 'PYRAMIDS_OF_GIZA',
          scores: [
            { score: 0, type: 'MILITARY' },
            { score: 1, type: 'MONEY' },
            { score: 3, type: 'WONDER' },
            { score: 0, type: 'CIVIC' },
            { score: 0, type: 'SCIENCE' },
            { score: 0, type: 'TRADE' },
            { score: 0, type: 'GUILD' },
            { score: 4, type: 'TOTAL' },
          ],
        },
        {
          player: 'COLOSSUS_OF_RHODES',
          scores: [
            { score: 0, type: 'MILITARY' },
            { score: 1, type: 'MONEY' },
            { score: 3, type: 'WONDER' },
            { score: 5, type: 'CIVIC' },
            { score: 0, type: 'SCIENCE' },
            { score: 0, type: 'TRADE' },
            { score: 0, type: 'GUILD' },
            { score: 9, type: 'TOTAL' },
          ],
        },
        {
          player: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
          scores: [
            { score: 0, type: 'MILITARY' },
            { score: 1, type: 'MONEY' },
            { score: 10, type: 'WONDER' },
            { score: 0, type: 'CIVIC' },
            { score: 0, type: 'SCIENCE' },
            { score: 0, type: 'TRADE' },
            { score: 0, type: 'GUILD' },
            { score: 11, type: 'TOTAL' },
          ],
        },
      ],
    });
  });
});

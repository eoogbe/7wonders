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
import { getCardHands, getCardMoney } from '../cards';

describe('getCardHands', () => {
  it('returns the number of hands for the player count', () => {
    const hands = getCardHands({ ageIdx: 0, playerCount: 3 });
    expect(hands).toHaveLength(3);
  });
  it('returns 7 cards per hand', () => {
    const hands = getCardHands({ ageIdx: 0, playerCount: 3 });
    expect(hands[0]).toHaveLength(7);
    expect(hands[1]).toHaveLength(7);
    expect(hands[2]).toHaveLength(7);
  });
  describe('when Age 3', () => {
    it('returns 7 cards per hand', () => {
      const hands = getCardHands({ ageIdx: 2, playerCount: 3 });
      expect(hands[0]).toHaveLength(7);
      expect(hands[1]).toHaveLength(7);
      expect(hands[2]).toHaveLength(7);
    });
  });
});

describe('getCardMoney', () => {
  it('when card has money adds the money', () => {
    const card = getCardMoney(createState({ cardId: 'TAVERN' }));
    expect(card).toEqual({ id: 'TAVERN', money: 5 });
  });
  it('when card has coin cost subtracts the coin cost', () => {
    const card = getCardMoney(createState({ cardId: 'CLAY_PIT' }));
    expect(card).toEqual({ id: 'CLAY_PIT', money: -1 });
  });
  it('when has NEIGHBORING_BROWN_MONEY effect adds the number of brown cards all the neighboring players have', () => {
    const card = getCardMoney(createState({ cardId: 'VINEYARD' }));
    expect(card).toEqual({ id: 'VINEYARD', money: 2 });
  });
  it('when has NEIGHBORING_GRAY_MONEY effect adds twice the number of gray cards all the neighboring players have', () => {
    const card = getCardMoney(createState({ cardId: 'BAZAR' }));
    expect(card).toEqual({ id: 'BAZAR', money: 2 });
  });
  it('when has BROWN_POINTS effect adds the number of brown cards the player has', () => {
    const card = getCardMoney(createState({
      cardId: 'HAVEN',
      tableau: ['FOREST_CAVE', 'WORKSHOP', 'SCRIPTORIUM'],
    }));
    expect(card).toEqual({ id: 'HAVEN', money: 1 });
  });
  it('when has YELLOW_POINTS effect adds the number of yellow cards the player has', () => {
    const card = getCardMoney(createState({ cardId: 'LIGHTHOUSE' }));
    expect(card).toEqual({ id: 'LIGHTHOUSE', money: 1 });
  });
  it('when has GRAY_POINTS effect adds twice the number of gray cards the player has', () => {
    const card = getCardMoney(createState({
      cardId: 'CHAMBER_OF_COMMERCE',
      tableau: ['LOOM', 'LUMBER_YARD', 'SAWMILL'],
    }));
    expect(card).toEqual({ id: 'CHAMBER_OF_COMMERCE', money: 2 });
  });
  it('when has WONDER_POINTS effect adds 3 times the number of completed wonder stages the player has', () => {
    const card = getCardMoney(createState({ cardId: 'ARENA' }));
    expect(card).toEqual({ id: 'ARENA', money: 3 });
  });
  it('when can build discarded structure ignores coin cost', () => {
    const card = getCardMoney(createState({
      cardId: 'CLAY_PIT',
      wonderAbilities: ['BUILD_DISCARDED'],
    }));
    expect(card).toEqual({ id: 'CLAY_PIT', money: 0 });
  });
  it('when structure is free ignores coin cost', () => {
    const card = getCardMoney(createState({
      cardId: 'CLAY_PIT',
      isFree: true,
    }));
    expect(card).toEqual({ id: 'CLAY_PIT', money: 0 });
  });
});

const createState = ({ cardId, isFree, ...player }) => ({
  currentPlayerId: 'PLAYER1',
  players: {
    ...PLAYERS,
    PLAYER1: {
      ...PLAYERS.PLAYER1,
      ...player,
    },
  },
  cardId,
  isFree,
});

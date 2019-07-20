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
  compose, filter, map, prop, propEq, repeat, splitEvery, take, unnest, values,
} from 'ramda';
import CARDS from 'data/cards';
import { getNeighboringTableauCards } from './neighbors';
import shuffle from './shuffle';
import { getTableauCardsWithoutWonder } from './tableau';

const getAgeCardIds = ({ ageIdx, playerCount }) => {
  const cards = compose(
    filter(propEq('age', ageIdx)),
    values
  )(CARDS);
  return cards.reduce((acc, { id, frequencies }) => {
    const frequency = frequencies[playerCount - 3];
    return acc.concat(repeat(id, frequency));
  }, []);
};

const getGuildCardIds = ({ playerCount }) => {
  const cardIds = compose(
    map(prop('id')),
    filter(propEq('type', 'GUILD')),
    values
  )(CARDS);
  shuffle(cardIds);
  return take(playerCount + 2, cardIds);
};

export const getCardHands = ({ ageIdx, playerCount }) => {
  const ageCardIds = getAgeCardIds({ ageIdx, playerCount })
  const guildCardIs = ageIdx === 2 ? getGuildCardIds({ playerCount }) : [];

  const cardIds = ageCardIds.concat(guildCardIs);
  shuffle(cardIds);

  return compose(
    take(playerCount),
    splitEvery(7)
  )(cardIds);
};

export const getCardMoney = ({ currentPlayerId, players, cardId, isFree }) => {
  const card = CARDS[cardId];
  const neighboringTableCards =
    unnest(getNeighboringTableauCards({ currentPlayerId, players }));

  if (card.special === 'NEIGHBORING_BROWN_MONEY') {
    const brownCards =
      neighboringTableCards.filter(propEq('type', 'RAW_MATERIAL'));
    return { id: cardId, money: brownCards.length };
  }

  if (card.special === 'NEIGHBORING_GRAY_MONEY') {
    const grayCards =
      neighboringTableCards.filter(propEq('type', 'MANUFACTURED_GOOD'));
    return { id: cardId, money: grayCards.length * 2 };
  }

  if (card.special === 'BROWN_POINTS') {
    const tableauCards = getTableauCardsWithoutWonder(players[currentPlayerId]);
    const brownCards = tableauCards.filter(propEq('type', 'RAW_MATERIAL'));
    return { id: cardId, money: brownCards.length };
  }

  if (card.special === 'YELLOW_POINTS') {
    const tableauCards = getTableauCardsWithoutWonder(players[currentPlayerId]);
    const yellowCards = tableauCards.filter(propEq('type', 'TRADE'));
    return { id: cardId, money: yellowCards.length };
  }

  if (card.special === 'GRAY_POINTS') {
    const tableauCards = getTableauCardsWithoutWonder(players[currentPlayerId]);
    const grayCards = tableauCards.filter(propEq('type', 'MANUFACTURED_GOOD'));
    return { id: cardId, money: grayCards.length * 2 };
  }

  if (card.special === 'WONDER_POINTS') {
    const { completedWonderStageCount } = players[currentPlayerId];
    return { id: cardId, money: completedWonderStageCount * 3 };
  }

  const { wonderAbilities } = players[currentPlayerId];
  const coinCost =
    isFree || wonderAbilities.includes('BUILD_DISCARDED') ? 0 : card.coinCost;

  return { id: cardId, money: card.money - coinCost };
};

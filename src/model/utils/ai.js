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

import { compose, take } from 'ramda';
import { getDiscardedCards } from './ages';
import { getCardMoney } from './cards';
import * as paymentCost from './paymentCost';
import { removeHandCard } from './hands';
import {
  addMoney, buildStructure, buildWonder, setStructurePayments,
  setWonderPayments,
} from './players';
import {
  getAddMoneyCost, getBuildStructureCost, getBuildWonderCost,
} from './turn';

const buildStructureFns = ({ getPayments, currentPlayerId, players }) => {
  const currentPlayer = players[currentPlayerId];
  const cardIdx = currentPlayer.hand.findIndex((selectedCardId) =>
    getBuildStructureCost({
      currentPlayerId,
      players,
      selectedCardId,
    }) != null);
  if (cardIdx < 0) {
    return [];
  }

  const cardId = currentPlayer.hand[cardIdx];
  const cardMoney = getCardMoney({ currentPlayerId, players, cardId });

  return [
    removeHandCard({ cardIdx }),
    buildStructure({ card: cardMoney }),
    setStructurePayments({ getPayments, cardId }),
  ];
};

const buildDiscarded = ({ players, ages }) => (currentPlayer) => {
  const discardedCards = getDiscardedCards({ currentPlayer, ages });
  if (!discardedCards.length) {
    return currentPlayer;
  }

  if (!currentPlayer.wonderAbilities.includes('BUILD_DISCARDED')) {
    return currentPlayer;
  }

  const cardMoney = getCardMoney({
    players,
    currentPlayerId: currentPlayer.id,
    cardId: discardedCards[0].id,
  });
  return buildStructure({ card: cardMoney })(currentPlayer);
};

const buildWonderFns = ({ getPayments, currentPlayerId, players, ages }) => {
  const { hand } = players[currentPlayerId];
  const cost = getBuildWonderCost({
    currentPlayerId,
    players,
    selectedCardId: hand[0],
  });
  if (cost == null) {
    return [];
  }

  return [
    buildDiscarded({ players, ages }),
    removeHandCard({ cardIdx: 0 }),
    buildWonder(),
    setWonderPayments({ getPayments }),
  ];
};

const addMoneyFns = ({ currentPlayerId, players }) => {
  const { hand } = players[currentPlayerId];
  const cost = getAddMoneyCost({ selectedCardId: hand[0] });
  return cost == null ? [] : [removeHandCard({ cardIdx: 0 }), addMoney()];
};

export const takeTurn = ({ currentPlayerId, players, ages }) => {
  const currentPlayer = players[currentPlayerId];
  const getPayments = (cost) => {
    const payments = paymentCost.getPayments({
      currentPlayerId,
      players,
      cost,
    });
    return take(1, payments);
  };
  const turnFns = [
    buildStructureFns({ getPayments, currentPlayerId, players }),
    buildWonderFns({ getPayments, currentPlayerId, players, ages }),
    addMoneyFns({ currentPlayerId, players }),
  ].find((fns) => fns.length);
  if (turnFns == null) {
    return currentPlayer;
  }

  const action = compose.apply(null, turnFns);
  return action(currentPlayer);
};

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

import { assocPath, evolve, map, mergeLeft, remove } from 'ramda';
import CARDS from 'data/cards';
import { getDiscardedCards } from './ages';
import { getNeighborGuildCards, getNeighboringPlayers } from './neighbors';
import { getIsCopyingGuild } from './players';

export const getHand = ({ currentPlayerId, players, ages }) => {
  const currentPlayer = players[currentPlayerId];
  const canBuildDiscarded =
    currentPlayer.wonderAbilities.includes('BUILD_DISCARDED');
  const isCopyingGuild = getIsCopyingGuild({ currentPlayerId, players, ages });
  const discardedCards = getDiscardedCards({ currentPlayer, ages });

  if (canBuildDiscarded && discardedCards.length) {
    return discardedCards.map(mergeLeft({ resourceCost: [], coinCost: 0 }));
  }

  if (isCopyingGuild) {
    return getNeighborGuildCards({ currentPlayerId, players });
  }

  return currentPlayer.hand.map((id) => CARDS[id]);
};

export const deal = ({ hands }) => (players) => {
  const playerIds = Object.keys(players);
  return hands.reduce((acc, hand, idx) => {
    const playerId = playerIds[idx];
    return assocPath([playerId, 'hand'], hand, acc);
  }, players);
};

export const swapHands = ({ neighborIdx }) => (players) =>
  map((currentPlayer) => {
    const neighboringPlayers = getNeighboringPlayers({
      currentPlayerId: currentPlayer.id,
      players,
    });
    const { hand } = neighboringPlayers[neighborIdx];
    return { ...currentPlayer, hand };
  }, players);

export const removeHandCard = ({ cardIdx }) =>
  evolve({ hand: remove(cardIdx, 1) });

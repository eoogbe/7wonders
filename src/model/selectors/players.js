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

import { difference, includes, prop } from 'ramda';
import { createSelector } from 'reselect';
import WONDERS from 'data/wonders';
import { getDiscardedCards } from '../utils/ages';
import * as hands from '../utils/hands';
import * as military from '../utils/military';
import { getNeighboringIds } from '../utils/neighbors';
import * as playerUtils from '../utils/players';
import * as tableau from '../utils/tableau';
import { getAges, getCurrentRounds, getIsLastAge } from './ages';
import {
  getCurrentPlayerId, getSelectedCardId, getWonderChooserPlayerId,
} from './app';

export const getPlayers = prop('players');

export const getGame = prop('game');

export const getOtherPlayerIds = createSelector(
  [getPlayers, getCurrentPlayerId],
  (players, currentPlayerId) => {
    const playerIds = Object.keys(players);
    const neighboringIds = getNeighboringIds({ playerIds, currentPlayerId });
    const nonNeighborPlayerIds = difference(playerIds, neighboringIds);
    const [leftNeighborId, /* playerId */, rightNeighborId] = neighboringIds;
    return [
      leftNeighborId,
      ...nonNeighborPlayerIds,
      rightNeighborId,
    ];
  }
);

export const getOtherPlayers = createSelector(
  [getPlayers, getOtherPlayerIds],
  (players, playerIds) => playerIds.map((id) => players[id])
);

export const getCurrentPlayer = createSelector(
  [getCurrentPlayerId, getPlayers],
  prop
);

export const getWonder = createSelector(
  [getCurrentPlayer],
  (player) => WONDERS[player.wonder]
);

export const getWonderSide = createSelector(
  [getCurrentPlayer],
  prop('wonderSide')
);

export const getWonderStages = createSelector(
  [getWonderSide, getWonder],
  prop
);

export const getTableau = createSelector(
  [getCurrentPlayer],
  prop('tableau')
);

export const getTableauCards = createSelector(
  [getCurrentPlayer],
  tableau.getTableauCards
);

export const getMoney = createSelector(
  [getCurrentPlayer],
  prop('money')
);

export const getCompletedWonderStageCount = createSelector(
  [getCurrentPlayer],
  prop('completedWonderStageCount')
);

export const getStructurePayments = createSelector(
  [getCurrentPlayer],
  prop('structurePayments')
);

export const getWonderPayments = createSelector(
  [getCurrentPlayer],
  prop('wonderPayments')
);

export const getWonderAbilities = createSelector(
  [getCurrentPlayer],
  prop('wonderAbilities')
)

export const getCanBuildDiscarded = createSelector(
  [getCurrentPlayer, getAges],
  (currentPlayer, ages) => {
    if (currentPlayer == null) {
      return false;
    }

    if (!currentPlayer.wonderAbilities.includes('BUILD_DISCARDED')) {
      return false;
    }

    const discardedCards = getDiscardedCards({ currentPlayer, ages });
    return discardedCards.length > 0;
  }
);

export const getCanBuildFree = createSelector(
  [getWonderAbilities],
  includes('BUILD_FREE')
);

export const getCanPlayLastCard = createSelector(
  [getWonderAbilities],
  includes('PLAY_LAST_CARD')
);

export const getCanCopyGuild =  createSelector(
  [getWonderAbilities],
  includes('COPY_GUILD')
);

export const getIsCopyingGuild = createSelector(
  [getCurrentPlayerId, getPlayers, getAges],
  (currentPlayerId, players, ages) =>
    playerUtils.getIsCopyingGuild({ currentPlayerId, players, ages })
);

export const getHandCardIds = createSelector(
  [getCurrentPlayer],
  prop('hand')
);

export const getHand = createSelector(
  [getCurrentPlayerId, getPlayers, getAges],
  (currentPlayerId, players, ages) =>
    hands.getHand({ currentPlayerId, players, ages })
);

export const getShields = createSelector(
  [getCurrentPlayer],
  military.getShields
);

export const getIsBuildingFree = createSelector(
  [getSelectedCardId, getCurrentPlayerId, getPlayers],
  (selectedCardId, currentPlayerId, players) =>
    playerUtils.getIsBuildingFree({
      currentPlayerId,
      players,
      selectedCardId,
    })
);

export const getIsPlayingLastRound = createSelector(
  [getCanPlayLastCard, getCurrentRounds],
  (canPlayLastCard, rounds) => {
    const lastRound = canPlayLastCard ? 7 : 6;
    return rounds === lastRound;
  }
);

export const getHasEmptyHands = createSelector(
  [getPlayers],
  (players) => Object.values(players).every(({ hand }) => !hand.length)
);

export const getIsGameOver = createSelector(
  [getHasEmptyHands, getIsLastAge],
  (hasEmptyHands, isLastAge) => hasEmptyHands && isLastAge
);

export const getWonderChooserPlayer = createSelector(
  [getWonderChooserPlayerId, getPlayers],
  prop
);

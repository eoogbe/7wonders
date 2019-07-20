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

import { identity, insert, prop } from 'ramda';
import { createSelector } from 'reselect';
import WONDERS from 'data/wonders';
import * as app from 'model/selectors/app';
import * as players from 'model/selectors/players';
import { getPaymentCost } from 'model/utils/paymentCost';
import { getBuildWonderCost } from 'model/utils/turn';
import { WONDER_IDS } from 'model/utils/wonder';
import { getEffects, getItemByCount, getLongEffects } from './card';
import { pluralizeCoins } from './plurals';

const getStage = ({ completedStageCount, payment }) =>
  ({ cost, ...stage }, idx) => ({
    cost,
    effects: getEffects(stage),
    isCompleted: completedStageCount > idx,
    isNext: completedStageCount === idx,
    payment,
  });

export const getWonderStages = createSelector(
  [
    app.getCurrentPlayerId,
    players.getPlayers,
    players.getWonderStages,
    players.getCompletedWonderStageCount,
  ],
  (currentPlayerId, players, stages, completedStageCount) =>
    stages.map(getStage({
      completedStageCount,
      payment: getBuildWonderCost({
        currentPlayerId,
        players,
        selectedCardId: 'DUMMY',
      }),
    }))
);

const getPaymentMessage = ({ currentPlayerId, players, cost, stageIdx }) => {
  const { completedWonderStageCount } = players[currentPlayerId];
  if (stageIdx < completedWonderStageCount) {
    return 'You have built this stage.';
  }

  if (stageIdx > completedWonderStageCount) {
    return `You need to build Stage ${stageIdx} before building this stage.`;
  }

  const payment = getPaymentCost({
    currentPlayerId,
    players,
    cost,
  });
  if (payment == null) {
    return 'You cannot afford to build this stage.';
  }

  if (payment === 0) {
    return 'You can build this stage for free.';
  }

  return `It will cost ${pluralizeCoins(payment)} to build this stage.`;
};

export const getWonderCallout = ({ stageIdx }) => (state) => {
  const stages = players.getWonderStages(state);
  const { cost, ...stage } = stages[stageIdx];
  return {
    cost: getItemByCount(identity, cost),
    effects: getLongEffects(stage),
    payment: getPaymentMessage({
      currentPlayerId: state.app.currentPlayer,
      players: state.players,
      cost: cost,
      stageIdx,
    }),
  };
};

const getPlayerWonder = ({ isCurrentPlayer }) => (player) => {
  const { id, name } = WONDERS[player.wonder];
  return {
    id,
    name: `${name} (${player.wonderSide})`,
    playerId: player.id,
    isCurrentPlayer,
  };
};

export const getPlayerWonders = createSelector(
  [players.getCurrentPlayer, players.getOtherPlayers],
  (currentPlayer, otherPlayers) => {
    const currentPlayerIdx = Math.ceil(otherPlayers.length / 2);
    const currentPlayerWonder =
      getPlayerWonder({ isCurrentPlayer: true })(currentPlayer);
    const otherPlayerWonders =
      otherPlayers.map(getPlayerWonder({ isCurrentPlayer: false }));
    return insert(currentPlayerIdx, currentPlayerWonder, otherPlayerWonders);
  }
);

const getWonder = ({ selectedId }) => (id) => {
  const { name } = WONDERS[id];
  return {
    id,
    name,
    isSelected: id === selectedId,
  };
};

export const getWonderChooserWonders = createSelector(
  [players.getWonderChooserPlayer],
  (player) =>
    WONDER_IDS.map(getWonder({ selectedId: player.wonder }))
);

export const getWonderChooserStages = createSelector(
  [players.getWonderChooserPlayer],
  (player) => {
    const stages = WONDERS[player.wonder][player.wonderSide];
    return stages.map(({ cost, ...stage }) => ({
      cost,
      effects: getEffects(stage),
    }));
  }
);

export const getWonderChooserWonderSide = createSelector(
  [players.getWonderChooserPlayer],
  prop('wonderSide')
);

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

import { assoc, clone, evolve, mergeDeepLeft, prop, times } from 'ramda';
import { concat, handleAction, match } from 'redux-fp';
import {
  ADD_MONEY, COPY_GUILD, PICK_PLAYER_COUNT, QUIT, START_AGE,
} from '../actions';
import { getCardMoney } from '../utils/cards';
import objectLength from '../utils/objectLength';
import * as playerUtils from '../utils/players';
import shuffle from '../utils/shuffle';
import { WONDER_IDS } from '../utils/wonder';
import { isTryBuildStructure, isTryBuildWonder } from './utils';

const getShuffledWonders = () => {
  const wonders = clone(WONDER_IDS);
  shuffle(wonders);
  return wonders;
}

const setupPlayers =
  handleAction(PICK_PLAYER_COUNT, () => (state) => {
    const wonders = getShuffledWonders();
    const nextId = objectLength(state.players);
    const playerWonders = times((n) => ({
      id: `PLAYER${nextId + n}`,
      wonder: wonders[n],
    }), state.app.playerPickerCount);
    const playerIds = playerWonders.map(prop('id'));
    return mergeDeepLeft({
      app:{ currentPlayer: playerIds[0] },
      players: playerUtils.setupPlayers({ playerWonders }),
    }, state);
  });

const resetWonderEffects =
  handleAction(START_AGE, () => (state) =>
    evolve({
      players: {
        [state.app.currentPlayer]: playerUtils.resetWonderEffects(),
      },
    }, state));

const buildStructure =
  match(isTryBuildStructure, ({ payload }) => (state) => {
    const currentPlayerId = state.app.currentPlayer;
    const cardMoney = getCardMoney({
      currentPlayerId,
      players: state.players,
      cardId: state.app.selectedCardId || payload.cardId,
      isFree: payload.isFree,
    });
    return evolve({
      players: {
        [currentPlayerId]: playerUtils.buildStructure({
          card: cardMoney,
        }),
      },
    }, state);
  });

const buildWonder =
  match(isTryBuildWonder, () => (state) =>
    evolve({
      players: {
        [state.app.currentPlayer]: playerUtils.buildWonder(),
      },
    }, state));

const addMoney =
  handleAction(ADD_MONEY, () => (state) =>
    evolve({
      players: {
        [state.app.currentPlayer]: playerUtils.addMoney(),
      },
    }, state));

const copyGuild =
  handleAction(COPY_GUILD, ({ payload }) => (state) =>
    evolve({
      players: {
        [state.app.currentPlayer]: playerUtils.copyGuild({
          cardId: payload.cardId,
        }),
      }
    }, state));

const quit = handleAction(QUIT, () => assoc('players', {}));

export default concat(
  setupPlayers,
  resetWonderEffects,
  buildStructure,
  buildWonder,
  addMoney,
  copyGuild,
  quit
);

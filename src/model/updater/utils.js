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

import { match } from 'redux-fp';
import {
  ADD_MONEY, BUILD_STRUCTURE, BUILD_WONDER, CHOOSE_NEIGHBOR,
} from '../actions';
import {
  getCanBuildDiscarded, getHasEmptyHands, getIsPlayingLastRound
} from '../selectors/players';

export const matchActions = (actions, updater) =>
  match(({ type }) => () => actions.includes(type), updater);

export const isTryBuildStructure = ({ type }) => (state) => {
  if (type === CHOOSE_NEIGHBOR) {
    return state.app.lastHandAction === BUILD_STRUCTURE;
  }

  if (type !== BUILD_STRUCTURE) {
    return false;
  }

  const { structurePayments } = state.players[state.app.currentPlayer];
  return structurePayments.length === 1;
};

export const isTryBuildWonder = ({ type }) => (state) => {
  if (type === CHOOSE_NEIGHBOR) {
    return state.app.lastHandAction === BUILD_WONDER;
  }

  if (type !== BUILD_WONDER) {
    return false;
  }

  const { wonderPayments } = state.players[state.app.currentPlayer];
  return wonderPayments.length === 1;
};

export const isPlayingHand = (action) => (state) => {
  if (state.app.currentPlayer == null) {
    return false;
  }

  if (getCanBuildDiscarded(state)) {
    return false;
  }

  if (isTryBuildStructure(action)(state)) {
    return true;
  }

  if (isTryBuildWonder(action)(state)) {
    return true;
  }

  return action.type === ADD_MONEY;
};

export const hasMoreTurns = (action) => (state) =>
  isPlayingHand(action)(state) && !getIsPlayingLastRound(state);

export const isLastRound = (action) => (state) =>
  isPlayingHand(action)(state) && getIsPlayingLastRound(state);

export const isFinishingAge = (action) => (state) =>
  isPlayingHand(action)(state) && getHasEmptyHands(state);

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
  assoc, assocPath, dec, evolve, gt, inc, lt, mergeDeepLeft, when,
} from 'ramda';
import { concat, handleAction, match } from 'redux-fp';
import {
  BUILD_STRUCTURE, BUILD_WONDER, COPY_GUILD, DECREMENT_PLAYER_PICKER,
  HIDE_CALLOUT, INCREMENT_PLAYER_PICKER, PICK_PLAYER_COUNT, QUIT, SCORE_GAME,
  SHOW_CALLOUT, SELECT_HAND_CARD, START_AGE, VIEW_GAME_BOARD,
  VIEW_WONDER_CHOOSER, VIEW_WONDER_PANEL,
} from '../actions';
import { getCanBuildDiscarded } from '../selectors/players';
import { MAX_PLAYER_COUNT, MIN_PLAYER_COUNT } from '../utils/app';
import { isFinishingAge, isPlayingHand, matchActions } from './utils';

export const initialAppState = {
  currentPlayer: null,
  selectedCardId: null,
  selectedCardIdx: null,
  lastHandAction: null,
  scene: 'PLAYER_PICKER',
  playerPickerCount: MIN_PLAYER_COUNT,
  wonderChooserPlayer: null,
  callout: null,
};

const decrementPlayerPicker =
  handleAction(DECREMENT_PLAYER_PICKER, () =>
  evolve({
    app: {
      playerPickerCount: when(lt(MIN_PLAYER_COUNT), dec),
    },
  }));

const incrementPlayerPicker =
  handleAction(INCREMENT_PLAYER_PICKER, () =>
    evolve({
      app: {
        playerPickerCount: when(gt(MAX_PLAYER_COUNT), inc),
      },
    }));

const viewWonderPanel =
  matchActions([PICK_PLAYER_COUNT, VIEW_WONDER_PANEL], () =>
    assocPath(['app', 'scene'], 'WONDER_PANEL'));

const viewWonderChooser =
  handleAction(VIEW_WONDER_CHOOSER, ({ payload }) =>
    mergeDeepLeft({
      app: {
        scene: 'WONDER_CHOOSER',
        wonderChooserPlayer: payload.playerId,
      },
    }));

const startAge =
  handleAction(START_AGE, () => assocPath(['app', 'scene'], 'AGE'));

const viewGameBoard =
  handleAction(VIEW_GAME_BOARD, () =>
    assocPath(['app', 'scene'], 'GAME_BOARD'));

const selectHandCard =
  handleAction(SELECT_HAND_CARD, ({ payload }) =>
    mergeDeepLeft({
      app: {
        selectedCardId: payload.cardId,
        selectedCardIdx: payload.cardIdx,
      },
    }));

const setBuildStructure =
  handleAction(BUILD_STRUCTURE, () =>
    assocPath(['app', 'lastHandAction'], BUILD_STRUCTURE));

const setBuildWonder =
  handleAction(BUILD_WONDER, () =>
    assocPath(['app', 'lastHandAction'], BUILD_WONDER));

const isUnselectingCard = (action) => (state) =>
  isPlayingHand(action)(state) || getCanBuildDiscarded(state);

const unselectCard =
  match(isUnselectingCard, () =>
    mergeDeepLeft({
      app: { selectedCardId: null, selectedCardIdx: null },
    }));

const finishAge =
  match(isFinishingAge, () => assocPath(['app', 'scene'], 'WAR'));

const scoreGame =
  matchActions([COPY_GUILD, SCORE_GAME], () =>
    assocPath(['app', 'scene'], 'SCORE_BOARD'));

const quit = handleAction(QUIT, () => assoc('app', initialAppState));

const showCallout =
  handleAction(SHOW_CALLOUT, ({ payload }) =>
    assocPath(['app', 'callout'], payload));

const hideCallout =
  handleAction(HIDE_CALLOUT, () => assocPath(['app', 'callout'], null));

export default concat(
  decrementPlayerPicker,
  incrementPlayerPicker,
  viewWonderPanel,
  viewWonderChooser,
  startAge,
  viewGameBoard,
  selectHandCard,
  setBuildStructure,
  setBuildWonder,
  unselectCard,
  finishAge,
  scoreGame,
  quit,
  showCallout,
  hideCallout,
);

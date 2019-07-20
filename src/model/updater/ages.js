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

import * as R from 'ramda';
import { concat, handleAction, match } from 'redux-fp';
import { ADD_MONEY, QUIT, START_AGE } from '../actions';
import { getCurrentAgeIndex } from '../selectors/ages';
import { getIsPlayingLastRound } from '../selectors/players';
import { isLastRound, isPlayingHand } from './utils';

const addAge =
  handleAction(START_AGE, () =>
    R.evolve({
      ages: R.append({ rounds: 0, discardedCards: [] }),
    }));

const addRound =
  match(isPlayingHand, () => (state) =>
    R.evolve({
      ages: {
        [getCurrentAgeIndex(state)]: {
          rounds: R.inc,
        },
      },
    }, state));

const isAddingMoneyWithMoreTurns = ({ type }) => (state) =>
  type === ADD_MONEY && !getIsPlayingLastRound(state);

const addMoney =
  match(isAddingMoneyWithMoreTurns, () => (state) =>
    R.evolve({
      ages: {
        [getCurrentAgeIndex(state)]: {
          discardedCards: R.append(state.app.selectedCardId),
        },
      },
    }, state));

const finishAge =
  match(isLastRound, () => (state) => {
    const lastCardIds = R.compose(
      R.chain(R.prop('hand')),
      R.values
    )(state.players);
    return R.evolve({
      ages: {
        [getCurrentAgeIndex(state)]: {
          discardedCards: R.concat(lastCardIds),
        },
      },
    }, state);
  });

const quit = handleAction(QUIT, () => R.assoc('ages', []));

export default concat(addAge, addRound, addMoney, finishAge, quit);

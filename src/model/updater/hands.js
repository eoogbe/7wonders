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

import { assoc, evolve, map } from 'ramda';
import { concat, handleAction, match } from 'redux-fp';
import { START_AGE } from '../actions';
import { getCurrentAgeIndex } from '../selectors/ages';
import { getCardHands } from '../utils/cards';
import * as handUtils from '../utils/hands';
import objectLength from '../utils/objectLength';
import { hasMoreTurns, isLastRound, isPlayingHand } from './utils';

const deal =
  handleAction(START_AGE, () => (state) => {
    const hands =  getCardHands({
      ageIdx: getCurrentAgeIndex(state),
      playerCount: objectLength(state.players),
    });
    return evolve({
      players: handUtils.deal({ hands }),
    }, state);
  });

const removeHandCard =
  match(isPlayingHand, () => (state) =>
    evolve({
      players: {
        [state.app.currentPlayer]: handUtils.removeHandCard({
          cardIdx: state.app.selectedCardIdx,
        }),
      },
    }, state));

const swapHands =
  match(hasMoreTurns, () => (state) =>
    evolve({
      players: handUtils.swapHands({
        neighborIdx: state.ages.length === 2 ? 0 : 2,
      }),
    }, state));

const emptyHands =
  match(isLastRound, () =>
    evolve({
      players: map(assoc('hand', [])),
    }));

export default concat(deal, removeHandCard, swapHands, emptyHands);

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

import { assocPath, evolve } from 'ramda';
import { concat, handleAction } from 'redux-fp';
import { SELECT_WONDER, TOGGLE_WONDER_SIDE } from '../actions';
import { getWonderChooserPlayer } from '../selectors/players';
import * as wonder from '../utils/wonder';

const selectWonder =
  handleAction(SELECT_WONDER, ({ payload }) => (state) =>
    evolve({
      players: wonder.selectWonder({
        currentPlayerId: state.app.wonderChooserPlayer,
        wonderId: payload.wonderId,
      }),
    }, state));

const toggleWonderSide =
  handleAction(TOGGLE_WONDER_SIDE, () => (state) => {
    const { wonderSide } = getWonderChooserPlayer(state);
    return assocPath(
      ['players', state.app.wonderChooserPlayer, 'wonderSide'],
      wonderSide === 'A' ? 'B' : 'A',
      state
    );
  });

export default concat(selectWonder, toggleWonderSide);

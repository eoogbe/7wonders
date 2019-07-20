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

import { concat, decorate, withDefaultState } from 'redux-fp';
import ages from './ages';
import app, { initialAppState } from './app';
import copyAiGuild from './copyAiGuild';
import hands from './hands';
import military from './military';
import neighbors from './neighbors';
import players from './players';
import takeAiTurns from './takeAiTurns';
import trade from './trade';
import wonder from './wonder';

const initialState = {
  ages: [],
  players: {},
  app: initialAppState,
};

export default decorate(
  withDefaultState(initialState),
  concat(
    wonder,
    neighbors,
    takeAiTurns,
    ages,
    hands,
    players,
    military,
    copyAiGuild,
    app,
    trade
  )
);

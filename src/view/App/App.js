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

import React from 'react';
import { useSelector } from 'react-redux';
import { getScene } from 'model/selectors/app';
import AgeScene from '../scenes/AgeScene';
import GameBoard from '../scenes/GameBoard';
import PlayerPicker from '../scenes/PlayerPicker';
import ScoreBoard from '../scenes/ScoreBoard';
import War from '../scenes/War';
import WonderChooser from '../scenes/WonderChooser';
import WonderPanel from '../scenes/WonderPanel';

const SCENES = {
  PLAYER_PICKER: <PlayerPicker />,
  WONDER_PANEL: <WonderPanel />,
  WONDER_CHOOSER: <WonderChooser />,
  AGE: <AgeScene />,
  GAME_BOARD: <GameBoard />,
  WAR: <War />,
  SCORE_BOARD: <ScoreBoard />,
};

const App = () => {
  const scene = useSelector(getScene);
  return SCENES[scene];
};

export default App;

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
import { compose } from 'ramda';
import { useDispatch } from 'react-redux';
import * as actions from 'model/actions';
import QuitButton from 'view/components/QuitButton';
import * as theme from 'view/theme';
import './GameOverPanel.css';

const GameOverPanel = () => {
  const dispatch = useDispatch();
  const scoreGame = compose(dispatch, actions.scoreGame);

  const buttonStyle = {
    fontSize: '1.25em',
    width: '8em',
    backgroundColor: theme.primaryColor,
    color: '#FFF',
  };

  return (
    <div className="GameOverPanel">
      <QuitButton style={buttonStyle} />
      <button
        className="primary-button"
        style={buttonStyle}
        type="button"
        onClick={scoreGame}
      >
        View scores
      </button>
    </div>
  );
};

export default GameOverPanel;

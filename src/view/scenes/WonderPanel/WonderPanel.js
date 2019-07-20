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
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'model/actions';
import { getPlayerWonders } from 'presentation/wonder';
import QuitButton from 'view/components/QuitButton';
import './WonderPanel.css';
import Wonder from './Wonder';

const renderWonder = ({ viewWonderChooser }) =>
  ({ id, ...wonder }) => (
    <Wonder key={id} {...wonder} viewWonderChooser={viewWonderChooser} />
  );

const WonderPanel = () => {
  const wonders = useSelector(getPlayerWonders);

  const dispatch = useDispatch();
  const viewWonderChooser = compose(dispatch, actions.viewWonderChooser);
  const startAge = compose(dispatch, actions.startAge);

  const quitButtonStyle = {
    position: 'absolute',
    left: 0,
    bottom: 0,
  };

  return (
    <div className="WonderPanel">
      <ul className="WonderPanel-wonderList">
        {wonders.map(renderWonder({ viewWonderChooser }))}
      </ul>
      <button
        className="WonderPanel-startButton primary-button"
        type="button"
        onClick={startAge}
      >
        Start game
      </button>
      <QuitButton style={quitButtonStyle} />
    </div>
  );
};

export default WonderPanel;

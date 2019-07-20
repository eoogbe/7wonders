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
import classnames from 'classnames';
import { compose } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'model/actions';
import {
  getWonderChooserWonderSide, getWonderChooserStages, getWonderChooserWonders,
} from 'presentation/wonder';
import QuitButton from 'view/components/QuitButton';
import * as theme from 'view/theme';
import './WonderChooser.css';
import WonderStage from './WonderStage';

const renderStage = (stage, idx) => (
  <WonderStage key={idx} {...stage} />
);

const renderWonder = ({ selectWonder }) => ({ id, name, isSelected }) => (
  <li
    key={id}
    className={classnames('WonderChooser-wonder', { selected: isSelected })}
    onClick={() => selectWonder(id)}
  >
    {name}
  </li>
);

const WonderChooser = () => {
  const selectedStages = useSelector(getWonderChooserStages);
  const wonderSide = useSelector(getWonderChooserWonderSide);
  const wonders = useSelector(getWonderChooserWonders);

  const dispatch = useDispatch();
  const selectWonder = compose(dispatch, actions.selectWonder);
  const toggleWonderSide = compose(dispatch, actions.toggleWonderSide);
  const viewWonderPanel = compose(dispatch, actions.viewWonderPanel);

  const wonderSideStyle = { backgroundColor: theme.primaryColor };
  const quitButtonStyle = {
    position: 'absolute',
    left: 0,
    bottom: 0,
  };

  return (
    <section className="WonderChooser">
      <h1 className="WonderChooser-title">
        Choose your wonder:
      </h1>
      <div className="WonderChooser-selectedWonder">
        <ol className="WonderChooser-stageList">
          {selectedStages.map(renderStage)}
        </ol>
        <button
          className="WonderChooser-wonderSide"
          style={wonderSideStyle}
          type="button"
          onClick={toggleWonderSide}
        >
          {wonderSide}
        </button>
      </div>
      <ul className="WonderChooser-wonderList">
        {wonders.map(renderWonder({ selectWonder }))}
      </ul>
      <button
        className="WonderChooser-nextButton primary-button"
        type="button"
        onClick={viewWonderPanel}
      >
        Choose wonder
      </button>
      <QuitButton style={quitButtonStyle} />
    </section>
  );
};

export default WonderChooser;

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
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'model/actions';
import { getPlayerPicker } from 'presentation/playerPicker';
import * as theme from 'view/theme';
import './PlayerPicker.css';

const getArrowStyle = (isEnabled) => ({
  color: isEnabled ? theme.primaryColor: theme.disabledColor,
});

const PlayerPicker = () => {
  const { playerCount, leftArrowEnabled, rightArrowEnabled } =
    useSelector(getPlayerPicker);

  const dispatch = useDispatch();
  const decrementPlayerCount = compose(dispatch, actions.decrementPlayerPicker);
  const incrementPlayerCount = compose(dispatch, actions.incrementPlayerPicker);
  const pickPlayerCount = compose(dispatch, actions.pickPlayerCount);

  return (
    <section className="PlayerPicker">
      <h1 className="PlayerPicker-title">
        Choose the number of players:
      </h1>
      <div className="PlayerPicker-picker">
        <button
          className="PlayerPicker-arrow"
          style={getArrowStyle(leftArrowEnabled)}
          type="button"
          disabled={!leftArrowEnabled}
          onClick={decrementPlayerCount}
        >
          <MdKeyboardArrowLeft />
        </button>
        <div className="PlayerPicker-playerCount">{playerCount}</div>
        <button
          className="PlayerPicker-arrow"
          style={getArrowStyle(rightArrowEnabled)}
          type="button"
          disabled={!rightArrowEnabled}
          onClick={incrementPlayerCount}
        >
          <MdKeyboardArrowRight />
        </button>
        <button
          className="PlayerPicker-nextButton primary-button"
          type="button"
          onClick={pickPlayerCount}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default PlayerPicker;

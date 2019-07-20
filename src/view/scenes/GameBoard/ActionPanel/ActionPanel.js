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
import { getIsBuildingFree } from 'model/selectors/players';
import {
  getAddMoneyCost, getBuildStructureCost, getBuildWonderCost
} from 'presentation/turn';
import './ActionPanel.css';

const renderButton = ({ action, text }) => (
  <li key={text}>
    <button
      className="primary-button"
      type="button"
      disabled={!action}
      onClick={() => action && action()}
    >
      {text}
    </button>
  </li>
);

const ActionPanel = () => {
  const buildStructureCost = useSelector(getBuildStructureCost);
  const buildWonderCost = useSelector(getBuildWonderCost);
  const addMoneyCost = useSelector(getAddMoneyCost);
  const isBuildingFree = useSelector(getIsBuildingFree);

  const dispatch = useDispatch();
  const buildStructure = compose(dispatch, actions.buildStructure);
  const buildWonder = compose(dispatch, actions.buildWonder);
  const addMoney = compose(dispatch, actions.addMoney);
  const buildFreeStructure = compose(dispatch, actions.buildFreeStructure);

  const buttons = [];
  if (isBuildingFree) {
    buttons.push({
      action: buildFreeStructure,
      text: 'Build FREE structure',
    });
  }

  if (isBuildingFree && buildStructureCost != null) {
    buttons.push({
      action: buildStructure,
      text: `Build structure for ${buildStructureCost}`,
    });
  }

  if (!isBuildingFree) {
    buttons.push({
      action: buildStructureCost != null && buildStructure,
      text: 'Build structure',
    });
  }

  buttons.push(
    {
      action: buildWonderCost != null && buildWonder,
      text: 'Build wonder',
    },
    {
      action: addMoneyCost != null && addMoney,
      text: 'Add money',
    }
  );

  return (
    <ul className="ActionPanel">
      {buttons.map(renderButton)}
    </ul>
  );
};

export default ActionPanel;

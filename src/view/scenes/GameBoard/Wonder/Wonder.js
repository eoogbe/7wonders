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
import { getCanBuildFree } from 'model/selectors/players';
import { getShields } from 'presentation/military';
import { getMoney } from 'presentation/players';
import { getWonderStages } from 'presentation/wonder';
import './Wonder.css';
import WonderStage from './WonderStage';

const renderStage = (stageActions) => (stage, idx) => (
  <WonderStage
    key={idx}
    {...stageActions}
    {...stage}
    index={idx}
  />
);

const Wonder = () => {
  const money = useSelector(getMoney);
  const shields = useSelector(getShields);
  const canBuildFree = useSelector(getCanBuildFree);
  const stages = useSelector(getWonderStages);

  const dispatch = useDispatch();
  const showWonderCallout = compose(dispatch, actions.showWonderCallout);

  return (
    <div>
      <div className="GameBoardWonder-tokenContainer">
        <div className="GameBoardWonder-token">{money}</div>
        <div className="GameBoardWonder-token">{shields}</div>
        {canBuildFree &&
          <div className="GameBoardWonder-token">Can build free structure</div>}
      </div>
      <ol className="GameBoardWonder-stageList">
        {stages.map(renderStage({ showWonderCallout }))}
      </ol>
    </div>
  );
};

export default Wonder;

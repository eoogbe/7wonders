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
import PlayerWonderStage from '../PlayerWonderStage';
import './PlayerWonder.css';

const renderStage = (stage, idx) => (
  <PlayerWonderStage key={idx} {...stage} />
);

const PlayerWonder = ({ stages }) => (
  <ol className="PlayerWonder">
    {stages.map(renderStage)}
  </ol>
);

export default PlayerWonder;

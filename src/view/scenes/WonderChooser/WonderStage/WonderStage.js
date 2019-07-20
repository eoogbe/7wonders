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
import './WonderStage.css';

const renderCostItem = (item, idx) => <li key={idx}>{item}</li>;

const renderEffect = (effect, idx) => (
  <li key={idx}>{effect}</li>
);

const WonderStage = ({ cost, effects }) => (
  <li className="WonderChooserWonderStage">
    <ul className="WonderChooserWonderStage-cost">
      {cost.map(renderCostItem)}
    </ul>
    <ul className="WonderChooserWonderStage-effectList">
      {effects.map(renderEffect)}
    </ul>
  </li>
);

export default WonderStage;

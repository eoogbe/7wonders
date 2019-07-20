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
import * as theme from 'view/theme';
import useCallout from '../../useCallout';
import './TableauCard.css';

const renderEffect = (effect, idx) => (
  <li key={idx} className="TableauCard-effect">{effect}</li>
);

const TableauCard = ({ id, type, effects, showTableauCallout }) => {
  const listeners = useCallout(() =>
    showTableauCallout && showTableauCallout(id));

  const style = {
    backgroundColor: theme.CARD_COLORS[type],
    border: `1px solid ${theme.primaryColor}`,
  };

  return (
    <li
      {...listeners}
      className="TableauCard"
      style={style}
    >
      <ul className="TableauCard-effectList">
        {effects.map(renderEffect)}
      </ul>
    </li>
  );
};

export default TableauCard;

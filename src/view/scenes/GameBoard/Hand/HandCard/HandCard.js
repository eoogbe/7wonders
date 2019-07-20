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
import { MdDone, MdNotInterested } from 'react-icons/md';
import * as theme from 'view/theme';
import useCallout from '../../useCallout';
import './HandCard.css';

const renderCostItem = (item, idx) => (
  <li key={idx} className="HandCard-costItem">{item}</li>
);

const renderEffect = (effect, idx) => (
  <li key={idx}>{effect}</li>
);

const renderPayment = (payment) => {
  if (payment == null) {
    return <MdNotInterested />;
  }

  if (payment === 0) {
    return <MdDone />;
  }

  return <div>-{payment}</div>;
};

const HandCard = ({
  id, index, name, type, effects, cost, payment, isSelected, select,
  showHandCallout,
}) => {
  const listeners = useCallout(() => showHandCallout(id));

  const style = { backgroundColor: theme.CARD_COLORS[type] };

  return (
    <li
      {...listeners}
      className={classnames('HandCard', { selected: isSelected })}
      style={style}
      onClick={() => select && select(id, index)}
    >
      {cost.length > 0 &&
        <ul className="HandCard-cost">
          {cost.map(renderCostItem)}
        </ul>}
      <ul>
        {effects.map(renderEffect)}
      </ul>
      <div className="HandCard-footer">
        {renderPayment(payment)}
        <div className="HandCard-name">{name}</div>
      </div>
    </li>
  );
};

export default HandCard;

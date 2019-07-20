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
import { useSelector } from 'react-redux';
import { getWonder } from 'model/selectors/players';
import { getWonderCallout } from 'presentation/wonder';
import CalloutSection from '../CalloutSection';
import '../Callout.css';

const WonderCallout = ({ stageIdx }) => {
  const { name } = useSelector(getWonder);
  const { effects, cost, payment } =
    useSelector(getWonderCallout({ stageIdx }));

  return (
    <section>
      <header className="Callout-header">
        <h2 className="Callout-title">{name}</h2>
        <p className="Callout-subtitle">Stage {stageIdx + 1}</p>
      </header>
      <CalloutSection heading="This stage awards" items={effects} />
      <CalloutSection heading="It costs" items={cost} />
      <p className="Callout-paragraph">{payment}</p>
    </section>
  );
};

export default WonderCallout;

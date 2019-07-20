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
import { getTableauCard } from 'presentation/tableaus';
import CalloutSection from '../CalloutSection';
import '../Callout.css';

const TableauCallout = ({ cardId }) => {
  const { name, type, effects, chainedStructures } = getTableauCard(cardId);

  return (
    <section>
      <h2 className="Callout-title">{name}</h2>
      <p className="Callout-paragraph">Type: {type}</p>
      <CalloutSection heading="This card awards" items={effects} />
      {chainedStructures.length > 0 &&
        <CalloutSection
          heading="Having this card allows the player to build for free"
          items={chainedStructures}
        />}
    </section>
  );
};

export default TableauCallout;

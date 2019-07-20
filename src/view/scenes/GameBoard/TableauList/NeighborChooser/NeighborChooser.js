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
import './NeighborChooser.css';

const NEIGHBORS = [
  { costType: 'leftCost', text: 'Left neighbor' },
  { costType: 'rightCost', text: 'Right neighbor' },
];

const renderButton = ({ chooseNeighbor }) => ({ costType, text }) => (
  <li key={costType}>
    <button
      className="primary-button"
      type="button"
      onClick={() => chooseNeighbor(costType)}
    >
      {text}
    </button>
  </li>
);

const NeighborChooser = ({ chooseNeighbor }) => (
  <section className="NeighborChooser">
    <h2 className="NeighborChooser-heading">
      Choose a neighbor to trade with:
    </h2>
    <ul className="NeighborChooser-buttonPanel">
      {NEIGHBORS.map(renderButton({ chooseNeighbor }))}
    </ul>
  </section>
);

export default NeighborChooser;

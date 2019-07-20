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
import './Callout.css';
import HandCallout from './HandCallout';
import PlayerCallout from './PlayerCallout';
import TableauCallout from './TableauCallout';
import WonderCallout from './WonderCallout';

const CALLOUTS = {
  HAND: HandCallout,
  PLAYER: PlayerCallout,
  TABLEAU: TableauCallout,
  WONDER: WonderCallout,
};

const Callout = ({ type, data }) => {
  const Component = CALLOUTS[type];
  return (
    <div className="Callout">
      <Component {...data} />
    </div>
  );
};

export default Callout;

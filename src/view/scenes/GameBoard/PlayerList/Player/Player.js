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

import React, { useState } from 'react';
import useCallout from '../../useCallout';
import PlayerTokenContainer from '../PlayerTokenContainer';
import PlayerWonder from '../PlayerWonder';
import './Player.css';

const Player = ({ id, name, money, shields, stages, showPlayerCallout }) => {
  const [showTokens, setShowTokens] = useState(false);
  const listeners = useCallout(() => showPlayerCallout(id));

  return (
    <li
      {...listeners}
      className="Player"
      onClick={() => setShowTokens(!showTokens)}
    >
      <div className="Player-name">{name}</div>
      {!showTokens && <PlayerWonder stages={stages} />}
      {showTokens && <PlayerTokenContainer money={money} shields={shields} />}
    </li>
  );
};

export default Player;

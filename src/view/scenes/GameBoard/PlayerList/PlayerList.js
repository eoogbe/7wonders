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
import { getOtherPlayers } from 'presentation/players';
import './PlayerList.css';
import Player from './Player';

const renderPlayers = (playerActions) => (player) => (
  <Player
    key={player.id}
    {...playerActions}
    {...player}
  />
);

const PlayerList = () => {
  const players = useSelector(getOtherPlayers);

  const dispatch = useDispatch();
  const showPlayerCallout = compose(dispatch, actions.showPlayerCallout);

  return (
    <ol className="PlayerList">
      {players.map(renderPlayers({ showPlayerCallout }))}
    </ol>
  );
};

export default PlayerList;

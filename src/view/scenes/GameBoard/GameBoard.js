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
import { getCallout } from 'model/selectors/app';
import { getIsGameOver } from 'model/selectors/players';
import { getCanShowActionPanel } from 'presentation/actionPanel';
import QuitButton from 'view/components/QuitButton';
import './GameBoard.css';
import ActionPanel from './ActionPanel';
import Callout from './Callout';
import GameOverPanel from './GameOverPanel';
import Hand from './Hand';
import PlayerList from './PlayerList';
import TableauList from './TableauList';
import Wonder from './Wonder';

const GameBoard = () => {
  const isGameOver = useSelector(getIsGameOver);
  const canShowActionPanel = useSelector(getCanShowActionPanel);
  const callout = useSelector(getCallout);

  const quitButtonStyle = {
    position: 'absolute',
    left: 0,
    bottom: 0,
  };

  return (
    <div className="GameBoard">
      <PlayerList />
      <TableauList />
      <Wonder />
      {canShowActionPanel && <ActionPanel />}
      {!isGameOver && <Hand />}
      {!isGameOver && <QuitButton style={quitButtonStyle} />}
      {isGameOver && <GameOverPanel />}
      {callout != null && <Callout {...callout} />}
    </div>
  );
};

export default GameBoard;

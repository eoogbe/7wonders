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
import { getPlayerScores } from 'presentation/players';
import QuitButton from 'view/components/QuitButton';
import * as theme from 'view/theme';
import './ScoreBoard.css';

export const CELL_COLORS = {
  MILITARY: theme.lightRed,
  MONEY: theme.lightYellow,
  WONDER: theme.lightBrown,
  CIVIC: theme.lightBlue,
  SCIENCE: theme.lightGreen,
  TRADE: theme.lightYellow,
  GUILD: theme.lightPurple,
  TOTAL: 'rgb(255, 255, 255)',
};

const getScoreStyle = (type) => ({
  backgroundColor: CELL_COLORS[type],
});

const renderScore = ({ score, type }, idx) => {
  const className =
    type === 'TOTAL' ? 'ScoreBoard-totalCell' : 'ScoreBoard-cell';
  return (
    <td
      key={idx}
      className={className}
      style={getScoreStyle(type)}
    >
      {score}
    </td>
  );
};

const renderPlayerRow = ({ player, scores }) => (
  <tr key={player} className="ScoreBoard-row">
    <th className="ScoreBoard-rowHeader" scope="row">{player}</th>
    {scores.map(renderScore)}
  </tr>
);

const ScoreBoard = () => {
  const { winner, playerScores } = useSelector(getPlayerScores);

  const dispatch = useDispatch();
  const viewGameBoard = compose(dispatch, actions.viewGameBoard);

  const buttonStyle = {
    fontSize: '1.25em',
    width: '8em',
    backgroundColor: theme.primaryColor,
    color: '#FFF',
  };

  return (
    <div className="ScoreBoard">
      <table className="ScoreBoard-scoreTable">
        <caption className="ScoreBoard-caption">
          <b className="keyword">Winner:</b> {winner}
        </caption>
        <thead>
          <tr>
            <th className="ScoreBoard-playerHeader" scope="col">Player</th>
            <th
              className="ScoreBoard-colHeader"
              style={getScoreStyle('MILITARY')}
              scope="col"
            >
              Military
            </th>
            <th
              className="ScoreBoard-colHeader"
              style={getScoreStyle('MONEY')}
              scope="col"
            >
              Money
            </th>
            <th
              className="ScoreBoard-colHeader"
              style={getScoreStyle('WONDER')}
              scope="col"
            >
              Wonder
            </th>
            <th
              className="ScoreBoard-colHeader"
              style={getScoreStyle('CIVIC')}
              scope="col"
            >
              Civic
            </th>
            <th
              className="ScoreBoard-colHeader"
              style={getScoreStyle('SCIENCE')}
              scope="col"
            >
              Science
            </th>
            <th
              className="ScoreBoard-colHeader"
              style={getScoreStyle('TRADE')}
              scope="col"
            >
              Trade
            </th>
            <th
              className="ScoreBoard-colHeader"
              style={getScoreStyle('GUILD')}
              scope="col"
            >
              Guild
            </th>
            <th className="ScoreBoard-totalHeader" scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {playerScores.map(renderPlayerRow)}
        </tbody>
      </table>
      <div className="ScoreBoard-buttonPanel">
        <QuitButton style={buttonStyle} />
        <button
          className="primary-button"
          style={buttonStyle}
          type="button"
          onClick={viewGameBoard}
        >
          Return to game
        </button>
      </div>
    </div>
  );
};

export default ScoreBoard;

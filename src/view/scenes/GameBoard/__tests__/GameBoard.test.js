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
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import PLAYERS from '__fixtures__/players';
import GameBoard from '../GameBoard';

const GAME_OVER_STATE = {
  app: {
    currentPlayer: 'PLAYER1',
    callout: null,
  },
  ages: [
    { rounds: 6, discardedCards: [] },
    { rounds: 6, discardedCards: [] },
    { rounds: 6, discardedCards: [] },
  ],
  players: {
    PLAYER1: {
      id: 'PLAYER1',
      wonder: 'PYRAMIDS_OF_GIZA',
      completedWonderStageCount: 1,
      wonderSide: 'A',
      tableau: ['STOCKADE', 'TAVERN', 'GLASSWORKS'],
      money: 3,
      hand: [],
      structurePayments: [],
      wonderPayments: [],
      wonderAbilities: [],
    },
    PLAYER2: {
      id: 'PLAYER2',
      wonder: 'COLOSSUS_OF_RHODES',
      completedWonderStageCount: 2,
      wonderSide: 'A',
      tableau: ['BATHS', 'CLAY_PIT', 'ALTAR'],
      money: 3,
      hand: [],
    },
    PLAYER3: {
      id: 'PLAYER3',
      wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
      completedWonderStageCount: 3,
      wonderSide: 'A',
      tableau: ['BARRACKS', 'CLAY_POOL'],
      money: 3,
      hand: [],
    },
  },
};

const mockStore = configureStore();

it('renders without crashing', () => {
  const store = mockStore(createState({}));
  const tree =
    renderer.create(
      <Provider store={store}>
        <GameBoard />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders when cannot show action panel', () => {
  const store = mockStore(createState({
    wonderAbilities: ['BUILD_DISCARDED'],
  }));
  const tree =
    renderer.create(
      <Provider store={store}>
        <GameBoard />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders when game over', () => {
  const store = mockStore(GAME_OVER_STATE);
  const tree =
    renderer.create(
      <Provider store={store}>
        <GameBoard />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders with callout', () => {
  const store = mockStore(createState({
    callout: {
      type: 'PLAYER',
      data: {
        playerId: 'PLAYER2',
      },
    },
  }));
  const tree =
    renderer.create(
      <Provider store={store}>
        <GameBoard />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

const createState = ({ callout, ...player }) => ({
  app: {
    currentPlayer: 'PLAYER1',
    callout,
  },
  ages: [{ rounds: 3, discardedCards: ['LOOM', 'APOTHECARY', 'BATHS'] }],
  players: {
    ...PLAYERS,
    PLAYER1: {
      ...PLAYERS.PLAYER1,
      ...player,
    },
  },
});

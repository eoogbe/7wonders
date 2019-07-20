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
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { scoreGame, startAge, viewGameBoard } from 'model/actions';
import War from '../War';

const mockStore = configureStore();

it('renders without crashing', () => {
  const store = mockStore(createState({
    ages: [{ rounds: 6, discardedCards: [] }],
  }));
  const tree =
    renderer.create(
      <Provider store={store}>
        <War />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('starts the next age', () => {
  const store = mockStore(createState({
    ages: [{ rounds: 6, discardedCards: [] }],
  }));
  const tree = mount(
    <Provider store={store}>
      <War />
    </Provider>
  );
  tree.find('button').first().simulate('click');
  expect(store.getActions()).toEqual([startAge()]);
});

it('views the game board', () => {
  const store = mockStore(createState({
    ages: [
      { rounds: 6, discardedCards: [] },
      { rounds: 6, discardedCards: [] },
      { rounds: 6, discardedCards: [] },
    ],
    wonderAbilities: ['COPY_GUILD'],
  }));
  const tree = mount(
    <Provider store={store}>
      <War />
    </Provider>
  );
  tree.find('button').first().simulate('click');
  expect(store.getActions()).toEqual([viewGameBoard()]);
});

it('scores the game', () => {
  const store = mockStore(createState({
    ages: [
      { rounds: 6, discardedCards: [] },
      { rounds: 6, discardedCards: [] },
      { rounds: 6, discardedCards: [] },
    ],
  }));
  const tree = mount(
    <Provider store={store}>
      <War />
    </Provider>
  );
  tree.find('button').first().simulate('click');
  expect(store.getActions()).toEqual([scoreGame()]);
});

const createState = ({ ages, ...player }) => ({
  ages,
  app: { currentPlayer: 'PLAYER1' },
  players: {
    PLAYER1: {
      id: 'PLAYER1',
      wonder: 'PYRAMIDS_OF_GIZA',
      completedWonderStageCount: 1,
      wonderSide: 'A',
      tableau: ['STOCKADE', 'TAVERN', 'GLASSWORKS'],
      wonderAbilities: [],
      ...player,
    },
    PLAYER2: {
      id: 'PLAYER2',
      wonder: 'COLOSSUS_OF_RHODES',
      completedWonderStageCount: 2,
      wonderSide: 'A',
      tableau: ['BATHS', 'CLAY_PIT', 'ALTAR', 'BUILDERS_GUILD'],
    },
    PLAYER3: {
      id: 'PLAYER3',
      wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
      completedWonderStageCount: 3,
      wonderSide: 'A',
      tableau: ['BARRACKS', 'CLAY_POOL', 'CRAFTSMENS_GUILD'],
    },
  },
});

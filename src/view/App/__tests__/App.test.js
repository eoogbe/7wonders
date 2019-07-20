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
import App from '../App';

const mockStore = configureStore();

it('renders without crashing', () => {
  const store = mockStore(createState({ scene: 'GAME_BOARD' }));
  const tree =
    renderer.create(
      <Provider store={store}>
        <App />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the PLAYER_PICKER scene', () => {
  const store = mockStore(createState({ scene: 'PLAYER_PICKER' }));
  const tree =
    renderer.create(
      <Provider store={store}>
        <App />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the WONDER_PANEL scene', () => {
  const store = mockStore(createState({ scene: 'WONDER_PANEL' }));
  const tree =
    renderer.create(
      <Provider store={store}>
        <App />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the WONER_CHOOSER scene', () => {
  const store = mockStore(createState({ scene: 'WONDER_CHOOSER' }));
  const tree =
    renderer.create(
      <Provider store={store}>
        <App />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the WAR scene', () => {
  const store = mockStore(createState({ scene: 'WAR' }));
  const tree =
    renderer.create(
      <Provider store={store}>
        <App />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the AGE scene', () => {
  const store = mockStore(createState({ scene: 'AGE' }));
  const tree =
    renderer.create(
      <Provider store={store}>
        <App />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the SCORE_BOARD scene', () => {
  const store = mockStore(createState({ scene: 'SCORE_BOARD' }));
  const tree =
    renderer.create(
      <Provider store={store}>
        <App />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

const createState = ({ scene }) => ({
  app: {
    scene,
    currentPlayer: 'PLAYER1',
    playerPickerCount: 4,
    wonderChooserPlayer: 'PLAYER1',
  },
  ages: [{ rounds: 6, discardedCards: [] }],
  players: PLAYERS,
});

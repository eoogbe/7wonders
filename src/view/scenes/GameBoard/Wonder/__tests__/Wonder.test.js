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
import PLAYERS from '__fixtures__/players';
import { showWonderCallout } from 'model/actions';
import Wonder from '../Wonder';

jest.useFakeTimers();

const mockStore = configureStore();

it('renders without crashing', () => {
  const store = mockStore(createState({}));
  const tree =
    renderer.create(
      <Provider store={store}>
        <Wonder />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders when can build a free structure', () => {
  const store = mockStore(createState({
    wonder: 'STATUE_OF_ZEUS_IN_OLYMPIA',
    wonderAbilities: ['BUILD_FREE'],
  }));
  const tree =
    renderer.create(
      <Provider store={store}>
        <Wonder />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('shows the wonder callout', () => {
  const store = mockStore(createState({}));
  const tree = mount(
    <Provider store={store}>
      <Wonder />
    </Provider>
  );
  tree.find('.GameBoardWonderStage').first().simulate('mouseEnter');
  expect(store.getActions()).toEqual([showWonderCallout(0)]);
});

const createState = (player) => ({
  app: { currentPlayer: 'PLAYER1' },
  players: {
    ...PLAYERS,
    PLAYER1: {
      ...PLAYERS.PLAYER1,
      ...player,
    },
  },
});

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
import { selectWonder, toggleWonderSide, viewWonderPanel } from 'model/actions';
import WonderChooser from '../WonderChooser';

const mockStore = configureStore();

it('renders without crashing', () => {
  const store = mockStore(createState({
    wonder: 'PYRAMIDS_OF_GIZA',
  }));
  const tree =
    renderer.create(
      <Provider store={store}>
        <WonderChooser />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('selects the wonder', () => {
  const store = mockStore(createState({
    wonder: 'PYRAMIDS_OF_GIZA',
  }));
  const tree = mount(
    <Provider store={store}>
      <WonderChooser />
    </Provider>
  );
  tree.find('.WonderChooser-wonder').first().simulate('click');
  expect(store.getActions()).toEqual([selectWonder('COLOSSUS_OF_RHODES')]);
});

it('toggles the wonder side', () => {
  const store = mockStore(createState({
    wonder: 'PYRAMIDS_OF_GIZA',
  }));
  const tree = mount(
    <Provider store={store}>
      <WonderChooser />
    </Provider>
  );
  tree.find('.WonderChooser-wonderSide').simulate('click');
  expect(store.getActions()).toEqual([toggleWonderSide()]);
});

it('views the wonder panel', () => {
  const store = mockStore(createState({
    wonder: 'PYRAMIDS_OF_GIZA',
  }));
  const tree = mount(
    <Provider store={store}>
      <WonderChooser />
    </Provider>
  );
  tree.find('.WonderChooser-nextButton').simulate('click');
  expect(store.getActions()).toEqual([viewWonderPanel()]);
});

const createState = (player) => ({
  app: {
    currentPlayer: 'PLAYER1',
    wonderChooserPlayer: 'PLAYER1',
  },
  players: {
    ...PLAYERS,
    PLAYER1: {
      ...PLAYERS.PLAYER1,
      ...player,
    },
  },
});

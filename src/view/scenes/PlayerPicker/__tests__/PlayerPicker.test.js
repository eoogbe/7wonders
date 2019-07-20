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
import {
  decrementPlayerPicker, incrementPlayerPicker, pickPlayerCount,
} from 'model/actions';
import PlayerPicker from '../PlayerPicker';

const mockStore = configureStore();

it('renders without crashing', () => {
  const store = mockStore(createState({ playerCount: 4 }));
  const tree =
    renderer.create(
      <Provider store={store}>
        <PlayerPicker />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('when min count renders a disabled left arrow', () => {
  const store = mockStore(createState({ playerCount: 3 }));
  const tree =
    renderer.create(
      <Provider store={store}>
        <PlayerPicker />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('when max count renders a disabled right arrow', () => {
  const store = mockStore(createState({ playerCount: 7 }));
  const tree =
    renderer.create(
      <Provider store={store}>
        <PlayerPicker />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('decrements the player count', () => {
  const store = mockStore(createState({ playerCount: 4 }));
  const tree = mount(
    <Provider store={store}>
      <PlayerPicker />
    </Provider>
  );
  tree.find('.PlayerPicker-arrow').first().simulate('click');
  expect(store.getActions()).toEqual([decrementPlayerPicker()]);
});

it('increments the player count', () => {
  const store = mockStore(createState({ playerCount: 4 }));
  const tree = mount(
    <Provider store={store}>
      <PlayerPicker />
    </Provider>
  );
  tree.find('.PlayerPicker-arrow').last().simulate('click');
  expect(store.getActions()).toEqual([incrementPlayerPicker()]);
});

it('picks the player count', () => {
  const store = mockStore(createState({ playerCount: 4 }));
  const tree = mount(
    <Provider store={store}>
      <PlayerPicker />
    </Provider>
  );
  tree.find('.PlayerPicker-nextButton').simulate('click');
  expect(store.getActions()).toEqual([pickPlayerCount()]);
});

const createState = ({ playerCount }) => ({
  app: { playerPickerCount: playerCount },
});

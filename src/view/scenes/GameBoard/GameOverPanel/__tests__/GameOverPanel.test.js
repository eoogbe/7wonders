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
import { scoreGame } from 'model/actions';
import GameOverPanel from '../GameOverPanel';

const mockStore = configureStore();

it('renders without crashing', () => {
  const store = mockStore({});
  const tree =
    renderer.create(
      <Provider store={store}>
        <GameOverPanel />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('scores the game', () => {
  const store = mockStore({});
  const tree = mount(
    <Provider store={store}>
      <GameOverPanel />
    </Provider>
  );
  tree.find('button').last().simulate('click');
  expect(store.getActions()).toEqual([scoreGame()]);
});

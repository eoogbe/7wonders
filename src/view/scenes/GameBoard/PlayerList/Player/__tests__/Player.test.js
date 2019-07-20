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
import Player from '../Player';

const NAME = 'Pyramids of Giza';

const MONEY = '3 coins';

const SHIELDS = '1 shield';

const STAGES = [
  { effects: ['3 points'], isCompleted: true },
  { effects: ['5 points'], isCompleted: false },
  { effects: ['7 points'], isCompleted: false },
];

jest.useFakeTimers();

const mockStore = configureStore();

it('renders without crashing', () => {
  const store = mockStore({});
  const tree =
    renderer.create(
      <Provider store={store}>
        <Player
          name={NAME}
          money={MONEY}
          shields={SHIELDS}
          stages={STAGES}
        />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('shows the tokens', () => {
  const store = mockStore({});
  const tree = mount(
    <Provider store={store}>
      <Player
        name={NAME}
        money={MONEY}
        shields={SHIELDS}
        stages={STAGES}
      />
    </Provider>
  );
  tree.simulate('click');
  expect(tree.find('PlayerTokenContainer').exists()).toBe(true);
});

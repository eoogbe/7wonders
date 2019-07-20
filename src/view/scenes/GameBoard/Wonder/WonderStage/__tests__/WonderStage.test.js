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
import WonderStage from '../WonderStage';

const EFFECTS = ['3 points'];

const COST = ['Stone', 'Stone'];

const PAYMENT = 0;

jest.useFakeTimers();

const mockStore = configureStore();

it('renders without crashing', () => {
  const store = mockStore({});
  const tree =
    renderer.create(
      <Provider store={store}>
        <WonderStage
          effects={EFFECTS}
          cost={COST}
          payment={PAYMENT}
          isCompleted={false}
          isNext={true}
        />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders when cannot afford payment', () => {
  const store = mockStore({});
  const tree =
    renderer.create(
      <Provider store={store}>
        <WonderStage
          effects={EFFECTS}
          cost={COST}
          payment={null}
          isCompleted={false}
          isNext={true}
        />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders with coin payment', () => {
  const store = mockStore({});
  const tree =
    renderer.create(
      <Provider store={store}>
        <WonderStage
          effects={EFFECTS}
          cost={COST}
          payment={2}
          isCompleted={false}
          isNext={true}
        />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders when completed', () => {
  const store = mockStore({});
  const tree =
    renderer.create(
      <Provider store={store}>
        <WonderStage
          effects={EFFECTS}
          cost={COST}
          payment={PAYMENT}
          isCompleted={true}
          isNext={false}
        />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders when neither completed nor next', () => {
  const store = mockStore({});
  const tree =
    renderer.create(
      <Provider store={store}>
        <WonderStage
          effects={EFFECTS}
          cost={COST}
          payment={PAYMENT}
          isCompleted={false}
          isNext={false}
        />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

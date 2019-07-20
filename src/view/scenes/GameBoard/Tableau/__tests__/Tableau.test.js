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
import Tableau from '../Tableau';

const RESOURCE_CARDS = [
  {
    id: 'PYRAMIDS_OF_GIZA_INITIAL',
    type: 'RAW_MATERIAL',
    effects: ['Stone'],
  },
];

const NON_RESOURCE_CARDS = [
  {
    id: 'STOCKADE',
    type: 'MILITARY',
    effects: ['1 shield'],
  },
  {
    id: 'TAVERN',
    type: 'TRADE',
    effects: ['5 coins'],
  },
];

jest.useFakeTimers();

const mockStore = configureStore();

it('renders without crashing', () => {
  const store = mockStore({});
  const tree =
    renderer.create(
      <Provider store={store}>
        <Tableau
          resourceCards={RESOURCE_CARDS}
          nonResourceCards={NON_RESOURCE_CARDS}
        />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders with only resource cards', () => {
  const store = mockStore({});
  const tree =
    renderer.create(
      <Provider store={store}>
        <Tableau
          resourceCards={RESOURCE_CARDS}
          nonResourceCards={[]}
        />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('shows the tableau callout', () => {
  const showTableauCallout = jest.fn();
  const store = mockStore({});
  const tree = mount(
    <Provider store={store}>
      <Tableau
        resourceCards={RESOURCE_CARDS}
        nonResourceCards={NON_RESOURCE_CARDS}
        showTableauCallout={showTableauCallout}
      />
    </Provider>
  );
  tree.find('.TableauCard').first().simulate('mouseEnter');
  expect(showTableauCallout).toHaveBeenCalledWith('PYRAMIDS_OF_GIZA_INITIAL');
});

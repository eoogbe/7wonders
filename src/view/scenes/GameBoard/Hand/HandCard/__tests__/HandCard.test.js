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
import HandCard from '../HandCard';

const ID = 'LUMBER_YARD';

const INDEX = 0;

const NAME = 'Lumber yard';

const TYPE = 'RAW_MATERIAL';

const EFFECTS = ['Wood'];

const COST = [];

const PAYMENT = 0;

jest.useFakeTimers();

const mockStore = configureStore();

it('renders without crashing', () => {
  const store = mockStore({});
  const tree =
    renderer.create(
      <Provider store={store}>
        <HandCard
          id={ID}
          index={INDEX}
          name={NAME}
          type={TYPE}
          effects={EFFECTS}
          cost={COST}
          payment={PAYMENT}
          isSelected={false}
        />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders with cost', () => {
  const store = mockStore({});
  const tree =
    renderer.create(
      <Provider store={store}>
        <HandCard
          id={ID}
          index={INDEX}
          name={'Baths'}
          type={'CIVIC'}
          effects={['3 points']}
          cost={['Stone']}
          payment={PAYMENT}
          isSelected={false}
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
        <HandCard
          id={ID}
          index={INDEX}
          name={'Baths'}
          type={'CIVIC'}
          effects={['3 points']}
          cost={['Stone']}
          payment={null}
          isSelected={false}
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
        <HandCard
          id={ID}
          index={INDEX}
          name={'Baths'}
          type={'CIVIC'}
          effects={['3 points']}
          cost={['Stone']}
          payment={2}
          isSelected={false}
        />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders when selected', () => {
  const store = mockStore({});
  const tree =
    renderer.create(
      <Provider store={store}>
        <HandCard
          id={ID}
          index={INDEX}
          name={NAME}
          type={TYPE}
          effects={EFFECTS}
          cost={COST}
          payment={PAYMENT}
          isSelected={true}
        />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('gets selected', () => {
  const select = jest.fn();
  const store = mockStore({});
  const tree = mount(
    <Provider store={store}>
      <HandCard
        id={ID}
        index={INDEX}
        name={NAME}
        type={TYPE}
        effects={EFFECTS}
        cost={COST}
        payment={PAYMENT}
        isSelected={false}
        select={select}
        />
      </Provider>
  );
  tree.simulate('click');
  expect(select).toHaveBeenCalledWith(ID, INDEX);
});

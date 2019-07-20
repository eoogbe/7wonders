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
import { hideCallout } from 'model/actions';
import useCallout from '../useCallout';

jest.useFakeTimers();

const mockStore = configureStore();

const TestComponent = ({ showCallout }) => {
  const listeners = useCallout(showCallout);
  return <div {...listeners} />;
};

it('renders without crashing', () => {
  const store = mockStore({});
  const tree =
    renderer.create(
      <Provider store={store}>
        <TestComponent />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('shows the callout on mouse enter', () => {
  const showCallout = jest.fn();
  const store = mockStore({});
  const tree = mount(
    <Provider store={store}>
      <TestComponent showCallout={showCallout} />
    </Provider>
  );
  tree.find('div').simulate('mouseEnter');
  expect(showCallout).toHaveBeenCalled();
});

it('hides the callout on mouse leave', () => {
  const store = mockStore({});
  const tree = mount(
    <Provider store={store}>
      <TestComponent />
    </Provider>
  );
  tree.find('div').simulate('mouseLeave');
  expect(store.getActions()).toEqual([hideCallout()]);
});

it('shows the callout on long press', () => {
  const showCallout = jest.fn();
  const store = mockStore({});
  const tree = mount(
    <Provider store={store}>
      <TestComponent showCallout={showCallout} />
    </Provider>
  );

  tree.find('div').simulate('touchStart');
  jest.runAllTimers();

  expect(showCallout).toHaveBeenCalled();
});

it('does not show the callout on short press', () => {
  const showCallout = jest.fn();
  const store = mockStore({});
  const tree = mount(
    <Provider store={store}>
      <TestComponent showCallout={showCallout} />
    </Provider>
  );
  tree.find('div').simulate('touchStart');
  expect(showCallout).not.toHaveBeenCalled();
});

it('hides the callout on touch end', () => {
  const store = mockStore({});
  const tree = mount(
    <Provider store={store}>
      <TestComponent />
    </Provider>
  );
  tree.find('div').simulate('touchEnd');
  expect(store.getActions()).toEqual([hideCallout()]);
});

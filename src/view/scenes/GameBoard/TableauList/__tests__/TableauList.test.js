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
import { chooseNeighbor, showTableauCallout } from 'model/actions';
import TableauList from '../TableauList';

const MULTIPLE_PAYMENTS = [
  {
    payment: [{ playerId: 'PLAYER2', alternatives: ['Clay'] }],
    leftCost: 2,
    rightCost: 0,
  },
  {
    payment: [{ playerId: 'PLAYER3', alternatives: ['Clay'] }],
    leftCost: 0,
    rightCost: 2,
  },
];

jest.useFakeTimers();

const mockStore = configureStore();

it('renders without crashing', () => {
  const store = mockStore(createState({ structurePayments: [] }));
  const tree =
    renderer.create(
      <Provider store={store}>
        <TableauList />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders with trade choice', () => {
  const store = mockStore(createState({
    structurePayments: MULTIPLE_PAYMENTS,
  }));
  const tree =
    renderer.create(
      <Provider store={store}>
        <TableauList />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('chooses a neighbor', () => {
  const store = mockStore(createState({
    structurePayments: MULTIPLE_PAYMENTS,
  }));
  const tree = mount(
    <Provider store={store}>
      <TableauList />
    </Provider>
  );
  tree.find('.NeighborChooser button').first().simulate('click');
  expect(store.getActions()).toEqual([chooseNeighbor('leftCost')]);
});

it('shows the tableau callout', () => {
  const store = mockStore(createState({ structurePayments: [] }));
  const tree = mount(
    <Provider store={store}>
      <TableauList />
    </Provider>
  );
  tree.find('.TableauCard').first().simulate('mouseEnter');
  expect(store.getActions()).toEqual([
    showTableauCallout('TEMPLE_OF_ARTEMIS_IN_EPHESUS_INITIAL'),
  ]);
});

const createState = ({ structurePayments }) => ({
  app: { currentPlayer: 'PLAYER1' },
  players: {
    ...PLAYERS,
    PLAYER1: {
      ...PLAYERS.PLAYER1,
      structurePayments,
    },
  },
});

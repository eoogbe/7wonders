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
  buildStructure, copyGuild, selectHandCard, showHandCallout,
} from 'model/actions';
import Hand from '../Hand';

jest.useFakeTimers();

const mockStore = configureStore();

it('renders without crashing', () => {
  const store = mockStore(createState({ selectedCardIdx: 0 }));
  const tree =
    renderer.create(
      <Provider store={store}>
        <Hand />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders without cards', () => {
  const store = mockStore(createState({
    selectedCardIdx: null,
    hand: [],
  }));
  const tree =
    renderer.create(
      <Provider store={store}>
        <Hand />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders when can build discarded structure', () => {
  const store = mockStore(createState({
    selectedCardIdx: null,
    wonderAbilities: ['BUILD_DISCARDED'],
  }));
  const tree =
    renderer.create(
      <Provider store={store}>
        <Hand />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders when copying a guild card', () => {
  const store = mockStore(createState({
    selectedCardIdx: 0,
    wonderAbilities: ['COPY_GUILD'],
  }));
});

it('selects a card', () => {
  const store = mockStore(createState({ selectedCardIdx: 1 }));
  const tree = mount(
    <Provider store={store}>
      <Hand />
    </Provider>
  );
  tree.find('.HandCard').first().simulate('click');
  expect(store.getActions()).toEqual([selectHandCard('EAST_TRADING_POST', 0)]);
});

it('builds a discarded structure', () => {
  const store = mockStore(createState({
    selectedCardIdx: null,
    wonderAbilities: ['BUILD_DISCARDED'],
  }));
  const tree = mount(
    <Provider store={store}>
      <Hand />
    </Provider>
  );
  tree.find('.HandCard').first().simulate('click');
  expect(store.getActions()).toEqual([buildStructure('LOOM')]);
});

it('copies a guild card', () => {
  const store = mockStore(createState({
    selectedCardIdx: 0,
    wonderAbilities: ['COPY_GUILD'],
  }));
  const tree = mount(
    <Provider store={store}>
      <Hand />
    </Provider>
  );
  tree.find('.HandCard').first().simulate('click');
  expect(store.getActions()).toEqual([copyGuild('CRAFTSMENS_GUILD')]);
});

it('shows the hand callout', () => {
  const store = mockStore(createState({ selectedCardIdx: 1 }));
  const tree = mount(
    <Provider store={store}>
      <Hand />
    </Provider>
  );
  tree.find('.HandCard').first().simulate('mouseEnter');
  expect(store.getActions()).toEqual([showHandCallout('EAST_TRADING_POST')]);
});

const createState = ({ selectedCardIdx, ...player }) => ({
  app: {
    currentPlayer: 'PLAYER1',
    selectedCardIdx,
  },
  ages: [
    { rounds: 6, discardedCards: [] },
    { rounds: 6, discardedCards: [] },
    { rounds: 6, discardedCards: ['LOOM', 'APOTHECARY', 'BATHS'] },
  ],
  players: {
    PLAYER1: {
      id: 'PLAYER1',
      wonder: 'PYRAMIDS_OF_GIZA',
      wonderSide: 'A',
      completedWonderStageCount: 1,
      hand: ['EAST_TRADING_POST', 'GLASSWORKS', 'MINE'],
      tableau: ['STOCKADE', 'TAVERN', 'GLASSWORKS'],
      money: 3,
      wonderAbilities: [],
      ...player,
    },
    PLAYER2: {
      id: 'PLAYER2',
      wonder: 'COLOSSUS_OF_RHODES',
      tableau: ['CLAY_PIT', 'BUILDERS_GUILD'],
    },
    PLAYER3: {
      id: 'PLAYER3',
      wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
      tableau: ['CRAFTSMENS_GUILD', 'WORKSHOP'],
    },
  },
})

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
import {
  addMoney, buildFreeStructure, buildStructure, buildWonder,
} from 'model/actions';
import ActionPanel from '../ActionPanel';

const mockStore = configureStore();

it('renders without crashing', () => {
  const store = mockStore(createState({
    app: {
      currentPlayer: 'PLAYER1',
      selectedCardId: null,
      selectedCardIdx: null,
    },
  }));
  const tree =
    renderer.create(
      <Provider store={store}>
        <ActionPanel />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders when can build structure', () => {
  const store = mockStore(createState({
    app: {
      currentPlayer: 'PLAYER1',
      selectedCardId: 'EAST_TRADING_POST',
      selectedCardIdx: 0,
    },
    money: 3,
  }));
  const tree =
    renderer.create(
      <Provider store={store}>
        <ActionPanel />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders when can build wonder', () => {
  const store = mockStore(createState({
    app: {
      currentPlayer: 'PLAYER1',
      selectedCardId: 'APOTHECARY',
      selectedCardIdx: 1,
    },
    completedWonderStageCount: 0,
    tableau: ['STONE_PIT'],
  }));
  const tree =
    renderer.create(
      <Provider store={store}>
        <ActionPanel />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders when can add money', () => {
  const store = mockStore(createState({
    app: {
      currentPlayer: 'PLAYER1',
      selectedCardId: 'APOTHECARY',
      selectedCardIdx: 1,
    },
  }));
  const tree =
    renderer.create(
      <Provider store={store}>
        <ActionPanel />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders when building structure that costs for free', () => {
  const store = mockStore(createState({
    app: {
      currentPlayer: 'PLAYER1',
      selectedCardId: 'FOREST_CAVE',
      selectedCardIdx: 1,
    },
    hand: ['EAST_TRADING_POST', 'FOREST_CAVE', 'MINE'],
    wonderAbilities: ['BUILD_FREE'],
  }));
  const tree =
    renderer.create(
      <Provider store={store}>
        <ActionPanel />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders when building unaffordable structure for free', () => {
  const store = mockStore(createState({
    app: {
      currentPlayer: 'PLAYER1',
      selectedCardId: 'APOTHECARY',
      selectedCardIdx: 1,
    },
    wonderAbilities: ['BUILD_FREE'],
  }));
  const tree =
    renderer.create(
      <Provider store={store}>
        <ActionPanel />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('when cannot build for free', () => {
  it('builds a structure', () => {
    const store = mockStore(createState({
      app: {
        currentPlayer: 'PLAYER1',
        selectedCardId: 'EAST_TRADING_POST',
        selectedCardIdx: 0,
      },
      money: 3,
    }));
    const tree = mount(
      <Provider store={store}>
        <ActionPanel />
      </Provider>
    );
    tree.find('button').first().simulate('click');
    expect(store.getActions()).toEqual([buildStructure()]);
  });
  it('builds the wonder', () => {
    const store = mockStore(createState({
      app: {
        currentPlayer: 'PLAYER1',
        selectedCardId: 'APOTHECARY',
        selectedCardIdx: 1,
      },
      completedWonderStageCount: 0,
      tableau: ['STONE_PIT'],
    }));
    const tree = mount(
      <Provider store={store}>
        <ActionPanel />
      </Provider>
    );
    tree.find('button').at(1).simulate('click');
    expect(store.getActions()).toEqual([buildWonder()]);
  });
  it('adds money', () => {
    const store = mockStore(createState({
      app: {
        currentPlayer: 'PLAYER1',
        selectedCardId: 'APOTHECARY',
        selectedCardIdx: 1,
      },
    }));
    const tree = mount(
      <Provider store={store}>
        <ActionPanel />
      </Provider>
    );
    tree.find('button').at(2).simulate('click');
    expect(store.getActions()).toEqual([addMoney()]);
  });
});

describe('when can build structure that costs for free', () => {
  it('builds the structure for free', () => {
    const store = mockStore(createState({
      app: {
        currentPlayer: 'PLAYER1',
        selectedCardId: 'FOREST_CAVE',
        selectedCardIdx: 1,
      },
      wonderAbilities: ['BUILD_FREE'],
    }));
    const tree = mount(
      <Provider store={store}>
        <ActionPanel />
      </Provider>
    );
    tree.find('button').first().simulate('click');
    expect(store.getActions()).toEqual([buildFreeStructure()]);
  });
  it('builds the structure for the cost', () => {
    const store = mockStore(createState({
      app: {
        currentPlayer: 'PLAYER1',
        selectedCardId: 'FOREST_CAVE',
        selectedCardIdx: 1,
      },
      wonderAbilities: ['BUILD_FREE'],
    }));
    const tree = mount(
      <Provider store={store}>
        <ActionPanel />
      </Provider>
    );
    tree.find('button').at(1).simulate('click');
    expect(store.getActions()).toEqual([buildStructure()]);
  });
  it('builds the wonder', () => {
    const store = mockStore(createState({
      app: {
        currentPlayer: 'PLAYER1',
        selectedCardId: 'FOREST_CAVE',
        selectedCardIdx: 1,
      },
      completedWonderStageCount: 0,
      tableau: ['STONE_PIT'],
      wonderAbilities: ['BUILD_FREE'],
    }));
    const tree = mount(
      <Provider store={store}>
        <ActionPanel />
      </Provider>
    );
    tree.find('button').at(2).simulate('click');
    expect(store.getActions()).toEqual([buildWonder()]);
  });
  it('adds money', () => {
    const store = mockStore(createState({
      app: {
        currentPlayer: 'PLAYER1',
        selectedCardId: 'FOREST_CAVE',
        selectedCardIdx: 1,
      },
      wonderAbilities: ['BUILD_FREE'],
    }));
    const tree = mount(
      <Provider store={store}>
        <ActionPanel />
      </Provider>
    );
    tree.find('button').at(3).simulate('click');
    expect(store.getActions()).toEqual([addMoney()]);
  });
});

describe('when can build unaffordable structure for free', () => {
  it('builds the structure for free', () => {
    const store = mockStore(createState({
      app: {
        currentPlayer: 'PLAYER1',
        selectedCardId: 'APOTHECARY',
        selectedCardIdx: 1,
      },
      wonderAbilities: ['BUILD_FREE'],
    }));
    const tree = mount(
      <Provider store={store}>
        <ActionPanel />
      </Provider>
    );
    tree.find('button').first().simulate('click');
    expect(store.getActions()).toEqual([buildFreeStructure()]);
  });
  it('builds the wonder', () => {
    const store = mockStore(createState({
      app: {
        currentPlayer: 'PLAYER1',
        selectedCardId: 'APOTHECARY',
        selectedCardIdx: 1,
      },
      completedWonderStageCount: 0,
      tableau: ['STONE_PIT'],
      wonderAbilities: ['BUILD_FREE'],
    }));
    const tree = mount(
      <Provider store={store}>
        <ActionPanel />
      </Provider>
    );
    tree.find('button').at(1).simulate('click');
    expect(store.getActions()).toEqual([buildWonder()]);
  });
  it('adds money', () => {
    const store = mockStore(createState({
      app: {
        currentPlayer: 'PLAYER1',
        selectedCardId: 'APOTHECARY',
        selectedCardIdx: 1,
      },
      wonderAbilities: ['BUILD_FREE'],
    }));
    const tree = mount(
      <Provider store={store}>
        <ActionPanel />
      </Provider>
    );
    tree.find('button').at(2).simulate('click');
    expect(store.getActions()).toEqual([addMoney()]);
  });
});

const createState = ({ app, ...player }) => ({
  app,
  players: {
    ...PLAYERS,
    PLAYER1: {
      ...PLAYERS.PLAYER1,
      ...player,
    },
  },
});

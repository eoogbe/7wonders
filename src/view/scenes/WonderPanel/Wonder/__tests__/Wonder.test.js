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
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Wonder from '../Wonder';

const NAME = 'Pyramids of Giza (A)';

const PLAYER_ID = 'PLAYER1';

it('renders without crashing', () => {
  const tree =
    renderer.create(
      <Wonder name={NAME} playerId={PLAYER_ID} isCurrentPlayer={false} />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the current player', () => {
  const tree =
    renderer.create(
      <Wonder name={NAME} playerId={PLAYER_ID} isCurrentPlayer={true} />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('view the wonder chooser', () => {
  const viewWonderChooser = jest.fn();
  const tree = shallow(
    <Wonder
      name={NAME}
      playerId={PLAYER_ID}
      isCurrentPlayer={false}
      viewWonderChooser={viewWonderChooser}
    />
  );
  tree.find('.WonderPanelWonder-name').simulate('click');
  expect(viewWonderChooser).toHaveBeenCalledWith(PLAYER_ID);
});

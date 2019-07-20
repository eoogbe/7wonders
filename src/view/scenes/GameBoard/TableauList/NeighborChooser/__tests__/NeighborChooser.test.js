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
import NeighborChooser from '../NeighborChooser';

it('renders without crashing', () => {
  const tree = renderer.create(<NeighborChooser />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('chooses the left neighbor', () => {
  const chooseNeighbor = jest.fn();
  const tree = shallow(<NeighborChooser chooseNeighbor={chooseNeighbor} />);
  tree.find('button').first().simulate('click');
  expect(chooseNeighbor).toHaveBeenCalledWith('leftCost');
});

it('chooses the right neighbor', () => {
  const chooseNeighbor = jest.fn();
  const tree = shallow(<NeighborChooser chooseNeighbor={chooseNeighbor} />);
  tree.find('button').last().simulate('click');
  expect(chooseNeighbor).toHaveBeenCalledWith('rightCost');
});

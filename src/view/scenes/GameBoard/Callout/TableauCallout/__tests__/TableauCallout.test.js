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
import renderer from 'react-test-renderer';
import TableauCallout from '../TableauCallout';

it('renders without crashing', () => {
  const tree =
    renderer.create(<TableauCallout cardId={'LUMBER_YARD'} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders with chained structures', () => {
  const tree =
    renderer.create(<TableauCallout cardId={'APOTHECARY'} />).toJSON();
  expect(tree).toMatchSnapshot();
});

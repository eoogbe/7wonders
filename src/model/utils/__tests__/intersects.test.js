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

import intersects from '../intersects';

it('when the second array contains a value in the first array intersects', () => {
  expect(intersects([0, 1, 2])([2, 3, 4, 5])).toBe(true);
});

it('when the second array does not contain a value in the first array does not intersect', () => {
  expect(intersects([0, 1, 2])([3, 4, 5])).toBe(false);
});

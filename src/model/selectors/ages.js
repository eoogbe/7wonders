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

import { equals, prop } from 'ramda';
import { createSelector } from 'reselect';

export const getAges = prop('ages');

export const getCurrentAgeIndex = createSelector(
  [getAges],
  (ages) => ages.length - 1
);

export const getCurrentAge = createSelector(
  [getCurrentAgeIndex, getAges],
  prop
);

export const getCurrentRounds = createSelector(
  [getCurrentAge],
  prop('rounds')
);

export const getIsLastAge = createSelector(
  [getCurrentAgeIndex],
  equals(2)
);

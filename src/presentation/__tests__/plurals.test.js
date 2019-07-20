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

import { pluralizeCoins, pluralizePoints, pluralizeShields } from '../plurals';

describe('pluralizeCoins', () => {
  it('when 1 returns singularized', () => {
    expect(pluralizeCoins(1)).toBe('1 coin');
  });
  it('when multiple returns pluralized', () => {
    expect(pluralizeCoins(2)).toBe('2 coins');
  });
});

describe('pluralizePoints', () => {
  it('when 1 returns singularized', () => {
    expect(pluralizePoints(1)).toBe('1 point');
  });
  it('when multiple returns pluralized', () => {
    expect(pluralizePoints(2)).toBe('2 points');
  });
});

describe('pluralizeShields', () => {
  it('when 1 returns singularized', () => {
    expect(pluralizeShields(1)).toBe('1 shield');
  });
  it('when multiple returns pluralized', () => {
    expect(pluralizeShields(2)).toBe('2 shields');
  });
});

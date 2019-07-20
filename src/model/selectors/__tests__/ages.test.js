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

import {
  getCurrentAgeIndex, getCurrentAge, getCurrentRounds, getIsLastAge,
} from '../ages';

describe('getCurrentAgeIndex', () => {
  it('selects the index of the current age of the game', () => {
    const state = {
      ages: [{ rounds: 0, discardedCards: [] }],
    };
    expect(getCurrentAgeIndex(state)).toBe(0);
  })
});

describe('getCurrentAge', () => {
  it('selects the current age of the game', () => {
    const state = {
      ages: [{ rounds: 0, discardedCards: [] }],
    };
    expect(getCurrentAge(state)).toEqual({ rounds: 0, discardedCards: [] });
  });
});

describe('getCurrentRounds', () => {
  it('selects the number of rounds in the current age of the game', () => {
    const state = {
      ages: [{ rounds: 1, discardedCards: [] }],
    };
    expect(getCurrentRounds(state)).toBe(1);
  });
});

describe('getIsLastAge', () => {
  it('when age index less than 3rd age selects false', () => {
    const state = {
      ages: [{ rounds: 0, discardedCards: [] }],
    };
    expect(getIsLastAge(state)).toBe(false);
  });
  it('when age index is 3rd age selects true', () => {
    const state = {
      ages: [
        { rounds: 6, discardedCards: [] },
        { rounds: 6, discardedCards: [] },
        { rounds: 0, discardedCards: [] },
      ],
    };
    expect(getIsLastAge(state)).toBe(true);
  });
});

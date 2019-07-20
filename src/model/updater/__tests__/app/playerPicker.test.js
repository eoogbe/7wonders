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

import { decrementPlayerPicker, incrementPlayerPicker } from 'model/actions';
import updater from '../../app';

describe('decrementPlayerPicker', () => {
  it('decrements the player picker count', () => {
    const initialState = {
      app: { playerPickerCount: 4 },
      players: {},
    };
    const next = updater(decrementPlayerPicker())(initialState);
    expect(next.app).toEqual({ playerPickerCount: 3 });
  });
  describe('when min player picker count', () => {
    it('does not decrement the player picker count', () => {
      const initialState = {
        app: { playerPickerCount: 3 },
        players: {},
      };
      const next = updater(decrementPlayerPicker())(initialState);
      expect(next.app).toEqual({ playerPickerCount: 3 });
    });
  });
});

describe('incrementPlayerPicker', () => {
  it('increments the player picker count', () => {
    const initialState = {
      app: { playerPickerCount: 4 },
      players: {},
    };
    const next = updater(incrementPlayerPicker())(initialState);
    expect(next.app).toEqual({ playerPickerCount: 5 });
  });
  describe('when max player picker count', () => {
    it('does not increment the player picker count', () => {
      const initialState = {
        app: { playerPickerCount: 7 },
        players: {},
      };
      const next = updater(incrementPlayerPicker())(initialState);
      expect(next.app).toEqual({ playerPickerCount: 7 });
    });
  });
});

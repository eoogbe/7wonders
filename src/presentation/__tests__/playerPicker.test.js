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

import { getPlayerPicker } from '../playerPicker';

describe('getPlayerPicker', () => {
  it('selects the player picker app state', () => {
    const state = createState({ playerCount: 4 });
    expect(getPlayerPicker(state)).toEqual({
      playerCount: 4,
      leftArrowEnabled: true,
      rightArrowEnabled: true,
    });
  });
  describe('when min count', () => {
    it('disables the left arrow', () => {
      const state = createState({ playerCount: 3 });
      expect(getPlayerPicker(state)).toEqual({
        playerCount: 3,
        leftArrowEnabled: false,
        rightArrowEnabled: true,
      });
    });
  });
  describe('when max count', () => {
    it('disables the right arrow', () => {
      const state = createState({ playerCount: 7 });
      expect(getPlayerPicker(state)).toEqual({
        playerCount: 7,
        leftArrowEnabled: true,
        rightArrowEnabled: false,
      });
    });
  });
});

const createState = ({ playerCount }) => ({
  app: { playerPickerCount: playerCount },
});

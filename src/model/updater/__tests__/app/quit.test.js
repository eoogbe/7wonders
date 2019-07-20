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

import { BUILD_STRUCTURE, quit } from 'model/actions';
import updater, { initialAppState } from '../../app';

describe('quit', () => {
  it('resets the app state', () => {
    const initialState = {
      app: {
        currentPlayer: null,
        selectedCardId: 'PAWNSHOP',
        selectedCardIdx: 0,
        lastHandAction: BUILD_STRUCTURE,
        scene: 'GAME_BOARD',
        playerPickerCount: 4,
        wonderChooserPlayer: 'PLAYER1',
      },
    };
    const next = updater(quit())(initialState);
    expect(next.app).toEqual(initialAppState);
  });
});

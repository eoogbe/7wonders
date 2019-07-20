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

import { TestScheduler } from 'rxjs/testing';
import { startAge, viewGameBoard } from 'model/actions';
import epic from '../app';

const EMPTY_HAND_STATE = {
  app: { scene: 'AGE' },
  players: {
    PLAYER1: {
      id: 'PLAYER1',
      hand: [],
    },
    PLAYER2: {
      id: 'PLAYER2',
      hand: [],
    },
    PLAYER3: {
      id: 'PLAYER3',
      hand: [],
    },
  },
};

const FULL_HAND_STATE = {
  app: { scene: 'AGE' },
  players: {
    PLAYER1: {
      id: 'PLAYER1',
      hand: [
        'ALTAR', 'APOTHECARY', 'BARRACKS', 'BATHS', 'CLAY_PIT', 'CLAY_POOL',
        'EAST_TRADING_POST',
      ],
    },
    PLAYER2: {
      id: 'PLAYER2',
      hand: [
        'TIMBER_YARD', 'WEST_TRADING_POST', 'GLASSWORKS', 'GUARD_TOWER', 'LOOM',
        'LUMBER_YARD', 'MARKETPLACE',
      ],
    },
    PLAYER3: {
      id: 'PLAYER3',
      hand: [
        'WORKSHOP', 'ORE_VEIN', 'PRESS', 'SCRIPTORIUM', 'STOCKADE', 'STONE_PIT',
        'THEATRE',
      ],
    },
  },
};

it('delays the load for at least a minute', () => {
  const scheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });
  scheduler.run(({ hot, cold, expectObservable }) => {
    const action$ = hot('-a 2s -b', {
      a: startAge(),
      b: startAge(),
    });
    const state$ = cold('a-b 2s a-b', {
      a: EMPTY_HAND_STATE,
      b: FULL_HAND_STATE,
    });

    const result$ = epic(action$, state$);

    expectObservable(result$).toBe('1s --a 2s --a', {
      a: viewGameBoard(),
    });
  });
});

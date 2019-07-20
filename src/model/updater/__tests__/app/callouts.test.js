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
  hideCallout, showHandCallout, showPlayerCallout, showTableauCallout,
  showWonderCallout,
} from 'model/actions';
import updater from '../../app';

describe('showHandCallout', () => {
  it('sets the callout for a hand card', () => {
    const initialState = {
      app: { callout: null },
    };
    const next = updater(showHandCallout('BATHS'))(initialState);
    expect(next.app).toEqual({
      callout: {
        type: 'HAND',
        data: {
          cardId: 'BATHS',
        },
      },
    });
  });
});

describe('showPlayerCallout', () => {
  it('sets the callout for a player', () => {
    const initialState = {
      app: { callout: null },
    };
    const next = updater(showPlayerCallout('PLAYER1'))(initialState);
    expect(next.app).toEqual({
      callout: {
        type: 'PLAYER',
        data: {
          playerId: 'PLAYER1',
        },
      },
    });
  });
});

describe('showTableauCallout', () => {
  it('sets the callout for a tableau card', () => {
    const initialState = {
      app: { callout: null },
    };
    const next = updater(showTableauCallout('BATHS'))(initialState);
    expect(next.app).toEqual({
      callout: {
        type: 'TABLEAU',
        data: {
          cardId: 'BATHS',
        },
      },
    });
  });
});

describe('showWonderCallout', () => {
  it('sets the callout for a wonder stage', () => {
    const initialState = {
      app: { callout: null },
    };
    const next = updater(showWonderCallout(1))(initialState);
    expect(next.app).toEqual({
      callout: {
        type: 'WONDER',
        data: {
          stageIdx: 1,
        },
      },
    });
  });
});

describe('hideCallout', () => {
  it('unsets the callout', () => {
    const initialState = {
      app: {
        callout: {
          type: 'PLAYER',
          data: { playerId: 'PLAYER1' }
        },
      },
    };
    const next = updater(hideCallout())(initialState);
    expect(next.app).toEqual({ callout: null });
  });
});

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

import { selectWonder, toggleWonderSide } from 'model/actions';
import updater from '../wonder';

describe('updater', () => {
  describe('selectWonder', () => {
    it('sets the wonder of the chosen player', () => {
      const initialState = {
        app: {
          currentPlayer: 'PLAYER1',
          wonderChooserPlayer: 'PLAYER1',
        },
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            wonder: 'PYRAMIDS_OF_GIZA',
          },
          PLAYER2: {
            id: 'PLAYER2',
            wonder: 'COLOSSUS_OF_RHODES',
          },
          PLAYER3: {
            id: 'PLAYER3',
            wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
          },
        },
      };
      const wonder = 'HANGING_GARDEN_OF_BABYLON';
      const next = updater(selectWonder(wonder))(initialState);
      expect(next.players).toEqual({
        PLAYER1: {
          id: 'PLAYER1',
          wonder,
        },
        PLAYER2: {
          id: 'PLAYER2',
          wonder: 'COLOSSUS_OF_RHODES',
        },
        PLAYER3: {
          id: 'PLAYER3',
          wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
        },
      });
    });
    describe('when chosen player is not current player', () => {
      it('sets the wonder of the chosen player', () => {
        const initialState = {
          app: {
            currentPlayer: 'PLAYER1',
            wonderChooserPlayer: 'PLAYER2',
          },
          players: {
            PLAYER1: {
              id: 'PLAYER1',
              wonder: 'PYRAMIDS_OF_GIZA',
            },
            PLAYER2: {
              id: 'PLAYER2',
              wonder: 'COLOSSUS_OF_RHODES',
            },
            PLAYER3: {
              id: 'PLAYER3',
              wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
            },
          },
        };
        const wonder = 'HANGING_GARDEN_OF_BABYLON';
        const next = updater(selectWonder(wonder))(initialState);
        expect(next.players).toEqual({
          PLAYER1: {
            id: 'PLAYER1',
            wonder: 'PYRAMIDS_OF_GIZA',
          },
          PLAYER2: {
            id: 'PLAYER2',
            wonder,
          },
          PLAYER3: {
            id: 'PLAYER3',
            wonder: 'TEMPLE_OF_ARTEMIS_IN_EPHESUS',
          },
        });
      });
    });
  });
  describe('toggleWonderSide', () => {
    it('toggles from side A to side B', () => {
      const initialState = {
        app: {
          currentPlayer: 'PLAYER1',
          wonderChooserPlayer: 'PLAYER1',
        },
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            wonderSide: 'A',
          },
        },
      };
      const next = updater(toggleWonderSide())(initialState);
      expect(next.players.PLAYER1.wonderSide).toBe('B');
    });
    it('toggles from side B to side A', () => {
      const initialState = {
        app: {
          currentPlayer: 'PLAYER1',
          wonderChooserPlayer: 'PLAYER1',
        },
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            wonderSide: 'B',
          },
        },
      };
      const next = updater(toggleWonderSide())(initialState);
      expect(next.players.PLAYER1.wonderSide).toBe('A');
    });
  });
  describe('when chosen player is not current player', () => {
    it('toggles from side A to B', () => {
      const initialState = {
        app: {
          currentPlayer: 'PLAYER1',
          wonderChooserPlayer: 'PLAYER2',
        },
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            wonderSide: 'A',
          },
          PLAYER2: {
            'id': 'PLAYER2',
            wonderSide: 'A',
          },
        },
      };
      const next = updater(toggleWonderSide())(initialState);
      expect(next.players.PLAYER2.wonderSide).toBe('B');
    });
    it('toggles from side B to A', () => {
      const initialState = {
        app: {
          currentPlayer: 'PLAYER1',
          wonderChooserPlayer: 'PLAYER2',
        },
        players: {
          PLAYER1: {
            id: 'PLAYER1',
            wonderSide: 'B',
          },
          PLAYER2: {
            'id': 'PLAYER2',
            wonderSide: 'B',
          },
        },
      };
      const next = updater(toggleWonderSide())(initialState);
      expect(next.players.PLAYER2.wonderSide).toBe('A');
    });
  });
});

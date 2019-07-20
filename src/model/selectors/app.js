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

import { prop } from 'ramda';
import { createSelector } from 'reselect';
import CARDS from 'data/cards';

export const getApp = prop('app');

export const getCurrentPlayerId = createSelector(
  [getApp],
  prop('currentPlayer')
);

export const getSelectedCardId = createSelector(
  [getApp],
  prop(['selectedCardId'])
);

export const getSelectedCardIndex = createSelector(
  [getApp],
  prop(['selectedCardIdx'])
);

export const getScene = createSelector(
  [getApp],
  prop('scene')
);

export const getPlayerPickerCount = createSelector(
  [getApp],
  prop('playerPickerCount')
);

export const getSelectedCard = createSelector(
  [getSelectedCardId],
  (id) => id == null ? null : CARDS[id]
);

export const getWonderChooserPlayerId = createSelector(
  [getApp],
  prop('wonderChooserPlayer')
);

export const getCallout = createSelector(
  [getApp],
  prop('callout')
);

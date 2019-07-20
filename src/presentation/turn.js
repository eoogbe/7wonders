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

import { createSelector } from 'reselect';
import * as app from 'model/selectors/app';
import * as players from 'model/selectors/players';
import * as turn from 'model/utils/turn';
import { pluralizeCoins } from './plurals';

const createPaymentSelector = (paymentFn) => createSelector(
  [app.getSelectedCardId, app.getCurrentPlayerId, players.getPlayers],
  (selectedCardId, currentPlayerId, players) => {
    const payment = paymentFn({ selectedCardId, currentPlayerId, players });
    return payment == null ? null : pluralizeCoins(payment);
  });

export const getBuildStructureCost =
  createPaymentSelector(turn.getBuildStructureCost);

export const getBuildWonderCost =
  createPaymentSelector(turn.getBuildWonderCost);

export const getAddMoneyCost = createPaymentSelector(turn.getAddMoneyCost);

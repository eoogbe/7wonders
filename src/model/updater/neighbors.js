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

import { compose, descend, evolve, prop, sort, take } from 'ramda';
import { concat, handleAction } from 'redux-fp';
import { BUILD_STRUCTURE, BUILD_WONDER, CHOOSE_NEIGHBOR } from '../actions';
import { getPayments } from '../utils/paymentCost';
import * as playerUtils from '../utils/players';

const chooseNeighbor =
  handleAction(CHOOSE_NEIGHBOR, ({ payload }) => (state) => {
    const choosePayment = compose(
      take(1),
      sort(descend(prop(payload.costType)))
    );
    return evolve({
      players: {
        [state.app.currentPlayer]: {
          structurePayments: choosePayment,
          wonderPayments: choosePayment,
        },
      },
    }, state);
  });

const setStructurePayments =
  handleAction(BUILD_STRUCTURE, ({ payload }) => (state) => {
    const currentPlayerId = state.app.currentPlayer;
    return evolve({
      players: {
        [currentPlayerId]: playerUtils.setStructurePayments({
          isFree: payload.isFree,
          cardId: state.app.selectedCardId || payload.cardId,
          getPayments: (cost) => getPayments({
            players: state.players,
            currentPlayerId,
            cost,
          }),
        })
      },
    }, state);
  });

const setWonderPayments =
  handleAction(BUILD_WONDER, () => (state) => {
    const currentPlayerId = state.app.currentPlayer;
    return evolve({
      players: {
        [currentPlayerId]: playerUtils.setWonderPayments({
          getPayments: (cost) => getPayments({
            players: state.players,
            currentPlayerId,
            cost,
          }),
        })
      },
    }, state);
  });

export default concat(
  chooseNeighbor,
  setStructurePayments,
  setWonderPayments
);

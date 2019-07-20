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

import { ofType } from 'redux-observable';
import { combineLatest } from 'rxjs';
import { debounceTime, filter, mapTo } from 'rxjs/operators';
import { START_AGE, viewGameBoard } from '../actions';

const isDealt = ({ app, game, players }) => {
  const playerValues = Object.values(players);
  return app.scene === 'AGE'
    && playerValues.length
    && playerValues.every((player) => player.hand.length === 7);
};

export default (action$, state$) => {
  const startAgeAction$ = action$.pipe(ofType(START_AGE));
  const dealtState$ = state$.pipe(filter(isDealt));
  return combineLatest(startAgeAction$, dealtState$).pipe(
    debounceTime(1000),
    mapTo(viewGameBoard())
  );
};

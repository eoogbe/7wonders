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

import { chain, prop } from 'ramda';
import CARDS from 'data/cards';
import { getTableauCards } from './tableau';

export const getDiscardedCards = ({ ages, currentPlayer }) => {
  const tableauCards = getTableauCards(currentPlayer);
  const discardedCards = chain(prop('discardedCards'), ages);
  return discardedCards
    .map((cardId) => CARDS[cardId])
    .filter((discardedCard) =>
      tableauCards.every((tableauCard) =>
        discardedCard.name !== tableauCard.name));
};

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

export const BUILD_STRUCTURE = 'BUILD_STRUCTURE';

export const BUILD_WONDER = 'BUILD_WONDER';

export const ADD_MONEY = 'ADD_MONEY';

export const SELECT_HAND_CARD = 'SELECT_HAND_CARD';

export const CHOOSE_NEIGHBOR = 'CHOOSE_NEIGHBOR';

export const COPY_GUILD = 'COPY_GUILD';

export const buildStructure = (cardId) => ({
  type: BUILD_STRUCTURE,
  payload: {
    cardId,
  },
});

export const buildFreeStructure = () => ({
  type: BUILD_STRUCTURE,
  payload: {
    isFree: true,
  },
});

export const buildWonder = () => ({
  type: BUILD_WONDER,
});

export const addMoney = () => ({
  type: ADD_MONEY,
});

export const selectHandCard = (cardId, cardIdx) => ({
  type: SELECT_HAND_CARD,
  payload: {
    cardId,
    cardIdx,
  },
});

export const chooseNeighbor = (costType) => ({
  type: CHOOSE_NEIGHBOR,
  payload: {
    costType,
  },
});

export const copyGuild = (cardId) => ({
  type: COPY_GUILD,
  payload: {
    cardId,
  },
});

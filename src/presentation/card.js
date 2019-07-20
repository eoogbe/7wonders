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

import { compose, countBy, equals, head, map, toPairs } from 'ramda';
import { pluralizeCoins, pluralizePoints, pluralizeShields } from './plurals';

const RAW_MATERIALS = ['Clay', 'Ore', 'Stone', 'Wood'];

const MANUFACTURED_GOODS = ['Glass', 'Loom', 'Papyrus'];

const ANY_RAW_MATERIAL = 'raw material (Clay, Ore, Stone, Wood)';

const ANY_MANFACTURED_GOOD = 'manufactured good (Glass, Loom, Papyrus)';

export const TYPE_NAMES = {
  RAW_MATERIAL: 'Raw material',
  MANUFACTURED_GOOD: 'Manufactured good',
  CIVIC: 'Civic',
  MILITARY: 'Military',
  TRADE: 'Trade',
  SCIENCE: 'Science',
  GUILD: 'Guild',
};

export const getItemByCount =
  compose(
    map(([item, count]) => `${count} ${item}`),
    toPairs,
    countBy
  );

const getResourceEffect = ({ alternatives }) => {
  if (alternatives.length < 3) {
    return alternatives.join(' / ');
  }

  return alternatives.map(head).join('/');
};

export const getEffects = ({
  resources, points, shields, money, science, leftTradeDiscounts,
  rightTradeDiscounts, special,
}) =>
  [].concat(
    resources != null ? resources.map(getResourceEffect) : [],
    leftTradeDiscounts != null && leftTradeDiscounts.length
      ? ['L trade'] : [],
    rightTradeDiscounts != null && rightTradeDiscounts.length
      ? ['R trade'] : [],
    science != null ? [science] : [],
    points > 0 ? [pluralizePoints(points)] : [],
    shields > 0 ? [pluralizeShields(shields)] : [],
    money > 0 ? [pluralizeCoins(money)] : [],
    special === 'TRADE_RAW_MATERIAL'
      ? [getResourceEffect({ alternatives: RAW_MATERIALS })] : [],
    special === 'TRADE_MANUFACTURED_GOOD'
      ? [getResourceEffect({ alternatives: MANUFACTURED_GOODS })] : [],
    special === 'NEIGHBORING_BROWN_MONEY' ? ['<V> Brown $'] : [],
    special === 'NEIGHBORING_GRAY_MONEY' ? ['<V> Gray $'] : [],
    special === 'BROWN_POINTS' ? ['V Brown P'] : [],
    special === 'YELLOW_POINTS' ? ['V Yellow P'] : [],
    special === 'GRAY_POINTS' ? ['V Gray P'] : [],
    special === 'WONDER_POINTS' ? ['V Wond P'] : [],
    special === 'BUILDERS_GUILD' ? ['<V> Wond P'] : [],
    special === 'CRAFTSMENS_GUILD' ? ['<> Gray P'] : [],
    special === 'MAGISTRATES_GUILD' ? ['<> Blue P'] : [],
    special === 'PHILOSOPHERS_GUILD' ? ['<> Green P'] : [],
    special === 'SHIPOWNERS_GUILD' ? ['Br/Gr/Pu P'] : [],
    special === 'SPIES_GUILD' ? ['<> Red P'] : [],
    special === 'STRATEGISTS_GUILD' ? ['<> -1 P'] : [],
    special === 'TRADERS_GUILD' ? ['<> Yellow P'] : [],
    special === 'WORKERS_GUILD' ? ['<> Brown P'] : [],
    ['SCIENTISTS_GUILD', 'EXTRA_SCIENCE'].includes(special)
      ? ['1 science'] : [],
    special === 'PLAY_LAST_CARD' ? ['Play 7th'] : [],
    special === 'BUILD_DISCARDED' ? ['Build disc'] : [],
    special === 'BUILD_FREE' ? ['Build free'] : [],
    special === 'COPY_GUILD' ? ['Copy guild'] : []
  );

const isAnyRawMaterial = equals(RAW_MATERIALS);

const isAnyManufacturedGood = equals(MANUFACTURED_GOODS);

const getResourceLongEffect = ({ alternatives }) => {
  if (isAnyRawMaterial(alternatives)) {
    return ANY_RAW_MATERIAL;
  }

  if (isAnyManufacturedGood(alternatives)) {
    return ANY_MANFACTURED_GOOD;
  }

  return alternatives.join(' or ');
};

const getTradeDiscountsLongEffect = ({ neighbor, discounts }) => {
  const resourceEffect = getResourceLongEffect({ alternatives: discounts });
  return `For each ${resourceEffect}, pay your ${neighbor} neighbor 1 coin instead of 2`;
};

export const getLongEffects = ({
  resources, points, shields, money, science, leftTradeDiscounts,
  rightTradeDiscounts, special,
}) =>
  [].concat(
    resources != null ? getItemByCount(getResourceLongEffect, resources) : [],
    leftTradeDiscounts != null && leftTradeDiscounts.length
      ? [getTradeDiscountsLongEffect({
          neighbor: 'left',
          discounts: leftTradeDiscounts,
        })]
      : [],
    rightTradeDiscounts != null && rightTradeDiscounts.length
      ? [getTradeDiscountsLongEffect({
          neighbor: 'right',
          discounts: rightTradeDiscounts,
        })]
      : [],
    science != null ? [science] : [],
    points > 0 ? [pluralizePoints(points)] : [],
    shields > 0 ? [pluralizeShields(shields)] : [],
    money > 0 ? [pluralizeCoins(money)] : [],
    special === 'TRADE_RAW_MATERIAL' ? [`1 ${ANY_RAW_MATERIAL}`] : [],
    special === 'TRADE_MANUFACTURED_GOOD' ? [`1 ${ANY_MANFACTURED_GOOD}`] : [],
    special === 'NEIGHBORING_BROWN_MONEY'
      ? ['1 coin per brown card you and your neighbors have'] : [],
    special === 'NEIGHBORING_GRAY_MONEY'
      ? ['2 coins per gray card you and your neighbors have'] : [],
    special === 'BROWN_POINTS'
      ? ['1 coin and 1 point per brown card you have'] : [],
    special === 'YELLOW_POINTS'
      ? ['1 coin and 1 point per yellow card you have'] : [],
    special === 'GRAY_POINTS'
      ? ['2 coins and 2 points per gray card you have'] : [],
    special === 'WONDER_POINTS'
      ? ["3 coins and 1 point per wonder stage you've built"] : [],
    special === 'BUILDERS_GUILD'
      ? ['1 point for each wonder stage you and your neighbors have built']
      : [],
    special === 'CRAFTSMENS_GUILD'
      ? ['2 points for each gray card your neighbors have'] : [],
    special === 'MAGISTRATES_GUILD'
      ? ['1 point for each blue card your neighbors have'] : [],
    special === 'PHILOSOPHERS_GUILD'
      ? ['1 point for each green card your neighbors have'] : [],
    special === 'SHIPOWNERS_GUILD'
      ? ['1 point for each brown, gray, and purple card you have'] : [],
    special === 'SPIES_GUILD'
      ? ['1 point for each red card your neighbors have'] : [],
    special === 'STRATEGISTS_GUILD'
      ? ['1 point for each defeat token your neighbors have'] : [],
    special === 'TRADERS_GUILD'
      ? ['1 point for each yellow card your neighbors have'] : [],
    special === 'WORKERS_GUILD'
      ? ['1 point for each brown card your neighbors have'] : [],
    ['SCIENTISTS_GUILD', 'EXTRA_SCIENCE'].includes(special)
      ? ['1 extra science symbol (Compass, Tablet, Wheel)'] : [],
    special === 'PLAY_LAST_CARD'
      ? ['Play your 7th Age card instead of discarding it'] : [],
    special === 'BUILD_DISCARDED'
      ? ['Build one of the cards that have been discarded for free'] : [],
    special === 'BUILD_FREE' ? ['Once per age, build a structure for free']: [],
    special === 'COPY_GUILD'
      ? ['Copy a guild card of your choice from one of your neighbors'] : []
  );

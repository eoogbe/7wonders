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

import { getEffects, getItemByCount, getLongEffects } from '../card';

describe('getItemByCount', () => {
  it('returns the items grouped by their counts', () => {
    const items = getItemByCount((x) => x, ['Wood', 'Wood', 'Loom']);
    expect(items).toEqual([
      '2 Wood',
      '1 Loom',
    ]);
  });
});

describe('getEffects', () => {
  it('when resources has singular resource contains the resource', () => {
    const effects = getEffects({
      resources: [{ alternatives: ['Wood'] }],
    });
    expect(effects).toEqual(['Wood']);
  });
  it('when resources has alternative resource contains the joined resources', () => {
    const effects = getEffects({
      resources: [{ alternatives: ['Clay', 'Wood'] }],
    });
    expect(effects).toEqual(['Clay / Wood']);
  });
  it('when more than 2 resource alternatives contains first initials of each alternative', () => {
    const effects = getEffects({
      resources: [{ alternatives: ['Glass', 'Loom', 'Papyrus'] }],
    });
    expect(effects).toEqual(['G/L/P']);
  });
  it('when resources null does not contain resources', () => {
    const effects = getEffects({ resources: null });
    expect(effects).toHaveLength(0);
  });
  it('when left trade discount exists', () => {
    const effects = getEffects({
      leftTradeDiscounts: ['Glass', 'Loom', 'Papyrus'],
    });
    expect(effects).toEqual(['L trade']);
  });
  it('when right trade discount exists', () => {
    const effects = getEffects({
      rightTradeDiscounts: ['Glass', 'Loom', 'Papyrus'],
    });
    expect(effects).toEqual(['R trade']);
  });
  it('when science contains the science', () => {
    const effects = getEffects({ resources: [], science: 'Compass' });
    expect(effects).toEqual(['Compass']);
  });
  it('when points contains the pluralized points', () => {
    const effects = getEffects({ resources: [], points: 2 });
    expect(effects).toEqual(['2 points']);
  });
  it('when shields contains the pluralized shields', () => {
    const effects = getEffects({ resources: [], shields: 2 });
    expect(effects).toEqual(['2 shields']);
  });
  it('when money contains the pluralized coins', () => {
    const effects = getEffects({ resources: [], money: 2 });
    expect(effects).toEqual(['2 coins']);
  });
  it('handles TRADE_RAW_MATERIAL special effect', () => {
    const effects = getEffects({ special: 'TRADE_RAW_MATERIAL' });
    expect(effects).toEqual(['C/O/S/W']);
  });
  it('handles TRADE_MANUFACTURED_GOOD special effect', () => {
     const effects = getEffects({ special: 'TRADE_MANUFACTURED_GOOD' });
     expect(effects).toEqual(['G/L/P']);
  });
  it('handles NEIGHBORING_BROWN_MONEY special effect', () => {
    const effects = getEffects({ special: 'NEIGHBORING_BROWN_MONEY' });
    expect(effects).toEqual(['<V> Brown $']);
  });
  it('handles NEIGHBORING_GRAY_MONEY special effect', () => {
    const effects = getEffects({ special: 'NEIGHBORING_GRAY_MONEY' });
    expect(effects).toEqual(['<V> Gray $']);
  });
  it('handles BROWN_POINTS special effect', () => {
    const effects = getEffects({ special: 'BROWN_POINTS' });
    expect(effects).toEqual(['V Brown P']);
  });
  it('handles YELLOW_POINTS special effect', () => {
    const effects = getEffects({ special: 'YELLOW_POINTS' });
    expect(effects).toEqual(['V Yellow P']);
  });
  it('handles GRAY_POINTS special effect', () => {
    const effects = getEffects({ special: 'GRAY_POINTS' });
    expect(effects).toEqual(['V Gray P']);
  });
  it('handles WONDER_POINTS special effect', () => {
    const effects = getEffects({ special: 'WONDER_POINTS' });
    expect(effects).toEqual(['V Wond P']);
  });
  it('handles BUILDERS_GUILD special effect', () => {
    const effects = getEffects({ special: 'BUILDERS_GUILD' });
    expect(effects).toEqual(['<V> Wond P']);
  });
  it('handles CRAFTSMENS_GUILD special effect', () => {
    const effects = getEffects({ special: 'CRAFTSMENS_GUILD' });
    expect(effects).toEqual(['<> Gray P']);
  });
  it('handles MAGISTRATES_GUILD special effect', () => {
    const effects = getEffects({ special: 'MAGISTRATES_GUILD' });
    expect(effects).toEqual(['<> Blue P']);
  });
  it('handles PHILOSOPHERS_GUILD special effect', () => {
    const effects = getEffects({ special: 'PHILOSOPHERS_GUILD' });
    expect(effects).toEqual(['<> Green P']);
  });
  it('handles SCIENTISTS_GUILD special effect', () => {
    const effects = getEffects({ special: 'SCIENTISTS_GUILD' });
    expect(effects).toEqual(['1 science']);
  });
  it('handles SHIPOWNERS_GUILD special effect', () => {
    const effects = getEffects({ special: 'SHIPOWNERS_GUILD' });
    expect(effects).toEqual(['Br/Gr/Pu P']);
  });
  it('handles SPIES_GUILD special effect', () => {
    const effects = getEffects({ special: 'SPIES_GUILD' });
    expect(effects).toEqual(['<> Red P']);
  });
  it('handles STRATEGISTS_GUILD special effect', () => {
    const effects = getEffects({ special: 'STRATEGISTS_GUILD' });
    expect(effects).toEqual(['<> -1 P']);
  });
  it('handles TRADERS_GUILD special effect', () => {
    const effects = getEffects({ special: 'TRADERS_GUILD' });
    expect(effects).toEqual(['<> Yellow P']);
  });
  it('handles WORKERS_GUILD special effect', () => {
    const effects = getEffects({ special: 'WORKERS_GUILD' });
    expect(effects).toEqual(['<> Brown P']);
  });
  it('handles EXTRA_SCIENCE special effect', () => {
    const effects = getEffects({ special: 'EXTRA_SCIENCE' });
    expect(effects).toEqual(['1 science']);
  });
  it('handles PLAY_LAST_CARD special effect', () => {
    const effects = getEffects({ special: 'PLAY_LAST_CARD' });
    expect(effects).toEqual(['Play 7th']);
  });
  it('handles BUILD_DISCARDED special effect', () => {
    const effects = getEffects({ special: 'BUILD_DISCARDED' });
    expect(effects).toEqual(['Build disc']);
  });
  it('handles BUILD_FREE special effect', () => {
    const effects = getEffects({ special: 'BUILD_FREE' });
    expect(effects).toEqual(['Build free']);
  });
  it('handles COPY_GUILD special effect', () => {
    const effects = getEffects({ special: 'COPY_GUILD' });
    expect(effects).toEqual(['Copy guild']);
  });
});

describe('getLongEffects', () => {
  it('when resources has singular resource contains the resource', () => {
    const effects = getLongEffects({
      resources: [{ alternatives: ['Wood'] }],
    });
    expect(effects).toEqual(['1 Wood']);
  });
  it('when resources has alternative resource contains the joined resources', () => {
    const effects = getLongEffects({
      resources: [{ alternatives: ['Clay', 'Wood'] }],
    });
    expect(effects).toEqual(['1 Clay or Wood']);
  });
  it('when resource alternative is any raw material lists the resources', () => {
    const effects = getLongEffects({
      resources: [{ alternatives: ['Clay', 'Ore', 'Stone', 'Wood'] }],
    });
    expect(effects).toEqual(['1 raw material (Clay, Ore, Stone, Wood)']);
  });
  it('when resource alternative is any manufactured good lists the resources', () => {
    const effects = getLongEffects({
      resources: [{ alternatives: ['Glass', 'Loom', 'Papyrus'] }],
    });
    expect(effects).toEqual(['1 manufactured good (Glass, Loom, Papyrus)']);
  });
  it('when multiple of the same resource groups resources', () => {
    const effects = getLongEffects({
      resources: [{ alternatives: ['Wood'] }, { alternatives: ['Wood'] }],
    });
    expect(effects).toEqual(['2 Wood']);
  });
  it('when resources null does not contain resources', () => {
    const effects = getLongEffects({ resources: null });
    expect(effects).toHaveLength(0);
  });
  it('when left trade discount has alternatives contains the joined discounts', () => {
    const effects = getLongEffects({
      leftTradeDiscounts: ['Clay', 'Wood'],
    });
    expect(effects).toEqual([
      'For each Clay or Wood, pay your left neighbor 1 coin instead of 2',
    ]);
  });
  it('when left trade discount is raw materials lists the discounts', () => {
    const effects = getLongEffects({
      leftTradeDiscounts: ['Clay', 'Ore', 'Stone', 'Wood'],
    });
    expect(effects).toEqual([
      'For each raw material (Clay, Ore, Stone, Wood), pay your left neighbor 1 coin instead of 2',
    ]);
  });
  it('when left trade discount is manufactured goods lists the discounts', () => {
    const effects = getLongEffects({
      leftTradeDiscounts: ['Glass', 'Loom', 'Papyrus'],
    });
    expect(effects).toEqual([
      'For each manufactured good (Glass, Loom, Papyrus), pay your left neighbor 1 coin instead of 2',
    ]);
  });
  it('when right trade discount has alternatives contains the joined discounts', () => {
    const effects = getLongEffects({
      rightTradeDiscounts: ['Clay', 'Wood'],
    });
    expect(effects).toEqual([
      'For each Clay or Wood, pay your right neighbor 1 coin instead of 2',
    ]);
  });
  it('when right trade discount is raw materials lists the discounts', () => {
    const effects = getLongEffects({
      rightTradeDiscounts: ['Clay', 'Ore', 'Stone', 'Wood'],
    });
    expect(effects).toEqual([
      'For each raw material (Clay, Ore, Stone, Wood), pay your right neighbor 1 coin instead of 2',
    ]);
  });
  it('when right trade discount is manufactured goods lists the discounts', () => {
    const effects = getLongEffects({
      rightTradeDiscounts: ['Glass', 'Loom', 'Papyrus'],
    });
    expect(effects).toEqual([
      'For each manufactured good (Glass, Loom, Papyrus), pay your right neighbor 1 coin instead of 2',
    ]);
  });
  it('when science contains the science', () => {
    const effects = getLongEffects({ resources: [], science: 'Compass' });
    expect(effects).toEqual(['Compass']);
  });
  it('when points contains the pluralized points', () => {
    const effects = getLongEffects({ resources: [], points: 2 });
    expect(effects).toEqual(['2 points']);
  });
  it('when shields contains the pluralized shields', () => {
    const effects = getLongEffects({ resources: [], shields: 2 });
    expect(effects).toEqual(['2 shields']);
  });
  it('when money contains the pluralized coins', () => {
    const effects = getLongEffects({ resources: [], money: 2 });
    expect(effects).toEqual(['2 coins']);
  });
  it('handles TRADE_RAW_MATERIAL special effect', () => {
    const effects = getLongEffects({ special: 'TRADE_RAW_MATERIAL' });
    expect(effects).toEqual(['1 raw material (Clay, Ore, Stone, Wood)']);
  });
  it('handles TRADE_MANUFACTURED_GOOD special effect', () => {
     const effects = getLongEffects({ special: 'TRADE_MANUFACTURED_GOOD' });
     expect(effects).toEqual(['1 manufactured good (Glass, Loom, Papyrus)']);
  });
  it('handles NEIGHBORING_BROWN_MONEY special effect', () => {
    const effects = getLongEffects({ special: 'NEIGHBORING_BROWN_MONEY' });
    expect(effects).toEqual([
      '1 coin per brown card you and your neighbors have',
    ]);
  });
  it('handles NEIGHBORING_GRAY_MONEY special effect', () => {
    const effects = getLongEffects({ special: 'NEIGHBORING_GRAY_MONEY' });
    expect(effects).toEqual([
      '2 coins per gray card you and your neighbors have',
    ]);
  });
  it('handles BROWN_POINTS special effect', () => {
    const effects = getLongEffects({ special: 'BROWN_POINTS' });
    expect(effects).toEqual(['1 coin and 1 point per brown card you have']);
  });
  it('handles YELLOW_POINTS special effect', () => {
    const effects = getLongEffects({ special: 'YELLOW_POINTS' });
    expect(effects).toEqual(['1 coin and 1 point per yellow card you have']);
  });
  it('handles GRAY_POINTS special effect', () => {
    const effects = getLongEffects({ special: 'GRAY_POINTS' });
    expect(effects).toEqual(['2 coins and 2 points per gray card you have']);
  });
  it('handles WONDER_POINTS special effect', () => {
    const effects = getLongEffects({ special: 'WONDER_POINTS' });
    expect(effects).toEqual([
      "3 coins and 1 point per wonder stage you've built",
    ]);
  });
  it('handles BUILDERS_GUILD special effect', () => {
    const effects = getLongEffects({ special: 'BUILDERS_GUILD' });
    expect(effects).toEqual([
      '1 point for each wonder stage you and your neighbors have built',
    ]);
  });
  it('handles CRAFTSMENS_GUILD special effect', () => {
    const effects = getLongEffects({ special: 'CRAFTSMENS_GUILD' });
    expect(effects).toEqual([
      '2 points for each gray card your neighbors have',
    ]);
  });
  it('handles MAGISTRATES_GUILD special effect', () => {
    const effects = getLongEffects({ special: 'MAGISTRATES_GUILD' });
    expect(effects).toEqual(['1 point for each blue card your neighbors have']);
  });
  it('handles PHILOSOPHERS_GUILD special effect', () => {
    const effects = getLongEffects({ special: 'PHILOSOPHERS_GUILD' });
    expect(effects).toEqual([
      '1 point for each green card your neighbors have',
    ]);
  });
  it('handles SCIENTISTS_GUILD special effect', () => {
    const effects = getLongEffects({ special: 'SCIENTISTS_GUILD' });
    expect(effects).toEqual([
      '1 extra science symbol (Compass, Tablet, Wheel)',
    ]);
  });
  it('handles SHIPOWNERS_GUILD special effect', () => {
    const effects = getLongEffects({ special: 'SHIPOWNERS_GUILD' });
    expect(effects).toEqual([
      '1 point for each brown, gray, and purple card you have',
    ]);
  });
  it('handles SPIES_GUILD special effect', () => {
    const effects = getLongEffects({ special: 'SPIES_GUILD' });
    expect(effects).toEqual(['1 point for each red card your neighbors have']);
  });
  it('handles STRATEGISTS_GUILD special effect', () => {
    const effects = getLongEffects({ special: 'STRATEGISTS_GUILD' });
    expect(effects).toEqual([
      '1 point for each defeat token your neighbors have',
    ]);
  });
  it('handles TRADERS_GUILD special effect', () => {
    const effects = getLongEffects({ special: 'TRADERS_GUILD' });
    expect(effects).toEqual([
      '1 point for each yellow card your neighbors have',
    ]);
  });
  it('handles WORKERS_GUILD special effect', () => {
    const effects = getLongEffects({ special: 'WORKERS_GUILD' });
    expect(effects).toEqual([
      '1 point for each brown card your neighbors have',
    ]);
  });
  it('handles EXTRA_SCIENCE special effect', () => {
    const effects = getLongEffects({ special: 'EXTRA_SCIENCE' });
    expect(effects).toEqual([
      '1 extra science symbol (Compass, Tablet, Wheel)',
    ]);
  });
  it('handles PLAY_LAST_CARD special effect', () => {
    const effects = getLongEffects({ special: 'PLAY_LAST_CARD' });
    expect(effects).toEqual([
      'Play your 7th Age card instead of discarding it',
    ]);
  });
  it('handles BUILD_DISCARDED special effect', () => {
    const effects = getLongEffects({ special: 'BUILD_DISCARDED' });
    expect(effects).toEqual([
      'Build one of the cards that have been discarded for free',
    ]);
  });
  it('handles BUILD_FREE special effect', () => {
    const effects = getLongEffects({ special: 'BUILD_FREE' });
    expect(effects).toEqual(['Once per age, build a structure for free']);
  });
  it('handles COPY_GUILD special effect', () => {
    const effects = getLongEffects({ special: 'COPY_GUILD' });
    expect(effects).toEqual([
      'Copy a guild card of your choice from one of your neighbors',
    ]);
  });
});

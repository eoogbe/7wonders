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

import getPaymentMethods from '../paymentMethods';

it('when no cost payable 1 way', () => {
  const resources = [];
  const cost = [];
  expect(getPaymentMethods(resources, cost)).toEqual([
    [],
  ]);
});

it('when no resource contains cost item no way to pay', () => {
  const resources = [];
  const cost = ['Clay'];
  expect(getPaymentMethods(resources, cost)).toHaveLength(0);
});

it('when the resource is the cost item payable 1 way', () => {
  const resources = [{ alternatives: ['Clay'] }];
  const cost = ['Clay'];
  expect(getPaymentMethods(resources, cost)).toEqual([
    [{ alternatives: ['Clay'] }],
  ]);
});

it('when resource pruned out no way to pay', () => {
  const resources = [{ alternatives: ['Ore'] }];
  const cost = ['Clay'];
  expect(getPaymentMethods(resources, cost)).toHaveLength(0);
});

it('with extraneous pruned out resource is payable', () => {
  const resources = [{ alternatives: ['Ore'] }, { alternatives: ['Clay'] }];
  const cost = ['Clay'];
  expect(getPaymentMethods(resources, cost)).toEqual([
    [{ alternatives: ['Clay'] }],
  ]);
});

it('when a resource alternative contains cost item payable 1 way', () => {
  const resources = [{ alternatives: ['Ore', 'Clay'] }];
  const cost = ['Clay'];
  expect(getPaymentMethods(resources, cost)).toEqual([
    [{ alternatives: ['Ore', 'Clay'] }],
  ]);
});

it('when extraneous resource alternative is payable', () => {
  const resources = [{ alternatives: ['Ore'] }, { alternatives: ['Clay', 'Wood'] }];
  const cost = ['Clay', 'Ore'];
  expect(getPaymentMethods(resources, cost)).toEqual([
    [{ alternatives: ['Ore'] }, { alternatives: ['Clay', 'Wood'] }],
  ]);
});

it('when not enough resources for the full cost no way to pay', () => {
  const resources = [{ alternatives: ['Clay'] }];
  const cost = ['Clay', 'Clay'];
  expect(getPaymentMethods(resources, cost)).toHaveLength(0);
});

it('when multiple resources contains cost item payable multiple ways', () => {
  const resources = [{ alternatives: ['Clay'] }, { alternatives: ['Ore', 'Clay'] }];
  const cost = ['Clay'];
  expect(getPaymentMethods(resources, cost)).toEqual([
    [{ alternatives: ['Clay'] }],
    [{ alternatives: ['Ore', 'Clay'] }],
  ]);
});

it('when duplicate resource contains cost item payable multiple ways', () => {
  const resources = [{ alternatives: ['Clay'] }, { alternatives: ['Clay'] }];
  const cost = ['Clay'];
  expect(getPaymentMethods(resources, cost)).toEqual([
    [{ alternatives: ['Clay'] }],
    [{ alternatives: ['Clay'] }],
  ]);
});

it('when cost needs both items of resource alternative no way to pay', () => {
  const resources = [{ alternatives: ['Ore', 'Clay'] }];
  const cost = ['Clay', 'Ore'];
  expect(getPaymentMethods(resources, cost)).toHaveLength(0);
});

it('when full cost allows only one alternative payable 1 way', () => {
  const resources = [{ alternatives: ['Ore', 'Clay'] }, { alternatives: ['Clay'] }];
  const cost = ['Clay', 'Ore'];
  expect(getPaymentMethods(resources, cost)).toEqual([
    [{ alternatives: ['Ore', 'Clay'] }, { alternatives: ['Clay'] }]
  ]);
});

it('when multiple resources match multiple cost items payable 1 way', () => {
  const resources = [{ alternatives: ['Ore'] }, { alternatives: ['Clay'] }];
  const cost = ['Clay', 'Ore'];
  expect(getPaymentMethods(resources, cost)).toEqual([
    [{ alternatives: ['Ore'] }, { alternatives: ['Clay'] }],
  ]);
});

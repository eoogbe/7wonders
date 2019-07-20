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

import { concat, drop, unnest, take } from 'ramda';
import intersects from './intersects';

const pruneResources = (resources, cost) =>
  resources.filter(({ alternatives }) => intersects(alternatives)(cost));

const getPaymentMethods = (resources, cost, solutions, currentSolution) => {
  if (!cost.length) {
    return [...solutions, currentSolution];
  }

  const [costItem, ...nextCost] = cost;
  const payments = resources.map((resource, idx) => {
    if (!resource.alternatives.includes(costItem)) {
      return solutions;
    }

    const nextResourcecs =
      concat(take(idx, resources), drop(idx + 1, resources));
    const nextSolution = [resource, ...currentSolution];
    return getPaymentMethods(nextResourcecs, nextCost, solutions, nextSolution);
  });

  // Can't chain because map uses index.
  return unnest(payments);
};

export default (resources, cost) => {
  const prunedResources = pruneResources(resources, cost);
  return getPaymentMethods(prunedResources, cost, [], []);
};

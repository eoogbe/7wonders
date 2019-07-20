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

import {
  addIndex, adjust, chain, compose, equals, evolve, inc, keys, last, map, max,
  min, pick, prop, propEq, reduce, sum, without,
} from 'ramda';
import {
  getNeighboringPlayers, getNeighboringTableauCards,
} from 'model/utils/neighbors';
import { getTableauCardsWithoutWonder } from 'model/utils/tableau';
import {
  getCompletedWonderStages, hasCompletedWonderAbility,
} from 'model/utils/wonder';

const SCIENCE_SYMBOLS = ['Compass', 'Tablet', 'Wheel'];

const getScienceSetPoints = (cardCounts) => {
  if (cardCounts.length < 3) {
    return 0;
  }

  const minCount = reduce(min, Infinity, cardCounts);
  return minCount * 7;
}

const getScienceSymbolPoints = compose(
  sum,
  map((count) => Math.pow(count, 2))
);

const getScienceTypePoints = (scienceTypes) =>
  getScienceSymbolPoints(scienceTypes) + getScienceSetPoints(scienceTypes);

const chainIndexed = addIndex(chain);

const incScienceCardAlternatives = (alternatives) =>
  chainIndexed(
    (science, idx) => alternatives.map(adjust(idx, inc)),
    SCIENCE_SYMBOLS
  );

const getScienceScore = ({ player, tableauCards }) => {
  let scienceCardAlternatives = [
    SCIENCE_SYMBOLS.map((science) =>
      tableauCards.filter(propEq('science', science)).length),
  ];

  if (tableauCards.some(propEq('id', 'SCIENTISTS_GUILD'))) {
    scienceCardAlternatives =
      incScienceCardAlternatives(scienceCardAlternatives);
  }

  if (hasCompletedWonderAbility({ player, wonderAbility: 'EXTRA_SCIENCE' })) {
    scienceCardAlternatives =
      incScienceCardAlternatives(scienceCardAlternatives);
  }

  return compose(
    reduce(max, 0),
    map(getScienceTypePoints)
  )(scienceCardAlternatives);
};

const getTradeScore = ({ player, tableauCards }) => {
  let score = 0;

  if (tableauCards.some(propEq('id', 'HAVEN'))) {
    const brownCards = tableauCards.filter(propEq('type', 'RAW_MATERIAL'));
    score += brownCards.length;
  }

  if (tableauCards.some(propEq('id', 'LIGHTHOUSE'))) {
    const yellowCards = tableauCards.filter(propEq('type', 'TRADE'));
    score += yellowCards.length;
  }

  if (tableauCards.some(propEq('id', 'CHAMBER_OF_COMMERCE'))) {
    const grayCards = tableauCards.filter(propEq('type', 'MANUFACTURED_GOOD'));
    score += grayCards.length * 2;
  }

  if (tableauCards.some(propEq('id', 'ARENA'))) {
    score += player.completedWonderStageCount;
  }

  return score;
};

const getNeighborCardCount = (gameState) =>
  (type) => {
    const neighboringTableauCards = getNeighboringTableauCards(gameState);
    const [leftNeighborCards, /* playerCards */, rightNeighborCards] =
      neighboringTableauCards.map((cards) =>
        cards.filter(propEq('type', type)));
    return leftNeighborCards.length + rightNeighborCards.length;
  };

const getGuildScore = (gameState) => (tableauCards) => {
  let score = 0;

  if (tableauCards.some(propEq('id', 'BUILDERS_GUILD'))) {
    const neighboringPlayers = getNeighboringPlayers(gameState);
    const neighboringCompletedWonderStageCounts = compose(
      sum,
      map(prop('completedWonderStageCount'))
    )(neighboringPlayers);
    score += neighboringCompletedWonderStageCounts;
  }

  if (tableauCards.some(propEq('id', 'CRAFTSMENS_GUILD'))) {
    const cardCount = getNeighborCardCount(gameState)('MANUFACTURED_GOOD');
    score += cardCount * 2;
  }

  if (tableauCards.some(propEq('id', 'MAGISTRATES_GUILD'))) {
    score += getNeighborCardCount(gameState)('CIVIC');
  }

  if (tableauCards.some(propEq('id', 'PHILOSOPHERS_GUILD'))) {
    score += getNeighborCardCount(gameState)('SCIENCE');
  }

  if (tableauCards.some(propEq('id', 'SHIPOWNERS_GUILD'))) {
    const brownCards = tableauCards.filter(propEq('type', 'RAW_MATERIAL'));
    const grayCards = tableauCards.filter(propEq('type', 'MANUFACTURED_GOOD'));
    const purpleCards = tableauCards.filter(propEq('type', 'GUILD'));
    score += brownCards.length + grayCards.length + purpleCards.length;
  }

  if (tableauCards.some(propEq('id', 'SPIES_GUILD'))) {
    score += getNeighborCardCount(gameState)('MILITARY');
  }

  if (tableauCards.some(propEq('id', 'STRATEGISTS_GUILD'))) {
    const neighboringPlayers = getNeighboringPlayers(gameState);
    const [leftDefeats, /* playerDefeats */, rightDefeats] =
      neighboringPlayers.map(({ militaryPoints }) =>
        militaryPoints.filter(equals(-1)));
    score += leftDefeats.length + rightDefeats.length;
  }

  if (tableauCards.some(propEq('id', 'TRADERS_GUILD'))) {
    score += getNeighborCardCount(gameState)('TRADE');
  }

  if (tableauCards.some(propEq('id', 'WORKERS_GUILD'))) {
    score += getNeighborCardCount(gameState)('RAW_MATERIAL');
  }

  return score;
};

const getPlayerScore = ({ players }) => (currentPlayerId) => {
  const calcPropPoints = reduce((acc, { points }) => acc + points, 0);
  const player = players[currentPlayerId];
  const tableauCards = getTableauCardsWithoutWonder(player);

  const militaryPoints = sum(player.militaryPoints);

  const moneyPoints = Math.floor(player.money / 3);

  const completedWonderStages = getCompletedWonderStages(player);
  const wonderPoints = calcPropPoints(completedWonderStages);

  const civicCards = tableauCards.filter(propEq('type', 'CIVIC'));
  const civicPoints = calcPropPoints(civicCards);

  const sciencePoints = getScienceScore({ player, tableauCards });

  const tradePoints = getTradeScore({ player, tableauCards });

  const guildPoints = getGuildScore({ currentPlayerId, players })(tableauCards);

  const totalPoints =
    militaryPoints + moneyPoints + wonderPoints + civicPoints
      + sciencePoints + tradePoints + guildPoints;

  return {
    player: pick(['money', 'wonder'], player),
    scores: [
      { type: 'MILITARY', score: militaryPoints },
      { type: 'MONEY', score: moneyPoints },
      { type: 'WONDER', score: wonderPoints },
      { type: 'CIVIC', score: civicPoints },
      { type: 'SCIENCE', score: sciencePoints },
      { type: 'TRADE', score: tradePoints },
      { type: 'GUILD', score: guildPoints },
      { type: 'TOTAL', score: totalPoints },
    ],
  };
};

const getWinner = (playerScores) => {
  const { player } = playerScores.reduce((acc, { player, scores }) => {
    const { score } = last(scores);

    if (acc.score > score) {
      return acc;
    }

    if (acc.score < score) {
      return { score, player };
    }

    return acc.player.money > player.money ? acc : { score, player };
  }, { score: 0 });
  return player.wonder;
};

export const getPlayerScores = ({ currentPlayerId, players }) => {
  const otherPlayerIds = compose(
    without([currentPlayerId]),
    keys
  )(players);
  const currentPlayerScore = getPlayerScore({ players })(currentPlayerId);
  const otherPlayerScores = otherPlayerIds.map(getPlayerScore({ players }));
  const playerScores = [currentPlayerScore, ...otherPlayerScores];
  return {
    playerScores: playerScores.map(evolve({ player: prop('wonder') })),
    winner: getWinner(playerScores),
  };
};

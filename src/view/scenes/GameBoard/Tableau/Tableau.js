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

import React from 'react';
import './Tableau.css';
import TableauCard from './TableauCard';

const renderCard = (cardActions) => (card) =>(
  <TableauCard
    key={card.id}
    {...cardActions}
    {...card}
  />
);

const renderNonResourceCards = ({ cards, ...cardActions }) => {
  if (!cards.length) {
    return <></>;
  }

  return (
    <ul className="Tableau-cardList">
      {cards.map(renderCard(cardActions))}
    </ul>
  );
}

const Tableau = ({
  style, resourceCards, nonResourceCards, showTableauCallout,
}) => (
  <div className="Tableau" style={style || {}}>
    <ul className="Tableau-cardList">
      {resourceCards.map(renderCard({ showTableauCallout }))}
    </ul>
    {renderNonResourceCards({ cards: nonResourceCards, showTableauCallout })}
  </div>
);

export default Tableau;

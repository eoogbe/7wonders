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
import { compose } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'model/actions';
import { getSelectedCardIndex } from 'model/selectors/app';
import {
  getCanBuildDiscarded, getIsCopyingGuild,
} from 'model/selectors/players';
import { getHand } from 'presentation/hand';
import './Hand.css';
import HandCard from './HandCard';

const renderCard = ({ selectedCardIdx, ...cardActions }) =>
  (card, idx) => (
    <HandCard
      key={`${card.id}${idx}`}
      {...cardActions}
      {...card}
      index={idx}
      isSelected={idx === selectedCardIdx}
    />
  );

const Hand = () => {
  const selectedCardIdx = useSelector(getSelectedCardIndex);
  const cards = useSelector(getHand);
  const canBuildDiscarded = useSelector(getCanBuildDiscarded);
  const isCopyingGuild = useSelector(getIsCopyingGuild);

  const dispatch = useDispatch();
  const showHandCallout = compose(dispatch, actions.showHandCallout);
  const buildStructure = compose(dispatch, actions.buildStructure);
  const copyGuild = compose(dispatch, actions.copyGuild);
  let select = compose(dispatch, actions.selectHandCard);

  if (canBuildDiscarded) {
    select = buildStructure;
  }

  if (isCopyingGuild) {
    select = copyGuild;
  }

  if (!cards.length) {
    return <div className="Hand-emptyCardList"></div>
  }

  return (
    <section>
      {canBuildDiscarded &&
        <h2 className="Hand-heading">
          Select a card from the discard pile to build for free:
        </h2>}
      {isCopyingGuild &&
        <h2 className="Hand-heading">
          Select a neighbor's guild card to copy into your tableau:
        </h2>}
      <ul className="Hand-cardList">
        {cards.map(renderCard({
          selectedCardIdx,
          select,
          showHandCallout,
        }))}
      </ul>
    </section>
  );
};

export default Hand;

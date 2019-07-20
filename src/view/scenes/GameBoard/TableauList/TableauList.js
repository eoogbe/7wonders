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
import { getHasTradeChoice } from 'model/selectors/trade';
import { getTableaus } from 'presentation/tableaus';
import './TableauList.css';
import NeighborChooser from './NeighborChooser';
import Tableau from '../Tableau';

const TableauList = () => {
  const [leftNeighborTableau, playerTableau, rightNeighborTableau] =
    useSelector(getTableaus);
  const hasTradeChoice = useSelector(getHasTradeChoice);

  const dispatch = useDispatch();
  const chooseNeighbor = compose(dispatch, actions.chooseNeighbor);
  const showTableauCallout = compose(dispatch, actions.showTableauCallout);

  const leftTableauStyle = {
    width: '33.3%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: '0 1px 1px 0',
  };
  const centerTableauStyle = {
    justifyContent: 'center',
    width: '33.3%',
    borderTop: '1px solid #000',
  };
  const rightTableauStyle = {
    justifyContent: 'flex-end',
    width: '33.3%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: '0 0 1px 1px',
  };

  return (
    <div className="TableauList">
      <Tableau
        {...leftNeighborTableau}
        style={leftTableauStyle}
        showTableauCallout={showTableauCallout}
      />
      {hasTradeChoice && <NeighborChooser chooseNeighbor={chooseNeighbor} />}
      {!hasTradeChoice &&
        <Tableau
          {...playerTableau}
          style={centerTableauStyle}
          showTableauCallout={showTableauCallout}
        />}
      <Tableau
        {...rightNeighborTableau}
        style={rightTableauStyle}
        showTableauCallout={showTableauCallout}
      />
    </div>
  );
};

export default TableauList;

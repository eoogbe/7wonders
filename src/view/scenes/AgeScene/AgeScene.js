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
import { useSelector } from 'react-redux';
import { getAgeText } from 'presentation/ages';
import * as theme from 'view/theme';
import './AgeScene.css';

const AGE_COLORS = {
  'Age I': theme.lightBrown,
  'Age II': theme.lightBlue,
  'Age III': theme.lightPurple,
};

const AgeScene = () => {
  const heading = useSelector(getAgeText);

  const style = { backgroundColor: AGE_COLORS[heading] };
  return (
    <h1 className="AgeScene" style={style}>{heading}</h1>
  );
};

export default AgeScene;

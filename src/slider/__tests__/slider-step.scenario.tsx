/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable react/display-name*/

import * as React from 'react';

import { StatefulSlider } from '..';

export function Scenario() {
  return (
    <div
      style={{
        maxWidth: '500px',
        margin: '64px',
      }}
    >
      <StatefulSlider initialState={{ value: [0] }} step={5} min={-300} max={300} />
    </div>
  );
}

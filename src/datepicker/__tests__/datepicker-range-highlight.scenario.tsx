/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { StatefulDatepicker } from '..';

export function Scenario() {
  return (
    <StatefulDatepicker
      aria-label="Select a date"
      initialState={{ value: [] }}
      range
      highlightedDate={new Date('March 10, 2019')}
    />
  );
}

/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
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
      <StatefulSlider />
    </div>
  );
}

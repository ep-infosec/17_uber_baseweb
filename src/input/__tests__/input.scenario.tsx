/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { StatefulInput, SIZE } from '..';

export function Scenario() {
  return (
    <StatefulInput
      aria-label="stateful input example"
      autoFocus={true}
      initialState={{ value: 'uber' }}
      startEnhancer="@"
      endEnhancer=".com"
      size={SIZE.compact}
      overrides={{ Input: { props: { 'data-e2e': 'input' } } }}
    />
  );
}

/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { FormControl } from '..';
import { StatefulInput } from '../../input';

export function Scenario() {
  return (
    <div>
      <FormControl label="Input label" caption="Input caption">
        <StatefulInput id="one" />
      </FormControl>
      <FormControl label="Input label" caption="Input caption" htmlFor="two">
        <StatefulInput id="two" />
      </FormControl>
      <FormControl label="Input label" caption="Input caption" htmlFor="five">
        <div id="three">
          <StatefulInput id="four" />
          <StatefulInput id="five" />
        </div>
      </FormControl>
    </div>
  );
}

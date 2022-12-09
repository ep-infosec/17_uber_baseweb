/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { StatefulDatepicker } from '..';

export function Scenario() {
  return (
    <StatefulDatepicker
      minDate={new Date(2019, 1, 15)}
      maxDate={new Date(2019, 2, 15)}
      overrides={{
        MonthYearSelectButton: { props: { 'data-id': 'monthYearSelectButton' } },
        MonthYearSelectStatefulMenu: {
          props: {
            overrides: { List: { props: { 'data-id': 'monthYearSelectMenu' } } },
          },
        },
      }}
    />
  );
}

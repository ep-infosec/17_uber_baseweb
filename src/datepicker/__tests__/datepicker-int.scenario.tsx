/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { StatefulDatepicker } from '..';
import { hu } from 'date-fns/locale/index.js';

export function Scenario() {
  return (
    <StatefulDatepicker
      aria-label="Select a date"
      formatString="dd.MM.yyyy"
      placeholder="DD.MM.YYYY"
      mask="99.99.9999"
      locale={hu}
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

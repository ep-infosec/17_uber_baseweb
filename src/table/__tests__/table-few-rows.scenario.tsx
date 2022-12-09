/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Table } from '..';

export function Scenario() {
  return (
    <div style={{ height: '400px', width: '800px' }}>
      <Table
        columns={[...new Array(3)].map(() => 'Column Name')}
        data={[...new Array(4)].map(() => [...new Array(3)].map(() => 'Cell Data'))}
      />
    </div>
  );
}

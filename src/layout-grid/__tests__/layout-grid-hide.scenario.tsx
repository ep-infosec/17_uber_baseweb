/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Grid, Cell } from '..';
import Inner from './inner';

export function Scenario() {
  return (
    <>
      <Grid>
        <Cell span={[2, 4]}>
          <Inner>1A</Inner>
        </Cell>
        <Cell span={[0, 1]}>
          <Inner>1B</Inner>
        </Cell>
      </Grid>
    </>
  );
}

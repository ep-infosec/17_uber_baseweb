/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import Pagination from './pagination';
import StatefulContainer from './stateful-container';
import type { StatefulPaginationProps } from './types';

export default function StatefulPagination({
  numPages,
  initialState,
  stateReducer,
  onPageChange,
  ...props
}: StatefulPaginationProps) {
  return (
    <StatefulContainer
      numPages={numPages}
      initialState={initialState}
      stateReducer={stateReducer}
      onPageChange={onPageChange}
    >
      {/* @ts-ignore */}
      {(renderProps) => <Pagination numPages={numPages} {...renderProps} {...props} />}
    </StatefulContainer>
  );
}

StatefulPagination.defaultProps = {
  initialState: {
    currentPage: 1,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stateReducer: (changeType: any, changes: any) => changes,
  overrides: {},
};

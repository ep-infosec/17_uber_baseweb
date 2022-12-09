/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';

import { SnackbarProvider, useSnackbar } from '..';

function Child() {
  const { enqueue } = useSnackbar();

  return (
    <div>
      <button
        data-testid="queue-one"
        onClick={() =>
          enqueue({
            message: 'one',
            actionMessage: 'perform',
            actionOnClick: () => {},
          })
        }
      >
        queue one
      </button>

      <button
        data-testid="queue-three"
        onClick={() => {
          enqueue({ message: 'one' });
          enqueue({ message: 'two' });
          enqueue({ message: 'three' });
        }}
      >
        queue three
      </button>
    </div>
  );
}

export function Scenario() {
  return (
    <SnackbarProvider overrides={{ Root: { props: { 'data-testid': 'snackbar-root' } } }}>
      <Child />
    </SnackbarProvider>
  );
}

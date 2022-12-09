/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { Button } from '../../button';
import { Drawer, SIZE, ANCHOR } from '..';

export function Scenario() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button
        onClick={() => setIsOpen(true)}
        overrides={{
          BaseButton: {
            props: {
              'data-e2e': 'open-drawer-button',
            },
          },
        }}
      >
        Open Drawer
      </Button>
      <Drawer
        renderAll
        animate={false}
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
        size={SIZE.default}
        anchor={ANCHOR.right}
        overrides={{
          DrawerContainer: { props: { 'data-e2e': 'drawer-container' } },
        }}
      >
        <div data-e2e="drawer-content">
          Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare faucibus ex, non
          facilisis nisl. Maecenas aliquet mauris ut tempus.
        </div>
      </Drawer>
    </React.Fragment>
  );
}

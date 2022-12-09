/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { useStyletron } from '../../styles';
import { Button } from '../../button';
import { StatefulPopover, TRIGGER_TYPE, PLACEMENT } from '..';

export function Scenario() {
  const [css] = useStyletron();
  const [expanded, setExpanded] = React.useState(false);
  return (
    <React.Fragment>
      <div className={css({ display: 'flex', justifyContent: 'center' })}>
        <StatefulPopover
          accessibilityType={'tooltip'}
          autoFocus={false}
          content={() => (
            <div id="e2e-popover">
              <button
                id="e2e-update"
                className={css({ marginRight: '8px' })}
                type="button"
                onClick={() => setExpanded((s) => !s)}
              >
                update
              </button>
              {expanded ? <span id="e2e-expanded">hello world!</span> : 'hello'}
            </div>
          )}
          triggerType={TRIGGER_TYPE.click}
          placement={PLACEMENT.bottom}
        >
          <Button
            overrides={{
              BaseButton: {
                props: { id: 'e2e-open' },
              },
            }}
          >
            Open
          </Button>
        </StatefulPopover>
      </div>
    </React.Fragment>
  );
}

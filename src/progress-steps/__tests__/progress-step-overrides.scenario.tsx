/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { ProgressSteps, Step } from '..';
import { useStyletron } from '../../styles';

export function Scenario() {
  const [current] = React.useState(0);
  const [useCss, theme] = useStyletron();
  return (
    <ProgressSteps current={current}>
      <Step
        title="Create Account"
        overrides={{
          Title: {
            component: function TitleOverride() {
              return <div>TITLE OVERRIDE</div>;
            },
          },
        }}
      >
        <div className={useCss({ ...theme.typography.font400 })}>Here is some step content</div>
      </Step>
    </ProgressSteps>
  );
}

/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { ParagraphSmall } from '../../typography';
import { ProgressBar } from '../../progress-bar';
import { StatefulPopover, TRIGGER_TYPE } from '..';

export function Scenario() {
  return (
    <StatefulPopover
      content={<ParagraphSmall padding="scale500">hello world</ParagraphSmall>}
      accessibilityType={'tooltip'}
      triggerType={TRIGGER_TYPE.hover}
    >
      <ProgressBar value={30} />
    </StatefulPopover>
  );
}

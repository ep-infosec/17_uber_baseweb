/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { StyledLink } from '../../link';
import { Breadcrumbs } from '..';

export function Scenario() {
  return (
    <Breadcrumbs>
      <StyledLink href="#">Parent Page</StyledLink>
      <StyledLink href="#">Sub-Parent Page</StyledLink>
      <span>Current Page</span>
    </Breadcrumbs>
  );
}

/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';

import { FlexGrid, FlexGridItem } from '..';

const itemProps: React.ComponentProps<typeof FlexGridItem> = {
  backgroundColor: 'mono300',
  height: 'scale1000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const wideItemProps: React.ComponentProps<typeof FlexGridItem> = {
  ...itemProps,
  overrides: {
    Block: {
      style: ({ $theme }) => ({
        width: `calc((200% - ${$theme.sizing.scale800}) / 3)`,
      }),
    },
  },
};

export function Scenario() {
  return (
    <FlexGrid flexGridColumnCount={3} flexGridColumnGap="scale800" flexGridRowGap="scale800">
      <FlexGridItem {...wideItemProps}>Wide item</FlexGridItem>
      <FlexGridItem display="none">
        This invisible one is needed so the margins line up
      </FlexGridItem>
      <FlexGridItem {...itemProps}>Item</FlexGridItem>
      <FlexGridItem {...itemProps}>Item</FlexGridItem>
      <FlexGridItem {...itemProps}>Item</FlexGridItem>
      <FlexGridItem {...itemProps}>Item</FlexGridItem>
    </FlexGrid>
  );
}

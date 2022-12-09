// @flow
import * as React from 'react';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';
import {StatefulPopover} from 'baseui/popover';
import {ParagraphSmall} from 'baseui/typography';

export default function Example() {
  return (
    <StatefulPopover
      showArrow
      content={
        <ParagraphSmall padding="scale500">
          hello world
        </ParagraphSmall>
      }
      accessibilityType={'tooltip'}
    >
      <Button>Open</Button>
    </StatefulPopover>
  );
}

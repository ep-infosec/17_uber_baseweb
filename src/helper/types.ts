/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

export type { PopoverProps as Props, StatefulPopoverProps as StatefulProps } from '../popover';

export type HelperStepsProps = {
  index: number;
  length: number;
  onFinish: () => unknown;
  onPrev: () => unknown;
  onNext: () => unknown;
};

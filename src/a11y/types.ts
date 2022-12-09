/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { Result } from 'axe-core';

export type ViolationProps = {
  target: string;
  violations: Result[];
};

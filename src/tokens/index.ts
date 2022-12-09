/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { ColorTokens } from './types';

export { default as colors } from './colors';

export * from './types';
/** @deprecated use ColorTokens instead. To be removed in future versions.*/
export type TokenColors = ColorTokens;

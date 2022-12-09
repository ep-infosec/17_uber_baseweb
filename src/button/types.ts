/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type * as React from 'react';

import type { KIND, SIZE, SHAPE } from './constants';
import type { Override } from '../helpers/overrides';

export type ButtonOverrides = {
  Root?: Override;
  BaseButton?: Override;
  StartEnhancer?: Override;
  EndEnhancer?: Override;
  LoadingSpinnerContainer?: Override;
  LoadingSpinner?: Override;
};

export type CustomColors = {
  backgroundColor: string;
  color: string;
};

export type ButtonProps = {
  children?: React.ReactNode;
  colors?: CustomColors;
  disabled?: boolean;
  /** A helper rendered at the end of the button. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  endEnhancer?: React.ReactNode | React.ComponentType<any>;
  /** Show loading button style and spinner. */
  isLoading?: boolean;
  /** Indicates that the button is selected */
  isSelected?: boolean;
  /** Defines the kind (purpose) of a button */
  kind?: keyof typeof KIND;
  onClick?: (a: React.SyntheticEvent<HTMLButtonElement>) => unknown;
  overrides?: ButtonOverrides;
  /** Defines the shape of the button */
  shape?: keyof typeof SHAPE;
  /** Defines the size of the button */
  size?: keyof typeof SIZE;
  /** A helper rendered at the start of the button. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  startEnhancer?: React.ReactNode | React.ComponentType<any>;
  type?: 'submit' | 'reset' | 'button';
};

export type SharedStyleProps = {
  $colors?: CustomColors;
  $kind?: keyof typeof KIND;
  $isSelected?: boolean;
  $shape?: keyof typeof SHAPE;
  $size?: keyof typeof SIZE;
  $isLoading?: boolean;
  $disabled?: boolean;
  $isFocusVisible?: boolean;
};

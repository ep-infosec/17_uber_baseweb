/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type * as React from 'react';
// eslint-disable-next-line import/no-unresolved
import type { Properties } from 'csstype';
import type { Override } from '../helpers/overrides';
import type { BaseInputProps, StateReducer, State, ADJOINED, SIZE } from '../input';

type SyntheticTextareaEvent = React.SyntheticEvent<HTMLTextAreaElement>;

export type Size = keyof typeof SIZE;

export type SharedStyleProps = {
  $adjoined: keyof typeof ADJOINED;
  $disabled?: boolean;
  $error?: boolean;
  $isFocused?: boolean;
  $isReadOnly?: boolean;
  $positive?: boolean;
  $required?: boolean;
  $resize?: Properties['resize'];
  $size: Size;
};

type BaseTextAreaProps = BaseInputProps<HTMLTextAreaElement>;

export type TextareaOverrides = {
  Root?: Override;
} & BaseTextAreaProps['overrides'];

export type TextareaProps = {
  overrides?: TextareaOverrides;
  resize?: Properties['resize'];
  /** Sets the size and number of visible text lines
   of the textarea element. */
  rows?: number;
  maxLength?: number;
} & BaseTextAreaProps;

export type StatefulContainerProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (props: any) => React.ReactNode;
  initialState?: State;
  stateReducer?: StateReducer;
  onChange?: (e: SyntheticTextareaEvent) => unknown;
  onKeyDown?: (e: SyntheticTextareaEvent) => unknown;
  onKeyPress?: (e: SyntheticTextareaEvent) => unknown;
  onKeyUp?: (e: SyntheticTextareaEvent) => unknown;
};

type OmitProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (props: any) => React.ReactNode;
};

type FullStProps = TextareaProps & StatefulContainerProps;

export type StatefulTextareaProps = Partial<Omit<FullStProps, keyof OmitProps>>;

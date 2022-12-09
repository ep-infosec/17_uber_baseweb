/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { LightTheme } from './light-theme/light-theme';
import { LightThemeMove } from './move-theme/light-theme-with-move';
import { DarkTheme } from './dark-theme/dark-theme';
import { DarkThemeMove } from './move-theme/dark-theme-with-move';
import createDarkTheme from './dark-theme/create-dark-theme';
import createLightTheme from './light-theme/create-light-theme';
import darkThemePrimitives from './dark-theme/primitives';
import lightThemePrimitives from './light-theme/primitives';
import type { Primitives } from './types';
import type { Colors as StyleColors } from '../styles';

export {
  createDarkTheme,
  createLightTheme,
  createLightTheme as createTheme,
  LightTheme,
  LightThemeMove,
  lightThemePrimitives,
  DarkTheme,
  DarkThemeMove,
  darkThemePrimitives,
  DarkTheme as darkThemeOverrides,
};

export * from './types';
/** @deprecated use ColorTokens instead. To be removed in future versions.*/
export type Colors = StyleColors;
/** @deprecated use Primitives instead. To be removed in future versions.*/
export type ThemePrimitives = Primitives;

/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import tint from 'polished/lib/color/tint.js';
import shade from 'polished/lib/color/shade.js';

import { styled, type Theme } from '../styles';
import { KIND, VARIANT, SIZE } from './constants';
import type { SharedPropsArg } from './types';
import { colors as colorTokens } from '../tokens';

export function customOnRamp(color?: string, unit?: string) {
  switch (unit) {
    case '0':
      return 'white';
    case '50':
      // @ts-ignore
      return tint(0.8, color);
    case '100':
      // @ts-ignore
      return tint(0.6, color);
    case '200':
      // @ts-ignore
      return tint(0.4, color);
    case '300':
      // @ts-ignore
      return tint(0.2, color);
    case '400':
      return color;
    case '500':
      // @ts-ignore
      return shade(0.2, color);
    case '600':
      // @ts-ignore
      return shade(0.4, color);
    case '700':
      // @ts-ignore
      return shade(0.6, color);
    case '800':
      // @ts-ignore
      return shade(0.8, color);
    case '1000':
      return 'black';
    default:
      return color;
  }
}

const COLOR_STATE = {
  disabled: 'disabled',
  solid: 'solid',
  outline: 'outline',
} as const;

// Probably best to bake this into the theme once we hit our next major.
// @ts-ignore
const pick = (theme, light, dark) => (theme.name && theme.name.includes('dark') ? dark : light);

const neutralColorStates = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.disabled]: (theme, color) => ({
    color: theme.colors.tagNeutralFontDisabled,
    // @ts-ignore
    backgroundColor: null,
    borderColor: theme.colors.tagNeutralOutlinedDisabled,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.solid]: (theme, color) => ({
    color: theme.colors.tagNeutralSolidFont,
    backgroundColor: theme.colors.tagNeutralSolidBackground,
    // @ts-ignore
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.outline]: (theme, color) => ({
    color: theme.colors.tagNeutralOutlinedFont,
    // @ts-ignore
    backgroundColor: null,
    borderColor: theme.colors.tagNeutralOutlinedBackground,
  }),
};

const primaryColorStates = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.disabled]: (theme, color) => ({
    color: theme.colors.tagPrimaryFontDisabled,
    // @ts-ignore
    backgroundColor: null,
    borderColor: theme.colors.tagPrimaryOutlinedDisabled,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.solid]: (theme, color) => ({
    color: theme.colors.tagPrimarySolidFont,
    backgroundColor: theme.colors.tagPrimarySolidBackground,
    // @ts-ignore
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.outline]: (theme, color) => ({
    color: theme.colors.tagPrimaryOutlinedFont,
    // @ts-ignore
    backgroundColor: null,
    borderColor: theme.colors.tagPrimaryOutlinedBackground,
  }),
};

const accentColorStates = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.disabled]: (theme, color) => ({
    color: theme.colors.tagAccentFontDisabled,
    // @ts-ignore
    backgroundColor: null,
    borderColor: theme.colors.tagAccentOutlinedDisabled,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.solid]: (theme, color) => ({
    color: theme.colors.tagAccentSolidFont,
    backgroundColor: theme.colors.tagAccentSolidBackground,
    // @ts-ignore
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.outline]: (theme, color) => ({
    color: theme.colors.tagAccentOutlinedFont,
    // @ts-ignore
    backgroundColor: null,
    borderColor: theme.colors.tagAccentOutlinedBackground,
  }),
};

const positiveColorStates = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.disabled]: (theme, color) => ({
    color: theme.colors.tagPositiveFontDisabled,
    // @ts-ignore
    backgroundColor: null,
    borderColor: theme.colors.tagPositiveOutlinedDisabled,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.solid]: (theme, color) => ({
    color: theme.colors.tagPositiveSolidFont,
    backgroundColor: theme.colors.tagPositiveSolidBackground,
    // @ts-ignore
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.outline]: (theme, color) => ({
    color: theme.colors.tagPositiveOutlinedFont,
    // @ts-ignore
    backgroundColor: null,
    borderColor: theme.colors.tagPositiveOutlinedBackground,
  }),
};

const warningColorStates = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.disabled]: (theme, color) => ({
    color: theme.colors.tagWarningFontDisabled,
    // @ts-ignore
    backgroundColor: null,
    borderColor: theme.colors.tagWarningOutlinedDisabled,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.solid]: (theme, color) => ({
    color: theme.colors.tagWarningSolidFont,
    backgroundColor: theme.colors.tagWarningSolidBackground,
    // @ts-ignore
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.outline]: (theme, color) => ({
    color: theme.colors.tagWarningOutlinedFont,
    // @ts-ignore
    backgroundColor: null,
    borderColor: theme.colors.tagWarningOutlinedBackground,
  }),
};

const negativeColorStates = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.disabled]: (theme, color) => ({
    color: theme.colors.tagNegativeFontDisabled,
    // @ts-ignore
    backgroundColor: null,
    borderColor: theme.colors.tagNegativeOutlinedDisabled,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.solid]: (theme, color) => ({
    color: theme.colors.tagNegativeSolidFont,
    backgroundColor: theme.colors.tagNegativeSolidBackground,
    // @ts-ignore
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.outline]: (theme, color) => ({
    color: theme.colors.tagNegativeOutlinedFont,
    // @ts-ignore
    backgroundColor: null,
    borderColor: theme.colors.tagNegativeOutlinedBackground,
  }),
};

const orangeColorStates = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.disabled]: (theme, color) => ({
    color: pick(theme, colorTokens.orange200, colorTokens.orange600),
    // @ts-ignore
    backgroundColor: null,
    borderColor: pick(theme, colorTokens.orange200, colorTokens.orange700),
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.solid]: (theme, color) => ({
    color: colorTokens.white,
    backgroundColor: pick(theme, colorTokens.orange400, colorTokens.orange500),
    // @ts-ignore
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.outline]: (theme, color) => ({
    color: pick(theme, colorTokens.orange400, colorTokens.orange300),
    // @ts-ignore
    backgroundColor: null,
    borderColor: pick(theme, colorTokens.orange200, colorTokens.orange500),
  }),
};

const purpleColorStates = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.disabled]: (theme, color) => ({
    color: pick(theme, colorTokens.purple200, colorTokens.purple600),
    // @ts-ignore
    backgroundColor: null,
    borderColor: pick(theme, colorTokens.purple200, colorTokens.purple700),
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.solid]: (theme, color) => ({
    color: colorTokens.white,
    backgroundColor: pick(theme, colorTokens.purple400, colorTokens.purple500),
    // @ts-ignore
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.outline]: (theme, color) => ({
    color: pick(theme, colorTokens.purple400, colorTokens.purple300),
    // @ts-ignore
    backgroundColor: null,
    borderColor: pick(theme, colorTokens.purple200, colorTokens.purple500),
  }),
};

const brownColorStates = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.disabled]: (theme, color) => ({
    color: pick(theme, colorTokens.brown200, colorTokens.brown600),
    // @ts-ignore
    backgroundColor: null,
    borderColor: pick(theme, colorTokens.brown200, colorTokens.brown700),
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.solid]: (theme, color) => ({
    color: colorTokens.white,
    backgroundColor: pick(theme, colorTokens.brown400, colorTokens.brown500),
    // @ts-ignore
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.outline]: (theme, color) => ({
    color: pick(theme, colorTokens.brown400, colorTokens.brown300),
    // @ts-ignore
    backgroundColor: null,
    borderColor: pick(theme, colorTokens.brown200, colorTokens.brown500),
  }),
};

const customColorStates = {
  // @ts-ignore
  [COLOR_STATE.disabled]: (theme, color) => ({
    color: customOnRamp(color, theme.colors.tagFontDisabledRampUnit),
    // @ts-ignore
    backgroundColor: null,
    borderColor: customOnRamp(color, theme.colors.tagSolidDisabledRampUnit),
  }),
  // @ts-ignore
  [COLOR_STATE.solid]: (theme, color) => ({
    color: customOnRamp(color, theme.colors.tagSolidFontRampUnit),
    backgroundColor: customOnRamp(color, theme.colors.tagSolidRampUnit),
    // @ts-ignore
    borderColor: null,
  }),
  // @ts-ignore
  [COLOR_STATE.outline]: (theme, color) => ({
    color: customOnRamp(color, theme.colors.tagOutlinedFontRampUnit),
    // @ts-ignore
    backgroundColor: null,
    borderColor: customOnRamp(color, theme.colors.tagOutlinedRampUnit),
  }),
};

const colorMap = {
  [KIND.neutral]: neutralColorStates,
  [KIND.primary]: primaryColorStates,
  [KIND.accent]: accentColorStates,
  [KIND.positive]: positiveColorStates,
  [KIND.warning]: warningColorStates,
  [KIND.negative]: negativeColorStates,
  [KIND.black]: primaryColorStates,
  [KIND.blue]: accentColorStates,
  [KIND.green]: positiveColorStates,
  [KIND.red]: negativeColorStates,
  [KIND.yellow]: warningColorStates,
  [KIND.orange]: orangeColorStates,
  [KIND.purple]: purpleColorStates,
  [KIND.brown]: brownColorStates,
  [KIND.custom]: customColorStates,
};

// @ts-ignore
const getColorStateFromProps = (props) => {
  if (props.$disabled) return COLOR_STATE.disabled;
  if (props.$variant === VARIANT.solid) return COLOR_STATE.solid;
  return COLOR_STATE.outline;
};

export const Action = styled<'span', SharedPropsArg>(
  'span',
  (
    props: SharedPropsArg & {
      $theme: Theme;
    }
  ) => {
    const { $theme, $disabled, $size = SIZE.small } = props;
    const bottomRadiusDir: string =
      $theme.direction === 'rtl' ? 'borderBottomLeftRadius' : 'borderBottomRightRadius';
    const topRadiusDir: string =
      $theme.direction === 'rtl' ? 'borderTopLeftRadius' : 'borderTopRightRadius';
    const marginDir: string = $theme.direction === 'rtl' ? 'marginRight' : 'marginLeft';
    return {
      alignItems: 'center',
      [bottomRadiusDir]: $theme.borders.useRoundedCorners ? $theme.borders.radius400 : 0,
      [topRadiusDir]: $theme.borders.useRoundedCorners ? $theme.borders.radius400 : 0,
      cursor: $disabled ? 'not-allowed' : 'pointer',
      display: 'flex',
      [marginDir]: {
        [SIZE.small]: '8px',
        [SIZE.medium]: '12px',
        [SIZE.large]: '16px',
      }[$size],
      outline: 'none',
      transitionProperty: 'all',
      transitionDuration: 'background-color',
      transitionTimingFunction: $theme.animation.easeOutCurve,
    };
  }
);

Action.displayName = 'Action';

export const StartEnhancerContainer = styled<'div', SharedPropsArg>(
  'div',
  ({
    $theme,
    $size = SIZE.small,
  }: SharedPropsArg & {
    $theme: Theme;
  }) => {
    let paddingMagnitude = $theme.sizing.scale300;
    if ($size === SIZE.medium) {
      paddingMagnitude = $theme.sizing.scale400;
    } else if ($size === SIZE.large) {
      paddingMagnitude = $theme.sizing.scale600;
    }

    const paddingDir: string = $theme.direction === 'rtl' ? 'paddingLeft' : 'paddingRight';

    return {
      alignItems: 'center',
      display: 'flex',
      [paddingDir]: paddingMagnitude,
    };
  }
);

StartEnhancerContainer.displayName = 'StartEnhancerContainer';

export const Text = styled<'span', SharedPropsArg>(
  'span',
  (
    props: SharedPropsArg & {
      $theme: Theme;
    }
  ) => {
    const { $theme } = props;

    return {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      maxWidth: props.$theme.sizing.scale3200,
      order: $theme.direction === 'rtl' ? 1 : 0,
    };
  }
);

Text.displayName = 'Text';

export const Root = styled<'span', SharedPropsArg>(
  'span',
  (
    props: SharedPropsArg & {
      $theme: Theme;
    }
  ) => {
    const {
      $theme,
      $kind = KIND.primary,
      $clickable,
      $variant,
      $disabled,
      $closeable,
      $isFocusVisible,
      $color,
      $size = SIZE.small,
    } = props;
    const borderRadius = $theme.borders.tagBorderRadius;
    const paddingMagnitude = {
      [SIZE.small]: $theme.sizing.scale300,
      [SIZE.medium]: $theme.sizing.scale500,
      [SIZE.large]: $theme.sizing.scale600,
    }[$size];
    const borderWidth = !$disabled && $variant === VARIANT.solid ? 0 : '2px';
    // @ts-ignore
    const { color, backgroundColor, borderColor } = colorMap[$kind][getColorStateFromProps(props)](
      $theme,
      $color
    );
    return {
      ...{
        [SIZE.small]: $theme.typography.LabelSmall,
        [SIZE.medium]: $theme.typography.LabelMedium,
        [SIZE.large]: $theme.typography.LabelLarge,
      }[$size],
      alignItems: 'center',
      color,
      backgroundColor,
      borderLeftColor: borderColor,
      borderRightColor: borderColor,
      borderTopColor: borderColor,
      borderBottomColor: borderColor,
      borderLeftStyle: 'solid',
      borderRightStyle: 'solid',
      borderTopStyle: 'solid',
      borderBottomStyle: 'solid',
      borderLeftWidth: borderWidth,
      borderRightWidth: borderWidth,
      borderTopWidth: borderWidth,
      borderBottomWidth: borderWidth,
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
      borderBottomLeftRadius: borderRadius,
      boxSizing: 'border-box',
      cursor: $disabled ? 'not-allowed' : $clickable ? 'pointer' : 'default',
      display: 'inline-flex',
      height: {
        [SIZE.small]: '24px',
        [SIZE.medium]: '32px',
        [SIZE.large]: '40px',
      }[$size],
      justifyContent: 'space-between',
      marginTop: '5px',
      marginBottom: '5px',
      marginLeft: '5px',
      marginRight: '5px',
      paddingTop: $theme.sizing.scale0,
      paddingBottom: $theme.sizing.scale0,
      paddingLeft: paddingMagnitude,
      paddingRight: paddingMagnitude,
      outline: 'none',
      ':hover':
        $disabled || !$clickable
          ? {}
          : {
              boxShadow: `inset 0px 0px 100px ${pick(
                $theme,
                `rgba(0, 0, 0, 0.08)`,
                `rgba(255, 255, 255, 0.2)`
              )}`,
            },
      ':focus':
        $disabled || (!$clickable && !$closeable)
          ? {}
          : {
              boxShadow: $isFocusVisible
                ? `0 0 0 3px ${
                    $kind === KIND.accent ? $theme.colors.primaryA : $theme.colors.accent
                  }`
                : 'none',
            },
    };
  }
);
Root.displayName = 'Root';

/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { styled, hexToRgb, withWrapper } from '../styles';
import type { SharedProps } from './types';

export const StyledRoot = styled<'nav', SharedProps>('nav', (props) => {
  const {
    $theme: { colors, typography },
  } = props;
  return {
    ...typography.font300,
    color: colors.contentPrimary,
    listStyleType: 'none',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  };
});

StyledRoot.displayName = 'StyledRoot';

export const StyledNavItemContainer = styled('li', {});

StyledNavItemContainer.displayName = 'StyledNavItemContainer';

export const StyledNavLink = styled<
  'a',
  {
    $isFocusVisible: boolean;
  }
>('a', ({ $theme, $isFocusVisible }) => ({
  color: 'inherit',
  outline: 'none',
  textDecoration: 'none',
  ':focus > div': $isFocusVisible
    ? {
        outline: `3px solid ${$theme.colors.accent}`,
        outlineOffset: '-3px',
        borderLeftColor: 'transparent',
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
      }
    : { outline: 'none' },
}));

StyledNavLink.displayName = 'StyledNavLink';

// @ts-ignore
export const StyledNavItemElement = styled<'div', SharedProps>('div', (props) => {
  const {
    $active,
    $selectable,
    $level,
    $disabled,
    $theme,
    $theme: { colors, sizing },
  } = props;
  const bgImgGradient = hexToRgb(colors.backgroundPrimary, '0.92') || '';
  const borderWidthDir: string =
    $theme.direction === 'rtl' ? 'borderRightWidth' : 'borderLeftWidth';
  const borderStyleDir: string =
    $theme.direction === 'rtl' ? 'borderRightStyle' : 'borderLeftStyle';
  const borderColorDir: string =
    $theme.direction === 'rtl' ? 'borderRightColor' : 'borderLeftColor';
  const paddingPrefixDir: string = $theme.direction === 'rtl' ? 'paddingRight' : 'paddingLeft';
  const paddingSuffixDir: string = $theme.direction === 'rtl' ? 'paddingLeft' : 'paddingRight';

  let cursor = $selectable ? 'pointer' : 'default';
  let color = $active ? colors.primary : null;
  let hoverColor = $selectable ? colors.primary : null;

  if ($disabled) {
    cursor = 'not-allowed';
    color = colors.contentSecondary;
    hoverColor = null;
  }

  return {
    backgroundColor: $active ? colors.backgroundInversePrimary : 'transparent',
    backgroundImage: $active ? `linear-gradient(0deg, ${bgImgGradient}, ${bgImgGradient})` : null,
    boxSizing: 'border-box',
    [borderWidthDir]: '4px',
    [borderStyleDir]: 'solid',
    [borderColorDir]: $active ? colors.primary : 'transparent',
    color,
    cursor,

    paddingTop: sizing.scale500,
    paddingBottom: sizing.scale500,
    [paddingPrefixDir]: `calc(${sizing.scale800} * ${$level})`,
    [paddingSuffixDir]: sizing.scale500,
    ':hover': {
      color: hoverColor,
    },
    ':focus': {
      color: $selectable ? colors.primary : null,
    },
  };
});

StyledNavItemElement.displayName = 'StyledNavItemElement';

// @ts-ignore
export const StyledNavItem = withWrapper<typeof StyledNavItemElement, { item? }>(
  StyledNavItemElement,
  (Styled) =>
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function StyledNav({ item, ...restProps }) {
      return <Styled {...restProps} />;
    }
);

export const StyledSubNavContainer = styled('ul', {
  listStyleType: 'none',
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,
});
StyledSubNavContainer.displayName = 'StyledSubNavContainer';

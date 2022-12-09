/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable import/prefer-default-export */
import { ARROW_SIZE, PLACEMENT } from './constants';
import type { Offset, PopoverPlacement } from './types';

const OPPOSITE_POSITIONS = {
  top: 'bottom',
  bottom: 'top',
  right: 'left',
  left: 'right',
} as const;

/**
 * Returns the opposite of the specified position. Useful for tooltip
 * positioning logic.
 * Examples:
 * top -> bottom
 * left -> right
 */
export function getOppositePosition(position: string): string {
  // @ts-ignore
  return OPPOSITE_POSITIONS[position];
}

/**
 * Determines whether or not the specified position is a vertical one (top or bottom)
 */
export function isVerticalPosition(position: string): boolean {
  return position === 'top' || position === 'bottom';
}

/**
 * Simple utility function for capitalizing the first letter of a string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Opposite of function above, converts from Popper.js placement
 * to our placement prop
 */
export function fromPopperPlacement(placement: string): PopoverPlacement | null {
  const popoverPlacement: string = placement
    .replace(/(top|bottom)-start$/, '$1Left')
    .replace(/(top|bottom)-end$/, '$1Right')
    .replace(/(left|right)-start$/, '$1Top')
    .replace(/(left|right)-end$/, '$1Bottom');
  // @ts-ignore
  return PLACEMENT[popoverPlacement] || null;
}

/**
 * Splits something like 'topLeft' to ['top', 'left'] for easier usage
 */
export function splitPlacement(placement: PopoverPlacement): string[] {
  const matches = placement.match(/^([a-z]+)([A-Z][a-z]+)?/) || [];
  return (matches as string[])
    .slice(1, 3)
    .filter(Boolean)
    .map((s) => s.toLowerCase());
}

/**
 * Returns margin styles to add spacing between the popover
 * and its anchor.
 */
export function getPopoverMarginStyles(
  arrowSize: number,
  placement: PopoverPlacement,
  popoverMargin: number
) {
  const [position] = splitPlacement(placement);
  const opposite = getOppositePosition(position);
  if (!opposite) {
    return null;
  }
  const property = `margin${capitalize(opposite)}`;
  return {
    [property]: `${arrowSize + popoverMargin}px`,
  };
}

/**
 * Returns CSS rules for the popover animation start keyframe
 */
export function getStartPosition(
  offset: Offset,
  placement: PopoverPlacement,
  arrowSize: number,
  popoverMargin: number
) {
  offset = { ...offset };
  const [position] = splitPlacement(placement);
  const margin = (arrowSize > 0 ? arrowSize : popoverMargin) * 2;
  if (isVerticalPosition(position)) {
    offset.top += position === 'top' ? margin : -margin;
  } else {
    offset.left += position === 'left' ? margin : -margin;
  }
  return `translate3d(${offset.left}px, ${offset.top}px, 0)`;
}

/**
 * Returns CSS rules for the popover animation end keyframe
 */
export function getEndPosition(offset: Offset) {
  return `translate3d(${offset.left}px, ${offset.top}px, 0)`;
}

/**
 * Returns top/left styles to position the popover arrow
 */
export function getArrowPositionStyles(offsets: Offset, placement: PopoverPlacement) {
  const [position] = splitPlacement(placement);
  const oppositePosition = getOppositePosition(position);
  if (!oppositePosition) {
    return null;
  }

  const alignmentProperty: string = isVerticalPosition(position) ? 'left' : 'top';
  return {
    // @ts-ignore
    [alignmentProperty]: `${offsets[alignmentProperty]}px`,
    [oppositePosition]: `-${ARROW_SIZE - 2}px`,
  };
}

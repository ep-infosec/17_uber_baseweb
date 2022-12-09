/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { useStyletron } from '../styles';
import PinHead from './pin-head';
import { getOverrides } from '../helpers/overrides';
import {
  StyledFloatingMarkerRoot,
  StyledFloatingMarkerAnchorContainer,
  StyledFloatingMarkerPinHeadContainer,
} from './styled-components';
import type { FloatingMarkerProps } from './types';
import {
  FLOATING_MARKER_ANCHOR_POSITIONS,
  PINHEAD_SIZES_SHAPES,
  PINHEAD_TYPES,
  FLOATING_MARKER_ANCHOR_TYPES,
  PINHEAD_DIMENSIONS,
} from './constants';

// @ts-ignore
function getAnchorPinHeadSize(anchorType) {
  if (anchorType === FLOATING_MARKER_ANCHOR_TYPES.circle) {
    return PINHEAD_SIZES_SHAPES.xSmallCircle;
  } else if (anchorType === FLOATING_MARKER_ANCHOR_TYPES.square) {
    return PINHEAD_SIZES_SHAPES.xSmallSquare;
  } else if (anchorType === FLOATING_MARKER_ANCHOR_TYPES.xxSmallSquare) {
    return PINHEAD_SIZES_SHAPES.xxSmallSquare;
  } else {
    return PINHEAD_SIZES_SHAPES.xxSmallCircle;
  }
}

const FloatingMarker = ({
  label,
  secondaryLabel,
  size = PINHEAD_SIZES_SHAPES.medium,
  anchor = FLOATING_MARKER_ANCHOR_POSITIONS.bottomLeft,
  endEnhancer,
  startEnhancer,
  anchorType = FLOATING_MARKER_ANCHOR_TYPES.circle,
  overrides = {},
}: FloatingMarkerProps) => {
  const [, theme] = useStyletron();
  const {
    colors: { backgroundPrimary, backgroundInversePrimary, primaryA, primaryB },
  } = theme;

  const anchorPinHeadSize = getAnchorPinHeadSize(anchorType);

  const [Root, rootProps] = getOverrides(overrides.Root, StyledFloatingMarkerRoot);
  const [FloatingMarkerPinHeadContainer, floatingMarkerPinHeadContainerProps] = getOverrides(
    overrides.PinHeadContainer,
    StyledFloatingMarkerPinHeadContainer
  );

  const [FloatingMarkerAnchorContainer, floatingMarkerAnchorContainerProps] = getOverrides(
    overrides.AnchorContainer,
    StyledFloatingMarkerAnchorContainer
  );

  return (
    <Root
      data-baseweb="floating-map-marker"
      $size={PINHEAD_DIMENSIONS[anchorPinHeadSize].height}
      {...rootProps}
    >
      <FloatingMarkerPinHeadContainer
        $anchor={anchor}
        $anchorSize={PINHEAD_DIMENSIONS[anchorPinHeadSize].height}
        {...floatingMarkerPinHeadContainerProps}
      >
        <PinHead
          size={size}
          color={primaryA}
          background={backgroundPrimary}
          type={PINHEAD_TYPES.floating}
          label={label}
          secondaryLabel={secondaryLabel}
          startEnhancer={startEnhancer}
          endEnhancer={endEnhancer}
          overrides={overrides}
        />
      </FloatingMarkerPinHeadContainer>
      {anchor !== FLOATING_MARKER_ANCHOR_POSITIONS.none && (
        <FloatingMarkerAnchorContainer {...floatingMarkerAnchorContainerProps}>
          <PinHead
            size={anchorPinHeadSize}
            color={primaryB}
            background={backgroundInversePrimary}
            type={PINHEAD_TYPES.fixed}
            overrides={overrides}
          />
        </FloatingMarkerAnchorContainer>
      )}
    </Root>
  );
};

export default FloatingMarker;

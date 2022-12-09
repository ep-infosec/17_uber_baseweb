/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* global window */
import * as React from 'react';
import { SIZE } from './constants';
import {
  StyledProgressBarRoundedRoot,
  StyledProgressBarRoundedSvg,
  StyledProgressBarRoundedTrackBackground,
  StyledProgressBarRoundedTrackForeground,
  StyledProgressBarRoundedText,
} from './styled-components';
import { useOverrides } from '../helpers/overrides';
import type { ProgressBarRoundedProps } from './types';

const defaults = {
  Root: StyledProgressBarRoundedRoot,
  Svg: StyledProgressBarRoundedSvg,
  TrackBackground: StyledProgressBarRoundedTrackBackground,
  TrackForeground: StyledProgressBarRoundedTrackForeground,
  Text: StyledProgressBarRoundedText,
};

// @ts-ignore
function roundTo(n, digits?) {
  if (digits === undefined) {
    digits = 0;
  }
  const multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  const test = Math.round(n) / multiplicator;
  return +test.toFixed(digits);
}

function ProgressBarRounded({
  progress = 0,
  size = SIZE.medium,
  animate = true,
  inline = false,
  overrides = {},
  ...restProps
}: ProgressBarRoundedProps) {
  const {
    Root: [Root, rootProps],
    Svg: [Svg, svgProps],
    TrackBackground: [TrackBackground, trackBackgroundProps],
    TrackForeground: [TrackForeground, trackForegroundProps],
    Text: [Text, textProps],
  } = useOverrides(defaults, overrides);

  // Get path length after initial render
  const [pathLength, setPathLength] = React.useState(0);
  const pathRef = React.useRef<SVGPathElement>();
  React.useEffect(() => {
    if (pathRef.current && pathRef.current.getTotalLength) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  // Animation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const animationFrameRef = React.useRef<any>();
  const [pathProgress, setPathProgress] = React.useState(0);
  React.useEffect(() => {
    if (!animate) {
      setPathProgress(progress);
      return;
    }
    if (window && animationFrameRef.current) {
      window.cancelAnimationFrame(animationFrameRef.current);
    }
    let animationDuration = Math.max(1000 * (progress - pathProgress), 250);
    // @ts-ignore
    let animationTimeStarted;
    function loop(now = 0) {
      // @ts-ignore
      if (!animationTimeStarted) {
        animationTimeStarted = now;
      }
      // @ts-ignore
      let animationTimeElapsed = now - animationTimeStarted;
      // Move out of state - might need to reverse calculate the path progress for interruped animations
      let currentPathProgress = Math.min(
        (progress - pathProgress) * (animationTimeElapsed / animationDuration) + pathProgress,
        1
      );
      currentPathProgress = Math.max(currentPathProgress, 0);
      setPathProgress(currentPathProgress);
      if (animationTimeElapsed <= animationDuration) {
        animationFrameRef.current = window.requestAnimationFrame(loop);
      }
    }
    loop();
  }, [progress]); // We want *only* `progress` to trigger this effect

  return (
    <Root
      data-baseweb="progressbar-rounded"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={1}
      $size={size}
      $inline={inline}
      {...restProps}
      {...rootProps}
    >
      <Svg $size={size} {...restProps} {...svgProps}>
        <TrackBackground $size={size} {...trackBackgroundProps} />

        <TrackForeground
          ref={pathRef}
          $size={size}
          $visible={!!pathRef.current}
          $pathLength={pathLength}
          $pathProgress={pathProgress}
          {...trackForegroundProps}
        />
      </Svg>

      <Text $size={size} {...textProps}>
        {roundTo(Math.min(progress * 100, 100))}%
      </Text>
    </Root>
  );
}

export default ProgressBarRounded;

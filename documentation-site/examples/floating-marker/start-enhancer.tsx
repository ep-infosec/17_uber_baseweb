import * as React from 'react';
import {
  FloatingMarker,
  FLOATING_MARKER_ANCHOR_POSITIONS,
} from 'baseui/map-marker';
import {Search} from 'baseui/icon';

export default function Example() {
  return (
    <FloatingMarker
      label="Uber Cafe"
      anchor={FLOATING_MARKER_ANCHOR_POSITIONS.bottomRight}
      startEnhancer={({size}: {size: number}) => (
        <Search size={size} />
      )}
    />
  );
}

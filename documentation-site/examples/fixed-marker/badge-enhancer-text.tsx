import * as React from 'react';
import {FixedMarker, BADGE_ENHANCER_SIZES} from 'baseui/map-marker';
import {Show} from 'baseui/icon';

export default function Example() {
  return (
    <div>
      <FixedMarker
        startEnhancer={({size}) => <Show size={size} />}
        badgeEnhancerSize={BADGE_ENHANCER_SIZES.mediumText}
        badgeEnhancerContent={() => <>New</>}
        overrides={{
          BadgeEnhancer: {
            style: {
              backgroundColor: 'green',
            },
          },
        }}
      />
    </div>
  );
}

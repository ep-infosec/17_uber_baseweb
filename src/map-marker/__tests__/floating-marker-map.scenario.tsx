/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { FloatingMarker } from '..';
import { FLOATING_MARKER_ANCHOR_POSITIONS, FLOATING_MARKER_ANCHOR_TYPES } from '../constants';
import TileGrid from './tile-grid';
import { Checkbox, LABEL_PLACEMENT } from '../../checkbox';
import { Input } from '../../input';
import Upload from '../../icon/upload';
import Search from '../../icon/search';
import { Select } from '../../select';
import ReactMapGL, { Marker } from 'react-map-gl';
import { Button } from '../../button';
import { useStyletron } from '../../styles';
import { getMapStyle } from './map-style';

const floatingMarkerAnchorTypes = Object.keys(FLOATING_MARKER_ANCHOR_TYPES)
  .map((key) => FLOATING_MARKER_ANCHOR_TYPES[key])
  .map((x) => ({
    label: x,
    id: x,
  }));

const floatingMarkerAnchorPositions = Object.keys(FLOATING_MARKER_ANCHOR_POSITIONS)
  .map((key) => FLOATING_MARKER_ANCHOR_POSITIONS[key])
  .map((x) => ({
    label: x,
    id: x,
  }));

const uberHq = {
  latitude: 37.768495131168336,
  longitude: -122.38856031220648,
};

const defaultLocation = [uberHq.longitude, uberHq.latitude] as [number, number];

export function Scenario() {
  const [label, setLabel] = React.useState('Uber HQ');
  const [secondaryLabel, setSecondaryLabel] = React.useState('');
  const [startEnhancer, setStartEnhancer] = React.useState(true);
  const [endEnhancer, setEndEnhancer] = React.useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [floatingMarkerAnchorType, setFloatingMarkerAnchorType] = React.useState<any>([
    floatingMarkerAnchorTypes[0],
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [floatingMarkerAnchorPosition, setFloatingMarkerAnchorPosition] = React.useState<any>([
    floatingMarkerAnchorPositions[0],
  ]);

  const [locations, setLocations] = React.useState([defaultLocation]);

  const [showPointDebug, setShowPointDebug] = React.useState(true);

  const [viewport, setViewport] = React.useState({
    ...uberHq,
    zoom: 14,
  });

  const requiresAlignment =
    floatingMarkerAnchorPosition[0].id !== FLOATING_MARKER_ANCHOR_POSITIONS.none;

  const [css, theme] = useStyletron();

  const mapStyle = getMapStyle(locations, { showPointDebug });

  return (
    <>
      <TileGrid
        cols={7}
        customizerOptions={[
          <Input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Label"
            clearOnEscape
            key="label"
          />,
          <Input
            value={secondaryLabel}
            onChange={(e) => setSecondaryLabel(e.target.value)}
            placeholder="Secondary Label"
            clearOnEscape
            key="secondary-label"
          />,
          <Checkbox
            checked={startEnhancer}
            onChange={(e) => setStartEnhancer(e.target.checked)}
            labelPlacement={LABEL_PLACEMENT.right}
            key="start-endhancer"
          >
            Start enhancer
          </Checkbox>,
          <Checkbox
            checked={endEnhancer}
            onChange={(e) => setEndEnhancer(e.target.checked)}
            labelPlacement={LABEL_PLACEMENT.right}
            key="end-enhancer"
          >
            End enhancer
          </Checkbox>,
          <Select
            options={floatingMarkerAnchorTypes}
            value={floatingMarkerAnchorType}
            placeholder="Select an anchor type"
            onChange={(params) => setFloatingMarkerAnchorType(params.value)}
            key="anchor-type"
          />,
          <Select
            options={floatingMarkerAnchorPositions}
            value={floatingMarkerAnchorPosition}
            placeholder="Select an anchor position"
            onChange={(params) => setFloatingMarkerAnchorPosition(params.value)}
            key="anchor-position"
          />,
          <Button onClick={() => setLocations([])} key="clear-markers">
            Clear markers
          </Button>,
          <Checkbox
            checked={showPointDebug}
            onChange={(e) => setShowPointDebug(e.target.checked)}
            labelPlacement={LABEL_PLACEMENT.right}
            key="point-debug"
          >
            Show point debug
          </Checkbox>,
        ]}
      />
      <div className={css({ backgroundColor: theme.colors.backgroundLightAccent })}>
        <ReactMapGL
          {...viewport}
          width="100%"
          height="760px"
          onViewportChange={(viewport) => setViewport(viewport)}
          mapStyle={mapStyle}
          onClick={({ lngLat }) => setLocations((existing) => [...existing, lngLat])}
        >
          {locations.map((x, i) => (
            <Marker latitude={x[1]} longitude={x[0]} key={i}>
              <FloatingMarker
                overrides={{
                  Root: {
                    style: () =>
                      requiresAlignment
                        ? {
                            transform: `translate(-50%, -50%)`,
                          }
                        : {},
                  },
                }}
                anchorType={floatingMarkerAnchorType[0].id}
                label={label}
                secondaryLabel={secondaryLabel}
                startEnhancer={
                  startEnhancer
                    ? function renderEnhancer({ size }) {
                        return <Upload size={size} />;
                      }
                    : undefined
                }
                endEnhancer={
                  endEnhancer
                    ? function renderEnhancer({ size }) {
                        return <Search size={size} />;
                      }
                    : undefined
                }
                anchor={floatingMarkerAnchorPosition[0].id}
              />
            </Marker>
          ))}
        </ReactMapGL>
      </div>
    </>
  );
}

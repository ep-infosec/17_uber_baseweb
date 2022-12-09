/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import ReactMapGL, { Marker } from 'react-map-gl';
import { useStyletron } from '../../styles';
import * as React from 'react';
import { LOCATION_PUCK_SIZES, LOCATION_PUCK_TYPES } from '../constants';
import TileGrid from './tile-grid';
import { Slider } from '../../slider';
import { Select } from '../../select';
import { Checkbox, LABEL_PLACEMENT } from '../../checkbox';

import { LocationPuck } from '..';

const locationPuckSizes = Object.keys(LOCATION_PUCK_SIZES)
  .map((key) => LOCATION_PUCK_SIZES[key])
  .map((x) => ({
    id: x,
    label: x,
  }));

const locationPuckTypes = Object.keys(LOCATION_PUCK_TYPES)
  .map((key) => LOCATION_PUCK_TYPES[key])
  .map((x) => ({
    label: x,
    id: x,
  }));

const uberHq = {
  latitude: 37.768495131168336,
  longitude: -122.38856031220648,
};

const defaultLocation = [uberHq.longitude, uberHq.latitude];

export function Scenario() {
  const [confidenceRadius, setConfidenceRadius] = React.useState([0]);
  const [heading, setHeading] = React.useState([0]);
  const [size, setSize] = React.useState([locationPuckSizes[0]]);
  const [type, setType] = React.useState([locationPuckTypes[0]]);
  const [locations, setLocations] = React.useState([defaultLocation]);
  const [showHeading, setShowHeading] = React.useState(true);

  const [viewport, setViewport] = React.useState({
    ...uberHq,
    zoom: 14,
  });
  const [css, theme] = useStyletron();

  const onMarkerDragEnd = React.useCallback((event, index) => {
    setLocations((l) => {
      const copy = JSON.parse(JSON.stringify(l));
      copy[index] = [event.lngLat[0], event.lngLat[1]];
      return copy;
    });
  }, []);

  return (
    <>
      <TileGrid
        cols={7}
        customizerOptions={[
          <Slider
            value={heading}
            onChange={({ value }) => value && setHeading(value)}
            min={0}
            max={360}
            key={'heading'}
          />,
          <Select
            options={locationPuckSizes}
            value={size}
            placeholder="Select a puck size"
            // @ts-ignore
            onChange={(params) => setSize(params.value)}
            key="puck-size"
            searchable={false}
            clearable={false}
          />,
          <Select
            options={locationPuckTypes}
            value={type}
            placeholder="Select a puck type"
            // @ts-ignore
            onChange={(params) => setType(params.value)}
            key="puck-type"
            searchable={false}
            clearable={false}
          />,
          <Slider
            value={confidenceRadius}
            onChange={({ value }) => value && setConfidenceRadius(value)}
            min={0}
            max={500}
            key={'confidence-radius'}
          />,
          <Checkbox
            checked={showHeading}
            onChange={(e) => setShowHeading(e.target.checked)}
            labelPlacement={LABEL_PLACEMENT.right}
            key={'show-heading'}
          >
            Show heading
          </Checkbox>,
        ]}
      />
      <div className={css({ backgroundColor: theme.colors.backgroundLightAccent })}>
        <ReactMapGL
          {...viewport}
          width="100%"
          height="760px"
          onViewportChange={(viewport) => setViewport(viewport)}
          onClick={({ lngLat }) => setLocations((existing) => [...existing, lngLat])}
        >
          {locations.map((x, i) => (
            <Marker
              latitude={x[1]}
              longitude={x[0]}
              key={i}
              draggable
              onDragEnd={(evt) => onMarkerDragEnd(evt, i)}
            >
              <LocationPuck
                overrides={{
                  Root: {
                    style: () => ({
                      transform: `translate(-50%, -50%)`,
                    }),
                  },
                }}
                heading={heading[0]}
                // $FlowFixMe Mismatch between general type and enum
                size={size[0].id}
                confidenceRadius={confidenceRadius[0]}
                // $FlowFixMe Mismatch between general type and enum
                type={type[0].id}
                showHeading={showHeading}
              />
            </Marker>
          ))}
        </ReactMapGL>
      </div>
    </>
  );
}

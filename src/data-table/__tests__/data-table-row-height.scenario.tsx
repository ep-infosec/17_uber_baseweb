/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import StringColumn from '../column-string';
import { StatefulDataTable } from '../stateful-data-table';

import AnimalData from './animal-data';

type RowData = {
  Name: string;
  loremIpsum: string;
};

const loremIpsum = `"We went upstairs together, the colonel first with the lamp, the fat manager and I behind him. It was a labyrinth of an old house, with corridors, passages, narrow winding staircases, and little low doors, the thresholds of which were hollowed out by the generations who had crossed them. There were no carpets and no signs of any furniture above the ground floor, while the plaster was peeling off the walls, and the damp was breaking through in green, unhealthy blotches. I tried to put on as unconcerned an air as possible, but I had not forgotten the warnings of the lady, even though I disregarded them, and I kept a keen eye upon my two companions. Ferguson appeared to be a morose and silent man, but I could see from the little that he said that he was at least a fellow-countryman.`;

const columns = [
  StringColumn({
    title: 'Name',
    minWidth: 250,
    mapDataToValue: (data: RowData) => data.Name,
  }),

  StringColumn({
    title: 'Vertically Center',
    minWidth: 250,
    mapDataToValue: (data: RowData) => data.Name,
    cellBlockAlign: 'center',
  }),

  StringColumn({
    title: 'Long Text',
    maxWidth: 300,
    lineClamp: 3,
    mapDataToValue: (data: RowData) => data.loremIpsum,
  }),
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const rows = AnimalData.map((row, index) => {
  return {
    id: row.Name,
    data: { Name: row.Name, loremIpsum },
  };
});

const actions = [
  {
    label: 'No Effect',
    onClick: () => {},
  },
];

export function Scenario() {
  return (
    <div style={{ height: '600px', width: '700px' }}>
      <StatefulDataTable batchActions={actions} columns={columns} rows={rows} rowHeight={78} />
    </div>
  );
}

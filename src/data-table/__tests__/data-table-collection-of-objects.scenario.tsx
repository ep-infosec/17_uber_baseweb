/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { AnchorColumn, CategoricalColumn, NumericalColumn, StatefulDataTable } from '..';

import graphqlArrayData from './graphql-array-data';

type RowData = {
  id: string;
  name: string;
  applicationTags: string;
  realUser: string;
  source: string;
  allocatedVCores: number;
  allocatedGB: number;
};

const columns = [
  AnchorColumn({
    title: 'Application',
    mapDataToValue: (data: RowData) => ({
      content: data.name,
      href: `#id=${data.id}`,
    }),

    minWidth: 130,
  }),

  AnchorColumn({
    // illustrates that this could be provided with a react-router-link
    // eslint-disable-next-line react/display-name
    elementAs: ({ children }) => <div style={{ color: 'green' }}>{children}</div>,
    title: 'User',
    mapDataToValue: (data: RowData) => ({
      content: data.realUser,
      href: `#id=${data.realUser}`,
    }),

    minWidth: 80,
  }),

  CategoricalColumn({
    title: 'Source',
    minWidth: 90,
    mapDataToValue: (data: RowData) => data.source,
  }),

  NumericalColumn({
    title: 'CPU vCores',
    mapDataToValue: (data: RowData) => data.allocatedVCores,
  }),

  NumericalColumn({
    title: 'Memory GB',
    mapDataToValue: (data: RowData) => data.allocatedGB,
  }),
];

const rows = [
  ...graphqlArrayData,
  ...graphqlArrayData,
  ...graphqlArrayData,
  ...graphqlArrayData,
  ...graphqlArrayData,
].map((row) => ({
  id: row.id,
  data: row,
}));

export function Scenario() {
  return (
    <div style={{ height: '600px', width: '700px' }}>
      <StatefulDataTable columns={columns} rows={rows} />
    </div>
  );
}

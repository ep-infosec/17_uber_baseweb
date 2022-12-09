/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import Alert from '../../icon/alert';
import Check from '../../icon/check';

import BooleanColumn from '../column-boolean';
import NumericalColumn from '../column-numerical';
import { StatefulDataTable } from '../stateful-data-table';

type RowData = [number, boolean];

const columns = [
  NumericalColumn({
    title: 'row-id',
    mapDataToValue: (data: RowData) => data[0],
  }),

  BooleanColumn({
    title: 'is-it-flagged',
    mapDataToValue: (data: RowData) => data[1],
  }),
];

export function Scenario() {
  const [count, setCount] = React.useState(0);
  const [rows, setRows] = React.useState([
    { id: 1, data: [1, false] },
    { id: 2, data: [2, false] },
    { id: 3, data: [3, false] },
    { id: 4, data: [4, false] },
    { id: 5, data: [5, false] },
  ]);

  function flagRows(ids) {
    const nextRows = rows.map((row) => {
      if (ids.includes(row.id)) {
        const nextData = [row.data[0], true];
        return { ...row, data: nextData };
      }

      return row;
    });
    setRows(nextRows);
  }

  function removeRows(ids) {
    const nextRows = rows.filter((row) => !ids.includes(row.id));
    setRows(nextRows);
  }

  const actions = [
    {
      label: 'Flag',
      onClick: ({ selection, clearSelection }) => {
        flagRows(selection.map((r) => r.id));
        clearSelection();
      },
      renderIcon: function RenderAlert({ size }) {
        return <Alert size={size} />;
      },
    },

    {
      label: 'Approve',
      onClick: ({ selection, clearSelection }) => {
        removeRows(selection.map((r) => r.id));
        clearSelection();
      },
      renderIcon: function RenderCheck({ size }) {
        return <Check size={size} />;
      },
    },

    {
      label: 'Download',
      onClick: ({ clearSelection }) => clearSelection(),
    },
  ];

  return (
    <div>
      <div style={{ height: '400px', width: '900px' }}>
        <StatefulDataTable
          batchActions={actions}
          columns={columns}
          onSelectionChange={() => setCount(count + 1)}
          rows={rows}
        />
      </div>
      <p id="selection-change-count">selection change count: {count}</p>
    </div>
  );
}

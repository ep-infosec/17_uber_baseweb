// @flow

import React from 'react';
import {useStyletron} from 'baseui';
import {
  BooleanColumn,
  CategoricalColumn,
  NumericalColumn,
  StringColumn,
  StatefulDataTable,
} from 'baseui/data-table';
import {Button} from 'baseui/button';

type RowDataT = [boolean, string, number, string];

const columns = [
  BooleanColumn({
    title: 'boolean',
    mapDataToValue: (data: RowDataT) => data[0],
  }),

  CategoricalColumn({
    title: 'color',
    mapDataToValue: (data: RowDataT) => data[1],
  }),

  NumericalColumn({
    title: 'number',
    mapDataToValue: (data: RowDataT) => data[2],
  }),

  StringColumn({
    title: 'description',
    mapDataToValue: (data: RowDataT) => data[3],
  }),
];

const rows = [
  {id: 1, data: [true, 'green', 2, 'bright']},
  {id: 2, data: [false, 'blue', 1, 'glossy']},
  {id: 3, data: [true, 'black', 4, 'dry']},
  {id: 4, data: [false, 'pink', 3, 'brittle']},
  {id: 5, data: [false, 'blue', 5, 'big']},
  {id: 6, data: [true, 'pink', 6, 'spicey']},
  {id: 7, data: [false, 'blue', 3, 'mild']},
  {id: 8, data: [false, 'blue', 3, 'pointy']},
  {id: 9, data: [true, 'blue', 3, 'soft']},
  {id: 10, data: [false, 'pink', 1, 'worn']},
  {id: 11, data: [true, 'blue', 1, 'brittle']},
  {id: 12, data: [true, 'blue', 3, 'glossy']},
  {id: 13, data: [false, 'purple', 3, 'big']},
  {id: 14, data: [false, 'blue', 1, 'worn']},
  {id: 15, data: [false, 'blue', 3, 'dry']},
  {id: 16, data: [false, 'orange', 5, 'spicey']},
  {id: 17, data: [false, 'orange', 7, 'big']},
  {id: 18, data: [false, 'blue', 8, 'glossy']},
  {id: 19, data: [false, 'magenta', 4, 'brittle']},
  {id: 20, data: [true, 'blue', 3, 'dry']},
];

export default function Example() {
  const [css] = useStyletron();
  const controlRef = React.useRef(null);
  const handleClick = () => {
    const rows = controlRef.current?.getRows();
    if (Array.isArray(rows)) {
      console.log(rows);
    }
  };
  return (
    <>
      <Button onClick={handleClick}>
        Log filtered and sorted records to console
      </Button>
      <div className={css({height: '800px'})}>
        <StatefulDataTable columns={columns} rows={rows} />
      </div>
    </>
  );
}

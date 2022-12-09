/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { FormControl } from '..';
import { StatefulCheckbox } from '../../checkbox';
import { StatefulInput, SIZE } from '../../input';
import { StatefulRadioGroup, Radio } from '../../radio';
import { StatefulTextarea } from '../../textarea';
import { StatefulSelect } from '../../select';

export function Scenario() {
  return (
    <div>
      <FormControl label="Input label" caption="Input caption">
        <StatefulInput size={SIZE.compact} />
      </FormControl>
      <FormControl disabled label="Input label disabled" caption="Input caption">
        <StatefulInput size={SIZE.compact} />
      </FormControl>
      <FormControl disabled label="Input label disabled with enabled input" caption="Input caption">
        <StatefulInput disabled={false} size={SIZE.compact} />
      </FormControl>
      <FormControl positive label="Input label positive" caption="Input caption">
        <StatefulInput size={SIZE.compact} />
      </FormControl>
      <FormControl error label="Input label error" caption="Input caption">
        <StatefulInput size={SIZE.compact} />
      </FormControl>
      <FormControl label="Textarea label" caption="Textarea caption">
        <StatefulTextarea size={SIZE.compact} />
      </FormControl>
      <FormControl label="Checkbox label" caption="Checkbox caption">
        <StatefulCheckbox>Checkbox control</StatefulCheckbox>
      </FormControl>
      <FormControl label="RadioGroup label" caption="RadioGroup caption">
        <StatefulRadioGroup>
          <Radio value="red">Red</Radio>
          <Radio value="green">Green</Radio>
          <Radio value="blue">Blue</Radio>
        </StatefulRadioGroup>
      </FormControl>
      <FormControl label="Select label" caption="Select caption">
        <StatefulSelect
          options={[
            { id: 'AliceBlue', color: '#F0F8FF' },
            { id: 'AntiqueWhite', color: '#FAEBD7' },
            { id: 'Aqua', color: '#00FFFF' },
            { id: 'Aquamarine', color: '#7FFFD4' },
            { id: 'Azure', color: '#F0FFFF' },
            { id: 'Beige', color: '#F5F5DC' },
          ]}
          labelKey="id"
          valueKey="color"
        />
      </FormControl>
    </div>
  );
}

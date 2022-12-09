/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { getSharedProps } from '../utils';
import { ADJOINED, SIZE } from '..';

test('Utils - getSharedProps', () => {
  const props = {
    id: 'id',
    inputRef: { current: { focus: () => {} } },
    adjoined: ADJOINED.none,
    size: SIZE.default,
    required: false,
    disabled: false,
    readOnly: false,
    error: false,
    positive: false,
    value: 'value',
    placeholder: 'placeholder',
    onChange: jest.fn(),
    autoFocus: false,
    isFocused: false,
  };
  const state = {
    isFocused: true,
  };
  // eslint-disable-next-line jest/no-restricted-matchers
  expect(getSharedProps(props, state)).toMatchSnapshot('getSharedProps returns correct object');
});

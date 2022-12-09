/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { render, fireEvent, queryByTestId, getByText } from '@testing-library/react';

import { TestBaseProvider } from '../../test/test-utils';

import { Filter } from '..';

describe('Table-Filter', () => {
  it('does not display filter content by default', () => {
    const { container } = render(
      <TestBaseProvider>
        <Filter overrides={{ Content: { props: { 'data-testid': 'content' } } }}>hello</Filter>
      </TestBaseProvider>
    );
    expect(queryByTestId(container, 'content')).toBeNull();
  });

  it('displays filter content on click', () => {
    const children = 'hello';
    const { container } = render(
      <TestBaseProvider>
        <Filter overrides={{ Content: { props: { 'data-testid': 'content' } } }}>{children}</Filter>
      </TestBaseProvider>
    );
    const button = container.querySelector('button');
    if (button) fireEvent.click(button);
    expect(queryByTestId(container, 'content')).not.toBeNull();
  });

  it('does not display filter content if disabled', () => {
    const { container } = render(
      <TestBaseProvider>
        <Filter disabled overrides={{ Content: { props: { 'data-testid': 'content' } } }}>
          hello
        </Filter>
      </TestBaseProvider>
    );
    const button = container.querySelector('button');
    if (button) fireEvent.click(button);
    expect(queryByTestId(container, 'content')).toBeNull();
  });

  it('does display close button when enabled', () => {
    const { container } = render(
      <TestBaseProvider>
        <Filter hasCloseButton={true}>hello</Filter>
      </TestBaseProvider>
    );
    const button = container.querySelector('button');
    if (button) fireEvent.click(button);
    expect(getByText(container, 'Close')).not.toBeNull();
  });

  it('does close filter when when closed is clicked', () => {
    const { container } = render(
      <TestBaseProvider>
        <Filter
          hasCloseButton={true}
          overrides={{ Content: { props: { 'data-testid': 'content' } } }}
        >
          hello
        </Filter>
      </TestBaseProvider>
    );
    const button = container.querySelector('button');
    if (button) fireEvent.click(button);
    const close = getByText(container, 'Close');
    fireEvent.click(close);
    expect(queryByTestId(container, 'content')).toBeNull();
  });

  it('calls provided onSelectAll handler', () => {
    const spy = jest.fn();
    const { container } = render(
      <TestBaseProvider>
        <Filter onSelectAll={spy}>hello</Filter>
      </TestBaseProvider>
    );
    const button = container.querySelector('button');
    if (button) fireEvent.click(button);
    const selectAll = getByText(container, 'Select All');
    fireEvent.click(selectAll);
    expect(spy).toHaveBeenCalled();
  });

  it('calls provided onReset handler', () => {
    const spy = jest.fn();
    const { container } = render(
      <TestBaseProvider>
        <Filter onReset={spy}>hello</Filter>
      </TestBaseProvider>
    );
    const button = container.querySelector('button');
    if (button) fireEvent.click(button);
    const reset = getByText(container, 'Reset');
    fireEvent.click(reset);
    expect(spy).toHaveBeenCalled();
  });
});

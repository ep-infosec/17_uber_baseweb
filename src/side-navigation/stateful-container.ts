/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { STATE_CHANGE_TYPE } from './constants';
import type { StatefulContainerProps, State, StateReducer, StateType, Item } from './types';

const defaultStateReducer: StateReducer = (type, nextState) => nextState;

class StatefulContainer extends React.Component<StatefulContainerProps, State> {
  static defaultProps = {
    initialState: {},
    stateReducer: defaultStateReducer,
    onChange: () => {},
  };

  state: State = {
    activeItemId: '',
    ...this.props.initialState,
  };

  onChange = (params: { item: Item; event: Event | KeyboardEvent }) => {
    const { onChange } = this.props;
    this.internalSetState(STATE_CHANGE_TYPE.change, params.item);
    if (typeof onChange === 'function') {
      onChange(params);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  internalSetState = (type: StateType, item: any) => {
    let nextState = {};
    if (type === STATE_CHANGE_TYPE.change) {
      nextState = { activeItemId: item.itemId };
    }
    const newState = this.props.stateReducer
      ? this.props.stateReducer(type, nextState, this.state)
      : nextState;
    this.setState(newState);
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { children, initialState, stateReducer, ...restProps } = this.props;
    const { onChange } = this;
    // @ts-expect-error
    return children({
      ...restProps,
      ...this.state,
      onChange,
    });
  }
}

export default StatefulContainer;

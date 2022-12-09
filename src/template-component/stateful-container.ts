/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import type {
  State,
  StatefulComponentContainerProps,
  StateChangeType,
  StateReducer,
} from './types';

const defaultStateReducer: StateReducer = (type, nextState) => nextState;

class StatefulContainer extends React.Component<StatefulComponentContainerProps, State> {
  static defaultProps: Partial<StatefulComponentContainerProps> = {
    initialState: { prop: true },
    stateReducer: defaultStateReducer,
  };

  state = {
    prop: true,
    ...this.props.initialState,
  };

  onClick = (...args: []) => {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(...args);
    }
    this.internalSetState('click', { prop: !this.state.prop });
  };

  internalSetState(type: StateChangeType, changes: State) {
    const { stateReducer } = this.props;
    if (typeof stateReducer !== 'function') {
      this.setState(changes);
      return;
    }
    this.setState((prevState) => stateReducer(type, changes, prevState));
  }

  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { children, initialState, stateReducer, ...restProps } = this.props;

    return this.props.children({
      ...restProps,
      ...this.state,
      onClick: this.onClick,
    });
  }
}

export default StatefulContainer;

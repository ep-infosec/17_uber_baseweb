/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Calendar } from '..';

const DATE = new Date('2019-02-22T10:00:00Z');
const TIME = new Date(DATE);
TIME.setHours(12, 0, 0);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Scenario extends React.Component<any, any> {
  state = { date: DATE, time: TIME };

  render() {
    return (
      <>
        <Calendar
          value={this.state.date}
          // @ts-expect-error time is not declared in props type
          time={this.state.time}
          onChange={(data) => this.setState({ date: data.date })}
          onTimeChange={(data) => this.setState({ time: data.time })}
          timeSelect
        />

        <div>
          {`${this.state.date.getFullYear()}-${this.state.date.getMonth()}-${this.state.date.getDate()}`}
        </div>

        <div>{`${this.state.time.getHours()}:${this.state.time.getMinutes()}`}</div>
      </>
    );
  }
}

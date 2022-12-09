/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import {
  StyledTable,
  StyledHead,
  StyledHeadCell,
  StyledBody,
  StyledRow,
  StyledCell,
} from './styled-components';

import { ProgressBar } from '../progress-bar';

import type { TableProps } from './types';

export default class Table extends React.Component<TableProps> {
  static defaultProps = {
    // @ts-ignore
    columns: [],
    // @ts-ignore
    data: [[]],
    isLoading: false,
  };

  render() {
    return (
      <StyledTable
        data-baseweb="table"
        aria-colcount={this.props.columns.length}
        aria-rowcount={this.props.data.length}
      >
        {this.props.isLoading && (
          <ProgressBar
            infinite
            overrides={{
              Bar: {
                style: {
                  marginBottom: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginTop: 0,
                },
              },
            }}
          />
        )}
        <StyledHead $width={this.props.horizontalScrollWidth}>
          {this.props.columns.map((column, index) => (
            <StyledHeadCell key={index}>{column}</StyledHeadCell>
          ))}
        </StyledHead>
        <StyledBody $width={this.props.horizontalScrollWidth}>
          {this.props.data.map((row, index) => (
            <StyledRow key={index}>
              {row.map((cell, cellIndex) => (
                <StyledCell key={cellIndex}>{cell}</StyledCell>
              ))}
            </StyledRow>
          ))}
        </StyledBody>
      </StyledTable>
    );
  }
}

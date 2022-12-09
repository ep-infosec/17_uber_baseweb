/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Block } from '../../block';
import { Button, KIND } from '../../button';
import TriangleDown from '../../icon/triangle-down';
import { StatefulMenu } from '../../menu';
import { Pagination } from '../../pagination';
import { StatefulPopover, PLACEMENT } from '../../popover';

import { Table } from '..';

const COLUMNS = [...new Array(5)].map(() => 'Label');
const DATA = [...new Array(45)].map((_, i) => [...new Array(5)].map(() => `row: ${i + 1}`));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class PaginatedTable extends React.Component<any, any> {
  state = { page: 1, limit: 12 };

  handlePageChange = (nextPage: number) => {
    if (nextPage < 1) {
      return;
    }
    if (nextPage > Math.ceil(this.props.data.length / this.state.limit)) {
      return;
    }
    this.setState({ page: nextPage });
  };

  handleLimitChange = (nextLimit: number) => {
    const nextPageNum = Math.ceil(this.props.data.length / nextLimit);
    if (nextPageNum < this.state.page) {
      this.setState({ limit: nextLimit, page: nextPageNum });
    } else {
      this.setState({ limit: nextLimit });
    }
  };

  window = () => {
    const min = (this.state.page - 1) * this.state.limit;
    return this.props.data.slice(min, min + this.state.limit);
  };

  render() {
    return (
      <Block width="968px">
        <Block
          display="flex"
          justifyContent="space-between"
          paddingTop="scale600"
          paddingBottom="scale600"
        >
          <Block font="font700">Table Example</Block>
          <Button>
            <Block paddingLeft="scale1200" paddingRight="scale1200">
              Action
            </Block>
          </Button>
        </Block>
        <Block height="500px">
          <Table columns={this.props.columns} data={this.window()} />
        </Block>
        <Block
          paddingTop="scale600"
          paddingRight="scale800"
          paddingBottom="scale600"
          paddingLeft="scale800"
          display="flex"
          justifyContent="space-between"
        >
          <StatefulPopover
            content={({ close }) => (
              <StatefulMenu
                items={[...new Array(100)].map((_, i) => ({ label: i + 1 }))}
                onItemSelect={({ item }) => {
                  this.handleLimitChange(item.label);
                  close();
                }}
                overrides={{ List: { style: { height: '150px', width: '100px' } } }}
              />
            )}
            placement={PLACEMENT.bottom}
          >
            <Button kind={KIND.tertiary} endEnhancer={TriangleDown}>
              {`${this.state.limit} Rows`}
            </Button>
          </StatefulPopover>

          <Pagination
            currentPage={this.state.page}
            numPages={Math.ceil(this.props.data.length / this.state.limit)}
            onPageChange={({ nextPage }) => this.handlePageChange(nextPage)}
          />
        </Block>
      </Block>
    );
  }
}

export function Scenario() {
  return <PaginatedTable columns={COLUMNS} data={DATA} />;
}

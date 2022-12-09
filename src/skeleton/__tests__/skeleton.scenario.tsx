/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { Skeleton } from '..';
import { useStyletron } from '../../styles';

export function Scenario() {
  const [css] = useStyletron();
  return (
    <div className={css({ width: '1000px', display: 'flex', flexWrap: 'wrap' })}>
      {Array(8)
        .fill(undefined)
        .map((item, index) => (
          <div className={css({ margin: '10px' })} key={index}>
            <Skeleton
              height="150px"
              width="300px"
              overrides={{
                Root: {
                  style: {
                    marginBottom: '10px',
                  },
                },
              }}
            />

            <div
              className={css({
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              })}
            >
              <Skeleton
                width="50px"
                height="50px"
                overrides={{
                  Root: {
                    style: {
                      borderRadius: '50%',
                    },
                  },
                }}
              />

              <Skeleton rows={2} width="220px" />
            </div>
          </div>
        ))}
    </div>
  );
}

/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';

import BaseProvider from '../helpers/base-provider';
import { ThemeProvider } from '../styles';
import { LightTheme } from '../themes';

const engine = new Styletron();

export const withStyletronProvider = (Component: React.ComponentType<{}>) =>
  function withStyletronProviderHOC(props: {}) {
    return (
      <StyletronProvider value={engine}>
        <Component {...props} />
      </StyletronProvider>
    );
  };

export const withThemeProvider = (Component: React.ComponentType<{}>) =>
  function withThemeProviderHOC(props: {}) {
    return (
      <ThemeProvider theme={LightTheme}>
        <Component {...props} />
      </ThemeProvider>
    );
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withAll = (Component: () => React.ReactElement<any>) => {
  return (
    <StyletronProvider value={engine}>
      <ThemeProvider theme={LightTheme}>{Component()}</ThemeProvider>
    </StyletronProvider>
  );
};

export function TestBaseProvider({ children }: { children?: React.ReactNode }) {
  return <BaseProvider theme={LightTheme}>{children}</BaseProvider>;
}

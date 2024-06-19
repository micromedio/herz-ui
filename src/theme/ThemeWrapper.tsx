import * as React from 'react';
import { ThemeProvider, ThemeUIProvider } from 'theme-ui';

import { theme } from './theme';

export interface IThemeWrapperProps {
  children: React.ReactNode;
}

const ThemeWrapper = function (props: IThemeWrapperProps) {
  const { children } = props;

  return <ThemeUIProvider theme={theme}>{children}</ThemeUIProvider>;
};

export default ThemeWrapper;

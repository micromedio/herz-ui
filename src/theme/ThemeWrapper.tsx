import * as React from 'react';
import { ThemeProvider } from 'theme-ui';

import { theme } from './theme';

export interface IThemeWrapperProps {
  children: React.ReactNode;
}

const ThemeWrapper = function (props: IThemeWrapperProps) {
  const { children } = props;

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeWrapper;

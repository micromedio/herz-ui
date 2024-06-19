import React, { FC, ReactElement, ReactNode } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import ThemeWrapper from '../theme/ThemeWrapper';

export interface IThemeWrapperProps {
  children?: ReactNode;
}

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <ThemeWrapper>{children}</ThemeWrapper>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): RenderResult =>
  render(ui, { wrapper: AllTheProviders as React.ComponentType, ...options });

export * from '@testing-library/react';

export { customRender as render };

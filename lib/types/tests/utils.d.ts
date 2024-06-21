import { ReactElement, ReactNode } from 'react';
import { RenderOptions, RenderResult } from '@testing-library/react';
export interface IThemeWrapperProps {
    children?: ReactNode;
}
declare const customRender: (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => RenderResult;
export * from '@testing-library/react';
export { customRender as render };

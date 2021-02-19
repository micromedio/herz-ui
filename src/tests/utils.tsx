import React, { FC, ReactElement, ReactNode } from "react"
import { render, RenderOptions } from "@testing-library/react"
import { ThemeProvider } from "theme-ui"

import { theme } from "../theme/theme"

export interface IThemeWrapperProps {
  children?: ReactNode
}

const AllTheProviders: FC = (props: IThemeWrapperProps) => {
  const { children } = props
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from "@testing-library/react"

export { customRender as render }

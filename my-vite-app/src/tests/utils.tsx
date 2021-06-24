import React, { FC, ReactElement, ReactNode } from "react"
import { render, RenderOptions } from "@testing-library/react"
import ThemeWrapper from "../theme/ThemeWrapper"

export interface IThemeWrapperProps {
  children?: ReactNode
}

const AllTheProviders: FC = (props: IThemeWrapperProps) => {
  const { children } = props
  return <ThemeWrapper>{children}</ThemeWrapper>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from "@testing-library/react"

export { customRender as render }

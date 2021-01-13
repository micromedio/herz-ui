import * as React from "react"
import { ThemeProvider } from "theme-ui"

import { theme } from "./theme"

export interface IThemeWrapperProps {
  children: React.ReactChildren
}

export default function (props: IThemeWrapperProps) {
  const { children } = props
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

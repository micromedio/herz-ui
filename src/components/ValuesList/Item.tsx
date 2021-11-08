/** @jsxImportSource theme-ui */

import { ReactNode, Fragment } from "react"
import { Divider } from ".."

export interface ItemProps {
  children: ReactNode
  hideDivider?: boolean
}

export const Item = ({ children, hideDivider = false }: ItemProps) => {
  return (
    <Fragment>
      {children}
      {!hideDivider && <Divider sx={{ gridColumn: "span 2" }} />}
    </Fragment>
  )
}

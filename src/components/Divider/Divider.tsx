/** @jsxImportSource theme-ui */

import { HTMLAttributes } from "react"

export interface DividerProps {
  className?: HTMLAttributes<HTMLHRElement>["className"]
}

const Divider = ({ className }: DividerProps) => {
  return (
    <hr
      className={className}
      sx={{
        border: "none",
        height: "1px",
        margin: 0,
        flexShrink: 0,
        backgroundColor: "text.90",
      }}
    />
  )
}

export default Divider

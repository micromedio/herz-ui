/** @jsxImportSource theme-ui */

import { HTMLAttributes, ReactNode } from "react"

export interface LabelProps {
  children: ReactNode
  className?: HTMLAttributes<HTMLDivElement>["className"]
}

export const Label = ({ children, className }: LabelProps) => {
  return (
    <div
      className={className}
      sx={{
        display: "flex",
        alignItems: "center",
        color: "text.40",
        height: "100%",
        pr: 2,
      }}
    >
      {children}
    </div>
  )
}

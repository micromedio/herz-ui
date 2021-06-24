/** @jsxImportSource theme-ui */
import React, { HTMLAttributes } from "react"

const Item = ({
  label,
  children,
  className,
  minWidth,
  grows = false,
}: {
  label?: string
  children?: React.ReactNode
  className?: HTMLAttributes<HTMLDivElement>["className"]
  minWidth?: number
  grows?: boolean
}) => {
  return (
    <div
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        flexBasis: minWidth,
        flexGrow: grows ? 1 : 0,
      }}
      className={className}
    >
      {label && (
        <div
          sx={{
            variant: "text.body1",
            color: "text.40",
          }}
        >
          {label}
        </div>
      )}
      {children}
    </div>
  )
}

export interface TableFiltersProps {
  children: React.ReactNode
}

const TableFilters = ({ children }: TableFiltersProps) => {
  return (
    <div
      sx={{
        display: "flex",
        gap: 5,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  )
}

TableFilters.Item = Item

export default TableFilters

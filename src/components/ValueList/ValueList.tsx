/** @jsxImportSource theme-ui */
import React, { HTMLAttributes } from "react"
import { get } from "theme-ui"

export interface ValueListProps {
  alignValues?: "start" | "end"
  className?: HTMLAttributes<HTMLDivElement>["className"]
  itemSpacing?: "12px" | "16px"
  items: Array<{
    label: React.ReactNode
    value: React.ReactNode
  }>
}

/**
 * @deprecated Component depracated, use `ValuesList` instead
 */
const ValueList = ({
  alignValues = "end",
  className,
  itemSpacing = "16px",
  items,
}: ValueListProps) => {
  return (
    <div
      sx={{
        display: "grid",
        alignItems: "center",
        gridTemplateColumns: "1fr auto",
        variant: "text.body1",
        listStyle: "none",
      }}
      className={className}
    >
      {items.map(({ label, value }, index) => (
        <React.Fragment key={index}>
          <div
            sx={{
              color: "text.40",
              height: "100%",
              pr: 2,
              py: itemSpacing,
              ...(index !== items.length - 1
                ? {
                    borderBottom: (theme) =>
                      `1px solid ${get(theme, "colors.text.90")}`,
                  }
                : {}),
            }}
          >
            {label}
          </div>
          <div
            sx={{
              display: "flex",
              height: "100%",
              justifyContent:
                alignValues === "start" ? "flex-start" : "flex-end",
              alignItems: "center",
              color: "text",
              ...(index !== items.length - 1
                ? {
                    borderBottom: (theme) =>
                      `1px solid ${get(theme, "colors.text.90")}`,
                  }
                : {}),
            }}
          >
            {value}
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

export default ValueList

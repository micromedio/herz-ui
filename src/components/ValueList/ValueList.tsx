/** @jsxRuntime classic /
/** @jsx jsx */
import React from "react"
import { HerzUITheme, jsx } from "theme-ui"

export interface ValueListProps {
  items: Array<{
    label: string
    value: React.ReactNode
  }>
  alignValues?: "start" | "end"
}

const ValueList = ({ items, alignValues = "end" }: ValueListProps) => {
  return (
    <div
      sx={{
        display: "grid",
        alignItems: "center",
        gridTemplateColumns: "1fr auto",
        variant: "text.body1",
        listStyle: "none",
      }}
    >
      {items.map(({ label, value }, index) => (
        <React.Fragment key={index}>
          <div
            sx={{
              color: "text.40",
              pr: 2,
              py: 4,
              ...(index !== items.length - 1
                ? {
                    borderBottom: (theme: HerzUITheme) =>
                      `1px solid ${theme.colors.text[90]}`,
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
              color: "text.0",
              ...(index !== items.length - 1
                ? {
                    borderBottom: (theme: HerzUITheme) =>
                      `1px solid ${theme.colors.text[90]}`,
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

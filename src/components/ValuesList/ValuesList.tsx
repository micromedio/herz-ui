/** @jsxImportSource theme-ui */
import { HTMLAttributes, ReactNode } from "react"
import { Item } from "./Item"
import { Label } from "./Label"
import { Value } from "./Value"

export interface ValuesListProps {
  alignValues?: "start" | "end"
  className?: HTMLAttributes<HTMLDivElement>["className"]
  itemSpacing?: "12px" | "16px"
  children: ReactNode
}

const ValuesList = ({
  alignValues = "end",
  className,
  children,
  itemSpacing = "16px",
}: ValuesListProps) => {
  return (
    <div
      sx={{
        display: "grid",
        alignItems: "center",
        gridTemplateColumns: "auto 1fr",
        variant: "text.body1",
        rowGap: itemSpacing,
        py: itemSpacing,
        "& > div:nth-of-type(2n)": {
          pl: 8,
          justifyContent: alignValues === "end" ? "flex-end" : "flex-start",
        },
      }}
      className={className}
    >
      {children}
    </div>
  )
}

ValuesList.Item = Item
ValuesList.Label = Label
ValuesList.Value = Value

export default ValuesList

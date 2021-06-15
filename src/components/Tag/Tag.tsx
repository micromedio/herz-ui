/** @jsxImportSource theme-ui */
import React from "react"
import { get } from "theme-ui"
import Icon from "../Icon/Icon"

export interface TagProps {
  color?: "primary" | "secondary" | "text" | "success"
  children: React.ReactNode
  onRemove?: () => void
  showRemove?: boolean
}

const Tag = ({
  color = "secondary",
  children,
  onRemove,
  showRemove = false,
}: TagProps) => {
  return (
    <span
      sx={{
        display: "flex",
        width: "fit-content",
        gap: 1,
        px: 2,
        borderRadius: 2,
        color,
        backgroundColor: (t) => get(t, `colors.${color}.alpha.85`),
      }}
    >
      <span
        sx={{
          variant: "text.caption",
          fontWeight: "bold",
        }}
      >
        {children}
      </span>
      {showRemove && (
        <span
          role="button"
          aria-label="remove"
          onClick={onRemove}
          sx={{
            display: "flex",
            alignItems: "center",
            color: "text.40",
            cursor: "pointer",
          }}
        >
          <Icon name="IconX" size={12} stroke={3} />
        </span>
      )}
    </span>
  )
}

export default Tag

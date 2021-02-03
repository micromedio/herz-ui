/** @jsxRuntime classic /
/** @jsx jsx */
import React, { useMemo } from "react"
import { Box, jsx } from "theme-ui"

export interface PaginationItemProps {
  /** Type of pagination item */
  type: "page" | "first" | "last" | "next" | "previous" | "ellipsis"
  /** The current page number */
  page?: number
  /** If `true`, the item will be disabled */
  disabled?: boolean
  /** If `true` the pagination item is selected */
  selected?: boolean

  onClick?: () => void

  /** Text to show for the `first` button */
  firstText?: string
  /** Text to show for the `last` button */
  lastText?: string
}

const PaginationItem = ({
  page,
  type,
  disabled = false,
  selected = false,
  onClick,
  firstText = "First",
  lastText = "Last",
}: PaginationItemProps) => {
  const content = useMemo(() => {
    if (type === "page") return page
    if (type === "first") return firstText
    if (type === "last") return lastText
    if (type === "next") return ">"
    if (type === "previous") return "<"
    if (type === "ellipsis") return "..."
  }, [type, page, firstText, lastText])

  const focusBorderColor = useMemo(() => {
    if (disabled || type === "ellipsis") return "transparent"
    if (selected) return "#0082FC"
    return "muted"
  }, [disabled, selected, type])

  return (
    <Box
      as={type === "ellipsis" ? "span" : "button"}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 1,
        py: 2,

        transition: "all 0.2s",
        border: "2px solid",
        backgroundColor: selected ? "#E6F3FF" : "transparent", // TODO: remove fixed colors, use shade from theme
        borderColor: selected ? "#0082FC" : "transparent", // TODO: remove fixed colors, use shade from theme
        borderRadius: 2,
        color: selected ? "#0082FC" : "#777779", // TODO: remove fixed colors, use shade from theme
        opacity: disabled ? 0.3 : 1,
        cursor: disabled || type === "ellipsis" ? "default" : "pointer",

        outline: "none",
        "&:focus, &:hover": {
          borderColor: focusBorderColor,
        },

        // TODO: use typography styles
        fontFamily: "body",
        fontWeight: selected ? 600 : 500,
        fontSize: 14,
      }}
      onClick={onClick}
      aria-disabled={disabled}
      aria-current={selected || undefined}
      tabIndex={0}
    >
      <span
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: 20,
        }}
      >
        {content}
      </span>
    </Box>
  )
}

export default PaginationItem

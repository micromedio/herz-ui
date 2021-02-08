/** @jsxRuntime classic /
/** @jsx jsx */
import React, { useMemo } from "react"
import { Box, Text, jsx } from "theme-ui"

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
        color: selected ? "text" : "#777779", // TODO: remove fixed colors, use shade from theme
        opacity: disabled ? 0.3 : 1,
        cursor: disabled || type === "ellipsis" ? "default" : "pointer",
        pointerEvents: type === "ellipsis" ? "none" : undefined,

        outline: "none",
        "&:hover, &:focus": {
          backgroundColor: selected ? undefined : "#00000017", // TODO: remove fixed colors, use shade from theme
        },
      }}
      onClick={onClick}
      aria-disabled={disabled}
      aria-current={selected || undefined}
      tabIndex={disabled || type === "ellipsis" ? -1 : 0}
    >
      <Text
        as="span"
        variant={selected ? "heading3" : "body1"}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: 20,
        }}
      >
        {content}
      </Text>
    </Box>
  )
}

export default PaginationItem

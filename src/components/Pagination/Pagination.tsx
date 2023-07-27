/** @jsxImportSource theme-ui */
import React from "react"

import usePagination from "./usePagination"
import PaginationItem from "../PaginationItem/PaginationItem"

export interface PaginationProps {
  /** The page selected by default when the component is uncontrolled */
  defaultPage?: number
  /** The total number of pages */
  count?: number
  /** If `true`, the pagination component will be disabled */
  disabled?: boolean

  /** The current page */
  page?: number
  /** Callback fired when the page is changed */
  onChange?: (page: number) => void

  /** Number of always visible pages at the beginning and end */
  boundaryCount?: number
  /** Number of always visible pages before and after the current page */
  siblingCount?: number

  /** Text to show for the `first` button */
  firstText?: string
  /** Text to show for the `last` button */
  lastText?: string
}

const Pagination = ({
  page,
  onChange,
  disabled = false,
  count = 1,
  defaultPage = 1,
  boundaryCount,
  siblingCount,
  firstText = "Primeiro",
  lastText = "Último",
}: PaginationProps) => {
  const { items } = usePagination({
    page,
    defaultPage,
    onChange,
    disabled,
    count,
    boundaryCount,
    siblingCount,
  })

  return (
    <div
      sx={{
        display: "flex",
        gap: 2,
      }}
    >
      {items.map((item, index) => (
        <PaginationItem
          page={item.page}
          type={item.type}
          selected={item.selected}
          disabled={item.disabled}
          onClick={() => item.onClick()}
          key={index}
          firstText={firstText}
          lastText={lastText}
        />
      ))}
    </div>
  )
}

export default Pagination

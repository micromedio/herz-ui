/** @jsxRuntime classic /
/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import usePagination from "./usePagination"
import PaginationItem from "./PaginationItem"

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
}

const Pagination = ({
  page,
  onChange,
  disabled = false,
  count = 1,
  defaultPage = 1,
  boundaryCount,
  siblingCount,
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
          key={`${index}-${item.page}-${item.type}`}
        />
      ))}
    </div>
  )
}

export default Pagination

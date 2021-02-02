import { useState } from "react"
import { PaginationItemProps } from "./PaginationItem"

interface UsePaginationProps {
  /** The page selected by default when the component is uncontrolled */
  defaultPage?: number
  /** The total number of pages */
  count?: number
  /** If true, the pagination component will be disabled */
  disabled?: boolean

  /** The current page */
  page?: number
  /** Callback fired when the page is changed */
  onChange?: (page: number) => void

  /** Number of always visible pages at the beginning and end */
  boundaryCount?: number
  /** Number of always visible pages before and after the current page */
  siblingCount?: number

  showFirstButton?: boolean
  showPreviousButton?: boolean
  showNextButton?: boolean
  showLastButton?: boolean
}

const createRange = ({
  page,
  count,
  siblingCount,
  boundaryCount,
}: {
  page: number
  count: number
  siblingCount: number
  boundaryCount: number
}) => {
  const last = count
  const left = page - siblingCount
  const right = page + siblingCount + 1
  const range = []
  let rangeWithDots: (PaginationItemProps["type"] | number)[] = []

  for (let index = 1; index <= last; index++) {
    if (
      // start pages
      index <= boundaryCount ||
      // end pages
      index >= last - boundaryCount + 1 ||
      // close to the current page
      (index >= left && index < right)
    ) {
      range.push(index)
    }
  }

  let previous
  for (const index of range) {
    if (previous) {
      if (index - previous === 2) {
        rangeWithDots.push(previous + 1)
      } else if (index - previous !== 1) {
        rangeWithDots.push("ellipsis")
      }
    }
    rangeWithDots.push(index)
    previous = index
  }

  if (boundaryCount === 0) {
    if (page - siblingCount > 1) {
      rangeWithDots = ["ellipsis", ...rangeWithDots]
    }
    if (page + siblingCount < last) {
      rangeWithDots = [...rangeWithDots, "ellipsis"]
    }
  }

  return rangeWithDots
}

const usePagination = ({
  page: pageProp,
  defaultPage = 1,
  count = 1,
  disabled: disabledProp = false,
  onChange,
  boundaryCount = 3,
  siblingCount = 1,
  showFirstButton = true,
  showPreviousButton = false,
  showNextButton = false,
  showLastButton = true,
}: UsePaginationProps = {}) => {
  const isControlled = pageProp !== undefined

  const [page, setPage] = useState(pageProp ?? defaultPage)

  const handleClick = (value?: number) => {
    if (value) {
      if (!isControlled) {
        setPage(value)
      }
      if (onChange) {
        onChange(value)
      }
    }
  }

  let itemList = createRange({ page, count, siblingCount, boundaryCount })

  if (showPreviousButton) itemList = ["previous", ...itemList]
  if (showNextButton) itemList = [...itemList, "next"]
  if (showFirstButton) itemList = ["first", ...itemList]
  if (showLastButton) itemList = [...itemList, "last"]

  // Map the button type to its page number
  const buttonPage = (type: PaginationItemProps["type"]) => {
    switch (type) {
      case "first":
        return 1
      case "previous":
        return page - 1
      case "next":
        return page + 1
      case "last":
        return count
      default:
        return 0
    }
  }

  const items = itemList.map((item) => {
    let type: PaginationItemProps["type"]
    let selected: boolean
    let disabled: boolean
    let pageNumber: number

    if (typeof item === "number") {
      type = "page"
      selected = item === page
      pageNumber = item
      disabled = disabledProp
    } else {
      type = item
      selected = false
      pageNumber = buttonPage(item)
      disabled =
        disabledProp ||
        (item !== "ellipsis" &&
          (item === "next" || item === "last" ? page >= count : page <= 1))
    }

    return {
      onClick: () => handleClick(pageNumber),
      type,
      page: pageNumber,
      selected,
      disabled,
      "aria-current": item === page ? "true" : undefined,
    }
  })

  return {
    items,
  }
}

export default usePagination

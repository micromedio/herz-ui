import { renderHook } from "@testing-library/react-hooks"
import usePagination from "./usePagination"

const serialize = (items: ReturnType<typeof usePagination>["items"]) =>
  items.map((item) => (item.type === "page" ? item.page : item.type))

describe("usePagination", () => {
  test("has one page by default", () => {
    const { items } = renderHook(() => usePagination()).result.current
    expect(items).toHaveLength(3)
    expect(items[1]).toHaveProperty("page", 1)
  })

  test("has disabled previous & next buttons by default", () => {
    const { items } = renderHook(() =>
      usePagination({
        showFirstButton: false,
        showPreviousButton: true,
        showNextButton: true,
        showLastButton: false,
      })
    ).result.current
    expect(items[0]).toHaveProperty("type", "previous")
    expect(items[0]).toHaveProperty("disabled", true)
    expect(items[2]).toHaveProperty("type", "next")
    expect(items[2]).toHaveProperty("disabled", true)
  })

  test("has a disabled previous button & an enabled next button when count > 1", () => {
    const { items } = renderHook(() =>
      usePagination({
        count: 2,
        showFirstButton: false,
        showPreviousButton: true,
        showNextButton: true,
        showLastButton: false,
      })
    ).result.current
    expect(items[0]).toHaveProperty("type", "previous")
    expect(items[0]).toHaveProperty("disabled", true)
    expect(items[3]).toHaveProperty("type", "next")
    expect(items[3]).toHaveProperty("disabled", false)
    expect(items[3]).toHaveProperty("page", 2)
  })

  test("has an enabled previous button & disabled next button when page === count", () => {
    const { items } = renderHook(() =>
      usePagination({
        count: 2,
        page: 2,
        showFirstButton: false,
        showPreviousButton: true,
        showNextButton: true,
        showLastButton: false,
      })
    ).result.current
    expect(items[0]).toHaveProperty("type", "previous")
    expect(items[0]).toHaveProperty("disabled", false)
    expect(items[0]).toHaveProperty("page", 1)
    expect(items[3]).toHaveProperty("type", "next")
    expect(items[3]).toHaveProperty("disabled", true)
  })

  test("has a disabled first button when showFirstButton === true", () => {
    const { items } = renderHook(() =>
      usePagination({ showFirstButton: true })
    ).result.current
    expect(items[0]).toHaveProperty("type", "first")
    expect(items[0]).toHaveProperty("disabled", true)
    expect(items[0]).toHaveProperty("page", 1)
  })

  test("has a disabled last button when showLastButton === true", () => {
    const { items } = renderHook(() =>
      usePagination({ showLastButton: true })
    ).result.current

    expect(items[2]).toHaveProperty("type", "last")
    expect(items[2]).toHaveProperty("disabled", true)
    expect(items[2]).toHaveProperty("page", 1)
  })

  test("has an enabled first button when showFirstButton === true && page > 1", () => {
    const { items } = renderHook(() =>
      usePagination({ showFirstButton: true, count: 2, page: 2 })
    ).result.current
    expect(items[0]).toHaveProperty("type", "first")
    expect(items[0]).toHaveProperty("disabled", false)
    expect(items[0]).toHaveProperty("page", 1)
  })

  test("has an enabled last button when showLastButton === true && page < count", () => {
    const { items } = renderHook(() =>
      usePagination({ showLastButton: true, count: 2 })
    ).result.current
    expect(items[3]).toHaveProperty("type", "last")
    expect(items[3]).toHaveProperty("disabled", false)
    expect(items[3]).toHaveProperty("page", 2)
  })

  test("has no ellipses when count <= 7", () => {
    const { items } = renderHook(() =>
      usePagination({ count: 7 })
    ).result.current
    expect(items[1]).toHaveProperty("page", 1)
    expect(items[2]).toHaveProperty("page", 2)
    expect(items[3]).toHaveProperty("page", 3)
    expect(items[4]).toHaveProperty("page", 4)
    expect(items[5]).toHaveProperty("page", 5)
    expect(items[6]).toHaveProperty("page", 6)
    expect(items[7]).toHaveProperty("page", 7)
  })

  test("has an ellipsis when page >= 7", () => {
    const { items } = renderHook(() =>
      usePagination({ count: 8, page: 7 })
    ).result.current
    expect(items).toHaveLength(9)
    expect(items[4]).toHaveProperty("type", "ellipsis")
    expect(items[4]).toHaveProperty("page")
    expect(items[6]).toHaveProperty("page", 7)
  })

  test("has start & end ellipsis when count >= 13", () => {
    const { items } = renderHook(() =>
      usePagination({ count: 13, page: 7 })
    ).result.current

    expect(items).toHaveLength(13)
    expect(items[4]).toHaveProperty("type", "ellipsis")
    expect(items[4]).toHaveProperty("page")
    expect(items[8]).toHaveProperty("type", "ellipsis")
    expect(items[8]).toHaveProperty("page")
  })

  test("can have a reduced siblingCount", () => {
    const { items } = renderHook(() =>
      usePagination({
        count: 7,
        page: 4,
        siblingCount: 0,
        boundaryCount: 1,
      })
    ).result.current
    expect(items).toHaveLength(7)
    expect(items[2]).toHaveProperty("type", "ellipsis")
    expect(items[3]).toHaveProperty("page", 4)
    expect(items[4]).toHaveProperty("type", "ellipsis")
  })

  test("can have an increased siblingCount", () => {
    const { items } = renderHook(() =>
      usePagination({ count: 11, page: 6, siblingCount: 2, boundaryCount: 1 })
    ).result.current
    expect(items).toHaveLength(11)
    expect(items[2]).toHaveProperty("type", "ellipsis")
    expect(items[3]).toHaveProperty("page", 4)
    expect(items[4]).toHaveProperty("page", 5)
    expect(items[5]).toHaveProperty("page", 6)
    expect(items[6]).toHaveProperty("page", 7)
    expect(items[7]).toHaveProperty("page", 8)
    expect(items[8]).toHaveProperty("type", "ellipsis")
  })

  test("can have an increased boundaryCount", () => {
    const { items } = renderHook(() =>
      usePagination({ count: 11, page: 6, boundaryCount: 2 })
    ).result.current
    expect(items).toHaveLength(11)
    expect(items[1]).toHaveProperty("page", 1)
    expect(items[2]).toHaveProperty("page", 2)
    expect(items[3]).toHaveProperty("type", "ellipsis")
    expect(items[7]).toHaveProperty("type", "ellipsis")
    expect(items[8]).toHaveProperty("page", 10)
    expect(items[9]).toHaveProperty("page", 11)
  })

  test("should support boundaryCount={0}", () => {
    let items

    items = renderHook(() =>
      usePagination({
        count: 11,
        page: 6,
        boundaryCount: 0,
        siblingCount: 0,
        showFirstButton: false,
        showPreviousButton: true,
        showNextButton: true,
        showLastButton: false,
      })
    ).result.current.items
    expect(serialize(items)).toEqual([
      "previous",
      "ellipsis",
      6,
      "ellipsis",
      "next",
    ])

    items = renderHook(() =>
      usePagination({
        count: 11,
        page: 6,
        boundaryCount: 0,
        siblingCount: 1,
        showFirstButton: false,
        showPreviousButton: true,
        showNextButton: true,
        showLastButton: false,
      })
    ).result.current.items
    expect(serialize(items)).toEqual([
      "previous",
      "ellipsis",
      5,
      6,
      7,
      "ellipsis",
      "next",
    ])

    items = renderHook(() =>
      usePagination({
        count: 3,
        page: 2,
        boundaryCount: 0,
        siblingCount: 1,
        showFirstButton: false,
        showPreviousButton: true,
        showNextButton: true,
        showLastButton: false,
      })
    ).result.current.items
    expect(serialize(items)).toEqual(["previous", 1, 2, 3, "next"])
  })
})

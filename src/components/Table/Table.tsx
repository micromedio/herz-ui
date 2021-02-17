/** @jsxRuntime classic /
/** @jsx jsx */
import { jsx } from "theme-ui"
import {
  useTable,
  Column,
  usePagination,
  useFlexLayout,
  useSortBy,
  SortingRule,
} from "react-table"
import { Pagination, DropdownSelect } from "../"
import { memo, useEffect, useMemo } from "react"

export interface TableProps {
  /** Definition of the table columns */
  columns: Column<Record<string, unknown>>[]
  /** Data to be displayed in the table */
  data: Record<string, unknown>[]

  /** If `true`, the table will be displayed in a loading state */
  loading?: boolean

  // filter

  // sorting
  manualSorting?: boolean
  initialSortBy?: {
    id: string
    desc?: boolean
  }

  /** If `true`, the table pagination will be controlled by the parent */
  manualPagination?: boolean
  /** Used if manualPagination is `true`. The total count of items in the table */
  totalCount?: number
  /** Used if manualPagination is `true`. The total count of pages in the table */
  pageCount?: number
  /** Initial page size */
  initialPageSize?: number
  /** Initial page index */
  initialPageIndex?: number

  /** Callback called when pagination or sorting changes, if either `manualPagination` or `manualSorting` is `true` */
  onTableChange?: ({
    pageIndex,
    pageSize,
    sortBy,
  }: {
    pageIndex: number
    pageSize: number
    sortBy?: SortingRule<string>
  }) => void
}

const Table = ({
  columns,
  data,
  // loading,

  // sorting
  manualSorting = false,
  initialSortBy,

  // pagination
  manualPagination = false,
  pageCount: controlledPageCount,
  totalCount: controlledTotalCount = data.length,
  initialPageSize = 10,
  initialPageIndex = 0,

  onTableChange,
}: TableProps) => {
  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    // rows,
    page,
    prepareRow,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize, sortBy },
  } = useTable(
    {
      columns,
      data,

      manualSortBy: manualSorting,
      manualPagination,
      autoResetPage: false,
      autoResetSortBy: false,
      autoResetFilters: false,
      ...(controlledPageCount ? { pageCount: controlledPageCount } : {}), // unexpected behaviour from react-table if pageCount is passed as undefined instead of not passed at all
      initialState: {
        pageSize: initialPageSize,
        pageIndex: initialPageIndex,
        ...(initialSortBy ? { sortBy: [initialSortBy] } : {}),
      },
    },
    useSortBy,
    usePagination,
    useFlexLayout
  )

  useEffect(() => {
    onTableChange?.({
      pageIndex,
      pageSize,
      sortBy: sortBy?.[0],
    })
  }, [onTableChange, pageIndex, pageSize, sortBy])

  const totalCount = useMemo(() => {
    if (manualPagination) return controlledTotalCount
    return data.length
  }, [manualPagination, controlledTotalCount, data])

  return (
    <div>
      <div
        {...getTableProps()}
        sx={{
          width: "100%",
        }}
      >
        <div>
          {headerGroups.map((headerGroup) => {
            const {
              key,
              ...headerGroupProps
            } = headerGroup.getHeaderGroupProps()
            return (
              <div
                {...headerGroupProps}
                key={key}
                sx={{
                  borderBottom: "1px solid #E8E8E9", // TODO: use theme colors
                }}
              >
                {headerGroup.headers.map((column) => {
                  const { key, ...headerProps } = column.getHeaderProps(
                    column.getSortByToggleProps()
                  )

                  return (
                    <div
                      {...headerProps}
                      key={key}
                      sx={{
                        px: 6,
                        pb: 3,
                        color: "#777777", // TODO: use theme colors
                        variant: "text.body1",
                        textAlign: column.align ?? "start",
                      }}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
        <div {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            const { key, ...rowProps } = row.getRowProps()
            return (
              <div
                key={key}
                sx={{
                  p: 1,
                  borderBottom: "1px solid #E8E8E9", // TODO: use theme colors
                }}
              >
                <div
                  {...rowProps}
                  sx={{
                    borderRadius: 3,
                    transition: "all 0.2s ease-out",
                    "&:hover": {
                      backgroundColor: "rgba(0, 130, 252, 0.06)",
                    },
                  }}
                >
                  {row.cells.map((cell) => {
                    const { key, ...cellProps } = cell.getCellProps()
                    return (
                      <div
                        {...cellProps}
                        key={key}
                        sx={{
                          display: "flex",
                          px: 6,
                          py: 3,
                          color: cell.column.highlight ? "#0082FC" : "text", // TODO: use theme colors
                          variant: "text.body1",
                          justifyContent: {
                            start: "flex-start",
                            end: "flex-end",
                            center: "center",
                          }[cell.column.align || "start"],
                          alignItems: "center",
                        }}
                      >
                        {cell.render("Cell")}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 6,
        }}
      >
        <div
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            variant: "text.body1",
            color: "muted",
          }}
        >
          <span>Showing</span>
          <DropdownSelect
            options={["5", "10", "25", "50"]}
            value={`${pageSize}`}
            onChange={({ selectedItem }) =>
              setPageSize(Number.parseInt(selectedItem ?? "10"))
            }
          />
          <span>results per page from a total of {totalCount} results</span>
        </div>
        <Pagination
          page={pageIndex + 1}
          count={pageCount}
          onChange={(page) => gotoPage(page - 1)}
        />
      </div>
    </div>
  )
}

export default memo(Table)

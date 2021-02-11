/** @jsxRuntime classic /
/** @jsx jsx */
import { jsx } from "theme-ui"
import { useTable, Column, usePagination, useFlexLayout } from "react-table"
import { Pagination, Paper, DropdownSelect } from "../"
import { memo, useEffect, useMemo } from "react"

export interface TableProps {
  /** Table title */
  title?: string

  /** Definition of the table columns */
  columns: Column<Record<string, unknown>>[]
  /** Data to be displayed in the table */
  data: Record<string, unknown>[]

  /** If `true`, the table will be displayed in a loading state */
  loading?: boolean

  // filter
  // sorting

  /** If `true`, the table pagination will be controlled by the parent */
  manualPagination?: boolean
  /** Used if manualPagination is `true`. The total count of items in the table */
  totalCount: number
  /** Used if manualPagination is `true`. The total count of pages in the table */
  pageCount?: number
  /** Used if manualPagination is `true`. The current page being displayed */
  currentPage?: number
  /** If manualPagination is `true` it is the controlled page size of the table. If manualPagination is `false` it defines the initial pageSize of the table */
  pageSize?: number
  /** Callback called when the page size or current page of the table changes */
  onChangePagination?: ({
    pageSize,
    currentPage,
  }: {
    pageSize: number
    currentPage: number
  }) => void
}

const Table = memo(function Table({
  columns,
  data,
  title,
  // loading,
  manualPagination,
  onChangePagination,
  pageSize: controlledPageSize,
  pageCount: controlledPageCount,
  totalCount: controlledTotalCount,
  currentPage: controlledPage,
}: TableProps) {
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
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      manualPagination,
      ...(controlledPageCount ? { pageCount: controlledPageCount } : {}), // unexpected behaviour from react-table if pageCount is passed as undefined instead of not passed at all
      initialState: {
        pageSize: controlledPageSize ?? 10,
        pageIndex: controlledPage ? controlledPage - 1 : 0,
      },
    },
    usePagination,
    useFlexLayout
  )

  useEffect(() => {
    if (onChangePagination) {
      onChangePagination({
        pageSize,
        currentPage: pageIndex + 1,
      })
    }
  }, [onChangePagination, pageIndex, pageSize])

  const totalCount = useMemo(() => {
    if (manualPagination) return controlledTotalCount
    return data.length
  }, [manualPagination, controlledTotalCount, data])

  return (
    <Paper padding={0} elevation={1}>
      <div
        sx={{
          px: 5,
          py: 6,
          variant: "text.heading2",
        }}
      >
        {title}
      </div>

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
                  const { key, ...headerProps } = column.getHeaderProps()
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
                          px: 5,
                          py: 2,
                          color: cell.column.highlight ? "#0082FC" : "text", // TODO: use theme colors
                          variant: "text.body1",
                          textAlign: cell.column.align ?? "start",
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
    </Paper>
  )
})

export default Table

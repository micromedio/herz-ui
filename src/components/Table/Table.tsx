/** @jsxRuntime classic /
/** @jsx jsx */
import { jsx, Checkbox, Label, HerzUITheme } from "theme-ui"
import {
  useTable,
  Column,
  usePagination,
  useFlexLayout,
  useSortBy,
  SortingRule,
} from "react-table"
import { Pagination, Selector } from "../"
import { memo, useEffect, useMemo } from "react"
import useRowSelection from "./useRowSelection"
import Icon from "../Icon/Icon"

const INTERNAL_SELECTION_COLUMN_ID = "INTERNAL_SELECTION_COLUMN_ID"

interface DataType extends Record<string, unknown> {
  id: string
}

export interface TableProps {
  /** Definition of the table columns */
  columns: Array<Column<DataType>>
  /** Data to be displayed in the table */
  data: Array<DataType>

  /** If `true`, the table will have selectable rows with a checkbox */
  rowsSelectable?: boolean
  /** Selected row ids */
  selectedRowIds?: Record<string, boolean>
  /** Callback called when row selection changes */
  onRowSelectionChange?: (selectedRowIds: Record<string, boolean>) => void

  /** If `true`, the table will be displayed in a loading state */
  loading?: boolean

  // If `true`, the table sorting will be controlled by the parent */
  manualSorting?: boolean

  /** Initial sorting rules */
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

  /** Callback called when pagination or sorting changes */
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

  rowsSelectable = false,
  selectedRowIds: controlledSelectedRowIds,
  onRowSelectionChange,

  // Sorting
  manualSorting = false,
  initialSortBy,

  // Pagination
  manualPagination = false,
  pageCount: controlledPageCount,
  totalCount: controlledTotalCount = data.length,
  initialPageSize = 10,
  initialPageIndex = 0,

  onTableChange,
}: TableProps) => {
  const {
    selectedRowIds,
    setRowsSelected,
    toggleRowSelected,
  } = useRowSelection({
    selectedRowIds: controlledSelectedRowIds,
    onChange: onRowSelectionChange,
  })

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
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
      getRowId: (row, relativeIndex) => row?.id ?? relativeIndex,
    },
    useSortBy,
    usePagination,
    useFlexLayout,

    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        const selectColumn = {
          id: INTERNAL_SELECTION_COLUMN_ID,
          width: 48,
        }

        if (rowsSelectable) return [selectColumn, ...columns]
        return columns
      })
    }
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

  const checkboxStyles = {
    "input:checked ~ &": {
      color: "secondary.0",
    },
    "input:focus ~ &": {
      color: "secondary.0",
      bg: "transparent",
    },
  }

  const allPageRowsSelected = useMemo(() => {
    return !page.some((row) => !selectedRowIds[row.id])
  }, [page, selectedRowIds])

  // const somePageRowsSelected = useMemo(() => {
  //   return page.some((row) => selectedRowIds[row.id])
  // }, [page, selectedRowIds])

  return (
    <div
      {...getTableProps()}
      sx={{
        width: "100%",
      }}
    >
      <div>
        {headerGroups.map((headerGroup) => {
          const { key, ...headerGroupProps } = headerGroup.getHeaderGroupProps()
          return (
            <div
              {...headerGroupProps}
              key={key}
              sx={{
                borderBottom: (theme: HerzUITheme) =>
                  `1px solid ${theme.colors.text[90]}`,
                px: 1,
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
                      display: "flex",
                      alignItems: "center",
                      pl: 6,
                      pb: 3,
                      color: column.isSorted ? "text.0" : "text.40",
                      variant: column.isSorted ? "text.heading3" : "text.body1",
                      textAlign: column.align ?? "start",
                    }}
                  >
                    {column.id === INTERNAL_SELECTION_COLUMN_ID ? (
                      <Label key={key}>
                        <Checkbox
                          sx={checkboxStyles}
                          checked={allPageRowsSelected}
                          // indeterminate={
                          //   !allPageRowsSelected && somePageRowsSelected
                          // }
                          onChange={() =>
                            setRowsSelected(
                              page.map((row) => row.id),
                              !allPageRowsSelected
                            )
                          }
                          aria-label={
                            allPageRowsSelected
                              ? "unselect all rows"
                              : "select all rows"
                          }
                        />
                      </Label>
                    ) : (
                      <div
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        {column.render("Header")}
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <Icon
                              name="IconArrowNarrowDown"
                              size={16}
                              sx={{ color: "text.0" }}
                            />
                          ) : (
                            <Icon
                              name="IconArrowNarrowUp"
                              size={16}
                              sx={{ color: "text.0" }}
                            />
                          )
                        ) : (
                          ""
                        )}
                      </div>
                    )}
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
                borderBottom: (theme: HerzUITheme) =>
                  `1px solid ${theme.colors.text[90]}`,
                transition: "all 0.2s",
                backgroundColor: !!selectedRowIds[row.id]
                  ? "secondary.alpha.95"
                  : "transparent",
              }}
            >
              <div
                {...rowProps}
                sx={{
                  borderRadius: 3,
                  transition: "all 0.2s",

                  "&:hover": {
                    backgroundColor: !selectedRowIds[row.id]
                      ? "secondary.alpha.95"
                      : "transparent",
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
                        pl: 6,
                        py: 2,
                        color: cell.column.highlight ? "secondary.0" : "text.0",
                        variant: "text.body1",
                        justifyContent: {
                          start: "flex-start",
                          end: "flex-end",
                          center: "center",
                        }[cell.column.align || "start"],
                        alignItems: "center",
                      }}
                    >
                      {cell.column.id === INTERNAL_SELECTION_COLUMN_ID ? (
                        <Label key={key}>
                          <Checkbox
                            sx={checkboxStyles}
                            checked={!!selectedRowIds[row.id]}
                            onChange={() => toggleRowSelected(row.id)}
                            aria-label={`select row ${row.id}`}
                          />
                        </Label>
                      ) : (
                        cell.render("Cell")
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      <div
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 6,
          pt: 6,
        }}
      >
        <div
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            variant: "text.body1",
            color: "text.40",
          }}
        >
          <span>Showing</span>
          <div sx={{ flexShrink: 0 }}>
            <Selector
              options={[
                { value: 5, label: "5" },
                { value: 10, label: "10" },
                { value: 25, label: "25" },
                { value: 50, label: "50" },
              ]}
              value={pageSize}
              onChange={({ selectedItem }) => {
                if (selectedItem)
                  setPageSize(Number.parseInt(selectedItem.toString() ?? "10"))
              }}
            />
          </div>
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

/** @jsxImportSource theme-ui */
import { get } from "theme-ui"
import {
  useTable,
  Column,
  usePagination,
  useFlexLayout,
  useSortBy,
  SortingRule,
} from "react-table"
import { Pagination, Select, Skeleton } from "../"
import { HTMLAttributes, memo, ReactElement, useEffect, useMemo } from "react"
import useRowSelection from "./useRowSelection"
import Icon from "../Icon/Icon"
import Checkbox from "../Checkbox/Checkbox"

const INTERNAL_SELECTION_COLUMN_ID = "INTERNAL_SELECTION_COLUMN_ID"
const INTERNAL_ACTIVE_COLUMN_ID = "INTERNAL_ACTIVE_COLUMN_ID"

interface DataType extends Record<string, unknown> {
  id: string
}

export interface TableProps {
  /** Definition of the table columns */
  columns: Array<Column<DataType> & { Loader?: () => ReactElement }>
  /** Data to be displayed in the table */
  data: Array<DataType>

  /** If `true`, the table will have clickable rows */
  rowClickable?: boolean
  /** Callback called when a row is clicked */
  onRowClick?: (row: DataType) => void
  /** Active row ids */
  activeRowIds?: Record<string, boolean>

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

  className?: HTMLAttributes<HTMLDivElement>["className"]
  style?: HTMLAttributes<HTMLDivElement>["style"]
}

const Table = ({
  columns,
  data,
  loading,

  rowClickable = false,
  onRowClick,
  activeRowIds,

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
  className,
  style,
}: TableProps) => {
  const { selectedRowIds, setRowsSelected, toggleRowSelected } =
    useRowSelection({
      selectedRowIds: controlledSelectedRowIds,
      onChange: onRowSelectionChange,
    })

  const loadingRows: Array<DataType> = useMemo(() => {
    const rowsArray = []
    // eslint-disable-next-line unicorn/new-for-builtins
    for (let index = 0; index < initialPageSize; index++) {
      rowsArray.push({ id: `${index}` })
    }
    return rowsArray
  }, [initialPageSize])

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
      data: loading ? loadingRows : data,

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
      hooks.visibleColumns.push((allColumns) => {
        const selectColumn: Column<DataType> = {
          id: INTERNAL_SELECTION_COLUMN_ID,
          width: 48,
          fixedWidth: true,
        }
        const activeColumn: Column<DataType> = {
          id: INTERNAL_ACTIVE_COLUMN_ID,
          width: 80,
          fixedWidth: true,
        }

        let columns: Column<DataType>[] = [...allColumns]

        if (rowsSelectable) {
          columns = [selectColumn, ...columns]
        }
        if (activeRowIds && Object.keys(activeRowIds).length > 0) {
          columns = [...columns, activeColumn]
        }

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

  const allPageRowsSelected = useMemo(() => {
    return !page.some((row) => !selectedRowIds[row.id])
  }, [page, selectedRowIds])

  const somePageRowsSelected = useMemo(() => {
    return page.some((row) => selectedRowIds[row.id])
  }, [page, selectedRowIds])

  return (
    <div
      {...getTableProps()}
      sx={{
        display: "grid",
        gridTemplateRows: "minmax(0, 1fr) auto",
        overflow: "auto",
        width: "100%",
        backgroundColor: "#fff",
      }}
      className={className}
      style={style}
    >
      <div sx={{ overflow: "auto", backgroundColor: "inherit" }}>
        {/* Table Headers */}
        <div
          sx={{
            minWidth: "fit-content",
            position: "sticky",
            top: 0,
            backgroundColor: "inherit",
            zIndex: 1,
          }}
        >
          {headerGroups.map((headerGroup) => {
            const { key, ...headerGroupProps } =
              headerGroup.getHeaderGroupProps()
            return (
              <div
                key={key}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                }}
              >
                <div
                  {...headerGroupProps}
                  key={key}
                  sx={{
                    borderBottom: (theme) =>
                      `1px solid ${get(theme, "colors.text.90")}`,
                    px: 2,
                  }}
                >
                  {headerGroup.headers.map((column) => {
                    const { key, style, ...headerProps } =
                      column.getHeaderProps(column.getSortByToggleProps())

                    return (
                      <div
                        {...headerProps}
                        key={key}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          pl: 7,
                          pb: 3,
                          color: column.isSorted ? "text" : "text.40",
                          variant: column.isSorted
                            ? "text.heading3"
                            : "text.body1",
                          ...style,
                          ...(column.fixedWidth ? { flexGrow: 0 } : {}),
                        }}
                      >
                        {column.id === INTERNAL_SELECTION_COLUMN_ID ? (
                          <Checkbox
                            checked={allPageRowsSelected}
                            indeterminate={
                              !allPageRowsSelected && somePageRowsSelected
                            }
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
                        ) : (
                          <div
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              flexGrow: 1,
                              justifyContent: {
                                start: "flex-start",
                                end: "flex-end",
                                center: "center",
                              }[column.align || "start"],
                            }}
                          >
                            {column.render("Header")}
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <Icon
                                  name="IconArrowNarrowDown"
                                  size={16}
                                  sx={{ color: "text" }}
                                />
                              ) : (
                                <Icon
                                  name="IconArrowNarrowUp"
                                  size={16}
                                  sx={{ color: "text" }}
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
                {activeRowIds && (
                  <div
                    sx={{
                      width: 4,
                      borderBottom: (theme) =>
                        `1px solid ${get(theme, "colors.text.90")}`,
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Table Body */}
        <div {...getTableBodyProps()}>
          {/* Rows */}
          {page.map((row) => {
            prepareRow(row)
            const { key, ...rowProps } = row.getRowProps()
            return (
              <div
                key={key}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                }}
              >
                <div
                  sx={{
                    p: 2,
                    minWidth: "fit-content",
                    borderBottom: (theme) =>
                      `1px solid ${get(theme, "colors.text.90")}`,
                    transition: "all 0.2s",
                    backgroundColor: !!selectedRowIds[row.id]
                      ? "secondary.alpha.95"
                      : "transparent",
                  }}
                >
                  <div
                    {...rowProps}
                    onClick={() => {
                      if (rowClickable) onRowClick?.(row.original)
                    }}
                    sx={{
                      borderRadius: 3,
                      transition: "all 0.2s",
                      cursor: rowClickable ? "pointer" : "auto",

                      "&:hover": {
                        backgroundColor: !selectedRowIds[row.id]
                          ? "secondary.alpha.95"
                          : "transparent",
                      },
                    }}
                  >
                    {row.cells.map((cell, index: number) => {
                      const { key, style, ...cellProps } = cell.getCellProps()

                      if (cell.column.id === INTERNAL_ACTIVE_COLUMN_ID) {
                        return (
                          <div
                            {...cellProps}
                            key={key}
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                              alignItems: "center",
                              color: "secondary",
                              pl: 7,
                              pr: 7,
                              ...style,
                              ...(cell.column.fixedWidth
                                ? { flexGrow: 0 }
                                : {}),
                            }}
                          >
                            {!!activeRowIds?.[row.id] && (
                              <Icon name="IconEye" />
                            )}
                          </div>
                        )
                      }

                      return (
                        <div
                          {...cellProps}
                          key={key}
                          sx={{
                            display: "flex",
                            pl: 7,
                            py: 2,
                            color: cell.column.highlight ? "secondary" : "text",
                            variant: "text.body1",
                            justifyContent: {
                              start: "flex-start",
                              end: "flex-end",
                              center: "center",
                            }[cell.column.align || "start"],
                            alignItems: "center",
                            fontWeight: activeRowIds?.[row.id]
                              ? "semibold"
                              : "medium",
                            wordBreak: "break-all",
                            ...style,
                            ...(cell.column.fixedWidth ? { flexGrow: 0 } : {}),
                          }}
                        >
                          {(() => {
                            if (
                              cell.column.id === INTERNAL_SELECTION_COLUMN_ID
                            ) {
                              return (
                                <div
                                  sx={{ display: "flex" }}
                                  onClick={(event) => event.stopPropagation()} // So that checkbox click doesn't bubble up to the row and triggers onRowClick()
                                >
                                  <Checkbox
                                    checked={!!selectedRowIds[row.id]}
                                    onChange={() => toggleRowSelected(row.id)}
                                    aria-label={`select row ${row.id}`}
                                  />
                                </div>
                              )
                            }
                            const Loader = columns[index].Loader
                            if (loading) {
                              if (Loader) return Loader()
                              return <Skeleton variant="text" width="100%" />
                            }
                            return cell.render("Cell")
                          })()}
                        </div>
                      )
                    })}
                  </div>
                </div>
                {activeRowIds && (
                  <div
                    sx={{
                      width: 4,
                      borderBottom: (theme) =>
                        `1px solid ${get(theme, "colors.text.90")}`,
                      ...(activeRowIds[row.id]
                        ? {
                            backgroundColor: "primary",
                            boxShadow: (theme) =>
                              `0px 1px 12px ${get(
                                theme,
                                "colors.primary.alpha.70"
                              )}`,
                            borderRadius: "4px 0px 0px 4px",
                          }
                        : {}),
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Pagination */}
      <div
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 8,
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
            <Select
              value={pageSize}
              defaultValue={initialPageSize}
              onChange={(selectedItem) => {
                if (selectedItem)
                  setPageSize(Number.parseInt(selectedItem.toString() ?? "10"))
              }}
            >
              <Select.Option value={5}>5</Select.Option>
              <Select.Option value={10}>10</Select.Option>
              <Select.Option value={25}>25</Select.Option>
              <Select.Option value={50}>50</Select.Option>
            </Select>
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

/** @jsxRuntime classic /
/** @jsx jsx */
import { jsx } from "theme-ui"
import { useTable, Column } from "react-table"
import { Pagination, Paper } from "../"

// interface TableRowProps {
//   children: React.ReactNode
// }

// const TableRow = ({ children }: TableRowProps) => {
//   return <div>{children}</div>
// }

export interface TableProps {
  /** Table title */
  title?: string

  /** Columns */
  columns: Column<Record<string, unknown>>[]
  /** Data */
  data: Record<string, unknown>[]
}

const Table = ({ columns, data, title }: TableProps) => {
  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

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
      <div>
        <table
          {...getTableProps()}
          sx={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              // the spread has a 'key', but the eslint rule can't detect it
              // eslint-disable-next-line react/jsx-key
              <tr
                {...headerGroup.getHeaderGroupProps()}
                sx={{
                  borderBottom: "1px solid #E8E8E9", // TODO: use theme colors
                }}
              >
                {headerGroup.headers.map((column) => (
                  // the spread has a 'key', but the eslint rule can't detect it
                  // eslint-disable-next-line react/jsx-key
                  <th
                    {...column.getHeaderProps()}
                    sx={{
                      px: 6,
                      pb: 3,
                      color: "#777777", // TODO: use theme colors
                      variant: "text.body1",
                      textAlign: column.align ?? "start",
                    }}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              return (
                // the spread has a 'key', but the eslint rule can't detect it
                // eslint-disable-next-line react/jsx-key
                <tr
                  {...row.getRowProps()}
                  sx={{
                    borderBottom: "1px solid #E8E8E9", // TODO: use theme colors
                  }}
                >
                  {row.cells.map((cell) => {
                    return (
                      // the spread has a 'key', but the eslint rule can't detect it
                      // eslint-disable-next-line react/jsx-key
                      <td
                        {...cell.getCellProps()}
                        sx={{
                          px: 6,
                          py: 3,
                          color: cell.column.highlight ? "#0082FC" : "text", // TODO: use theme colors
                          variant: "text.body1",
                          textAlign: cell.column.align ?? "start",
                        }}
                      >
                        {cell.render("Cell")}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 6,
        }}
      >
        <div>page size changer</div>
        <Pagination />
      </div>
    </Paper>
  )
}

export default Table

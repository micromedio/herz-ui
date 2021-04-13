/** @jsxRuntime classic /
/** @jsx jsx */
import { jsx } from "theme-ui"
import React, { useCallback, useMemo, useState } from "react"
import Table, { TableProps } from "./Table"
import { Meta, Story } from "@storybook/react/types-6-0"
import data from "./__mocks__/data"
import _ from "lodash"
import { action } from "@storybook/addon-actions"
import Paper from "../Paper/Paper"

export default {
  title: "Design System/Table",
  component: Table,
  decorators: [
    (Story) => (
      <Paper sx={{ display: "grid", height: 700, px: 0 }}>
        <Story />
      </Paper>
    ),
  ],
} as Meta

const columns = [
  {
    Header: "Study #",
    accessor: "id",
    highlight: true,
  },
  {
    Header: "Patient",
    accessor: "patient.name",
    Cell({
      row,
    }: {
      row: { original: { patient: { name: string; ssn: string } } }
    }) {
      return (
        <div
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <span>{row.original?.patient?.name}</span>
          <span sx={{ variant: "text.body2", color: "text.40" }}>
            SSN {row.original?.patient?.ssn}
          </span>
        </div>
      )
    },
  },
  {
    Header: "Referring physician",
    accessor: "physician.name",
  },
  {
    Header: "Study status",
    accessor: "status",
    Cell: ({ value }: { value: "draft" | "pre-registered" | "pending" }) => {
      return (
        {
          draft: "In Draft",
          "pre-registered": "Pre-registered",
          pending: "Pending report",
        }[value] ?? ""
      )
    },
  },
  {
    Header: "Start date",
    accessor: "startDate",
    Cell: ({ value }: { value: Date }) => value.toLocaleDateString(),
  },
] as TableProps["columns"]

const Template: Story<TableProps> = (props) => <Table {...props} />

// Each story then reuses that template
export const Example = Template.bind({})

Example.args = {
  columns,
  data: [
    {
      ...data[0],
      id: "WORD_BREAK_TEST",
      physician: {
        name:
          "really_long_string_without_spaces_that_should_break_into_a_new_line",
      },
    },
    ...data,
  ],
}

const ActiveRowTemplate: Story<TableProps> = (props: TableProps) => {
  const [activeRowIds, setActiveRowIds] = useState<TableProps["activeRowIds"]>({
    HBPM457: true,
  })

  return (
    <Table
      {...props}
      onRowClick={({ id }) => setActiveRowIds({ [id]: true })}
      activeRowIds={activeRowIds}
    />
  )
}
export const ActiveRowExample = ActiveRowTemplate.bind({})

ActiveRowExample.args = {
  columns,
  data,
  rowClickable: true,
}

const ControlledPaginationTemplate: Story<TableProps> = (props: TableProps) => {
  const [paginatedData, setPaginatedData] = useState(props.data.slice(0, 10))
  const [pageSize, setPageSize] = useState(10)

  const pageCount = useMemo(() => {
    const size = props.data.length
    return Math.ceil(size / pageSize)
  }, [props.data, pageSize])

  const onTableChange = useCallback(
    ({ pageIndex, pageSize }) => {
      setPageSize(pageSize)

      // simulating server-side pagination
      setPaginatedData(
        props.data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
      )
    },
    [props.data]
  )

  return (
    <Table
      {...props}
      data={paginatedData}
      manualPagination
      pageCount={pageCount}
      totalCount={data.length}
      onTableChange={onTableChange}
    />
  )
}
export const ControlledPaginationExample = ControlledPaginationTemplate.bind({})

ControlledPaginationExample.args = {
  columns,
  data,
}

const ControlledSortingTemplate: Story<TableProps> = (props: TableProps) => {
  const [sortedData, setSortedData] = useState(props.data)

  const onTableChange = useCallback(
    ({ sortBy }) => {
      let temporaryData = props.data
      // simulating server-side sorting
      if (sortBy) {
        temporaryData = _.sortBy(temporaryData, (item) =>
          _.get(item, sortBy.id)
        )
        if (sortBy.desc) temporaryData = temporaryData.reverse()
      }
      setSortedData(temporaryData)
    },
    [props.data]
  )

  return (
    <Table
      {...props}
      manualSorting
      data={sortedData}
      onTableChange={onTableChange}
    />
  )
}
export const ControlledSortingExample = ControlledSortingTemplate.bind({})

ControlledSortingExample.args = {
  columns,
  data,
  initialSortBy: {
    id: "patient.name",
    desc: true,
  },
}

const SelectRowsTemplate: Story<TableProps> = (props: TableProps) => {
  const [selectedRowIds, setSeletedRowIds] = useState<Record<string, boolean>>({
    HBPM557: true,
    HBPM510: true,
  })

  const onRowSelectionChangeAction = action("onRowSelectionChange")

  const onRowSelectionChange = useCallback(
    (rowIds) => {
      onRowSelectionChangeAction(rowIds)
      setSeletedRowIds(rowIds)
    },
    [setSeletedRowIds, onRowSelectionChangeAction]
  )

  return (
    <React.Fragment>
      <Table
        {...props}
        selectedRowIds={selectedRowIds}
        onRowSelectionChange={onRowSelectionChange}
      />
    </React.Fragment>
  )
}
export const SelectRowsExample = SelectRowsTemplate.bind({})

SelectRowsExample.args = {
  columns,
  data,
  initialPageSize: 5,
  rowsSelectable: true,
}

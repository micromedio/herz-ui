import React, { useMemo, useState } from "react"
import Table, { TableProps } from "./Table"
import { Meta, Story } from "@storybook/react/types-6-0"

export default {
  title: "Design System/Table",
  component: Table,
} as Meta

const Template: Story<TableProps> = (props) => <Table {...props} />

// Each story then reuses that template
export const Example = Template.bind({})

const columns = [
  {
    Header: "Study #",
    accessor: "id",
    highlight: true,
  },
  {
    Header: "Patient",
    accessor: "patient.name",
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
]
const data = [
  {
    id: "HBPM037",
    patient: {
      name: "Gregory C. Leonard",
      ssn: "42318026",
    },
    physician: {
      name: "Allie Sanchez",
    },
    status: "draft",
    startDate: new Date("12/23/2020"),
  },
  {
    id: "HBPM036",
    patient: {
      name: "Patricia V. Carroll",
      ssn: "547759769",
    },
    physician: {
      name: "Steven Nissen",
    },
    status: "pending",
    startDate: new Date("12/23/2020"),
  },
  {
    id: "HBPM035",
    patient: {
      name: "Glen A. Ortiz",
      ssn: "609513889",
    },
    physician: {
      name: "Allie Sanchez",
    },
    status: "pre-registered",
    startDate: new Date("12/22/2020"),
  },
  ...Array.from({ length: 50 })
    .fill("")
    .map(() => ({
      id: "HBPM035",
      patient: {
        name: `Glen A. Ortiz ${(Math.random() * 100).toFixed(0)}`,
        ssn: `${(Math.random() * 100000000).toFixed(0)}`,
      },
      physician: {
        name: "Allie Sanchez",
      },
      status: "pre-registered",
      startDate: new Date("12/22/2020"),
    })),
]

Example.args = {
  title: "Table Title",
  columns,
  data,
  pageSize: 5,
}

const ControlledPaginationTemplate: Story<TableProps> = (props: TableProps) => {
  const [pageSize, setPageSize] = useState(props.pageSize ?? 10)
  const [currentPage, setCurrentPage] = useState(1)

  const pageCount = useMemo(() => {
    const size = props.data.length
    return Math.ceil(size / pageSize)
  }, [props.data, pageSize])

  const paginatedData = useMemo(() => {
    return props.data.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    )
  }, [props.data, currentPage, pageSize])

  return (
    <Table
      {...props}
      data={paginatedData}
      manualPagination
      pageCount={pageCount}
      pageSize={pageSize}
      currentPage={currentPage}
      totalCount={data.length}
      onChangePagination={({ currentPage, pageSize }) => {
        setPageSize(pageSize)
        setCurrentPage(currentPage)
      }}
    />
  )
}
export const ControlledPaginationExample = ControlledPaginationTemplate.bind({})

ControlledPaginationExample.args = {
  title: "Table Title",
  columns,
  data,
  pageSize: 10,
}

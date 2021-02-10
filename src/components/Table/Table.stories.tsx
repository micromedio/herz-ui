import React from "react"
import Table, { TableProps } from "./Table"
import { Meta, Story } from "@storybook/react/types-6-0"

export default {
  title: "Design System/Table",
  component: Table,
} as Meta

const Template: Story<TableProps> = (props) => <Table {...props} />

// Each story then reuses that template
export const Example = Template.bind({})

Example.args = {
  title: "Table Title",
  columns: [
    {
      Header: "Study #",
      accessor: "id",
      highlight: true,
    },
    {
      Header: "Patient",
      accessor: "patient.name",
      // Cell: ({ value }) =>
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
  ],
  data: [
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
  ],
}

import React from "react"
import TableFilters, { TableFiltersProps } from "./TableFilters"
import { Meta, Story } from "@storybook/react/types-6-0"
import { action } from "@storybook/addon-actions"

export default {
  title: "Design System/TableFilters",
  component: TableFilters,
} as Meta

const Template: Story<TableFiltersProps> = (props) => (
  <TableFilters {...props} />
)

// Each story then reuses that template
export const Example = Template.bind({})
Example.args = {
  actions: [
    {
      label: "New Study",
      onClick: action("newStudy"),
    },
  ],
  search: {
    placeholder: "Search studies by ID, patient or doctor",
  },
  filters: [
    {
      key: "status",
      label: "Study status",
      options: [
        { value: "all", label: "All" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
        { value: "pending", label: "Pending" },
      ],
    },
    {
      key: "type",
      label: "Study type",
      options: [
        { value: "all", label: "All" },
        { value: "inactive", label: "Inactive" },
        { value: "pending", label: "Pending" },
      ],
    },
  ],
}

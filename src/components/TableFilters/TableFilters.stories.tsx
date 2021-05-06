import React from "react"
import TableFilters, { TableFiltersProps } from "./TableFilters"
import { Meta, Story } from "@storybook/react/types-6-0"
// import { action } from "@storybook/addon-actions"
import Button from "../Button/Button"
import Selector from "../Selector/Selector"
import Input from "../Input/Input"

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
  children: (
    <React.Fragment>
      <TableFilters.Item>
        <Button variant="filled" color="primary">
          New Study
        </Button>
      </TableFilters.Item>
      <TableFilters.Item grows>
        <Input
          placeholder="Search studies by ID, patient or doctor"
          iconName="IconSearch"
        />
      </TableFilters.Item>
      <TableFilters.Item label="Study status">
        <Selector
          options={[
            { value: "all", label: "All" },
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
            { value: "pending", label: "Pending" },
          ]}
        />
      </TableFilters.Item>
      <TableFilters.Item label="Study type">
        <Selector
          options={[
            { value: "all", label: "All" },
            { value: "inactive", label: "Inactive" },
            { value: "pending", label: "Pending" },
          ]}
        />
      </TableFilters.Item>
    </React.Fragment>
  ),
}

export const WithoutSearch = Template.bind({})
WithoutSearch.args = {
  children: (
    <React.Fragment>
      <TableFilters.Item>
        <Button variant="filled" color="primary">
          New Study
        </Button>
      </TableFilters.Item>
      <TableFilters.Item grows />
      <TableFilters.Item label="Study status">
        <Selector
          options={[
            { value: "all", label: "All" },
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
            { value: "pending", label: "Pending" },
          ]}
        />
      </TableFilters.Item>
      <TableFilters.Item label="Study type">
        <Selector
          options={[
            { value: "all", label: "All" },
            { value: "inactive", label: "Inactive" },
            { value: "pending", label: "Pending" },
          ]}
        />
      </TableFilters.Item>
    </React.Fragment>
  ),
}

export const CustomOrder = Template.bind({})
CustomOrder.args = {
  children: (
    <React.Fragment>
      <TableFilters.Item label="License status">
        <Selector
          options={[
            { value: "all", label: "All" },
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
            { value: "pending", label: "Pending" },
          ]}
          defaultValue="all"
        />
      </TableFilters.Item>
      <TableFilters.Item label="License type">
        <Selector
          options={[
            { value: "all", label: "All" },
            { value: "hardware", label: "Hardware" },
            { value: "software", label: "Software" },
          ]}
        />
      </TableFilters.Item>
      <TableFilters.Item label="Organization" grows minWidth={300}>
        <Input
          placeholder="Search by organization's name or handle"
          iconName="IconSearch"
        />
      </TableFilters.Item>
      <TableFilters.Item label="Issued at">
        <Selector options={[{ value: "30days", label: "Last 30 days" }]} />
      </TableFilters.Item>
      <TableFilters.Item label="Expires at">
        <Selector options={[{ value: "all", label: "All time" }]} />
      </TableFilters.Item>
      <TableFilters.Item>
        <Button variant="plain" color="secondary">
          Clear Filters
        </Button>
      </TableFilters.Item>
    </React.Fragment>
  ),
}

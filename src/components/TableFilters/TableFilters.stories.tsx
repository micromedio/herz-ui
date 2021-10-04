import React from "react"
import TableFilters, { TableFiltersProps } from "./TableFilters"
import { Meta, Story } from "@storybook/react/types-6-0"
import Button from "../Button/Button"
import Select from "../Select/Select"
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
        <Select>
          <Select.Option value="all">All</Select.Option>
          <Select.Option value="active">Active</Select.Option>
          <Select.Option value="inactive">Inactive</Select.Option>
          <Select.Option value="pending">Pending</Select.Option>
        </Select>
      </TableFilters.Item>
      <TableFilters.Item label="Study type">
        <Select>
          <Select.Option value="all">All</Select.Option>
          <Select.Option value="inactive">Inactive</Select.Option>
          <Select.Option value="pending">Pending</Select.Option>
        </Select>
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
        <Select>
          <Select.Option value="all">All</Select.Option>
          <Select.Option value="active">Active</Select.Option>
          <Select.Option value="inactive">Inactive</Select.Option>
          <Select.Option value="pending">Pending</Select.Option>
        </Select>
      </TableFilters.Item>
      <TableFilters.Item label="Study type">
        <Select>
          <Select.Option value="all">All</Select.Option>
          <Select.Option value="inactive">Inactive</Select.Option>
          <Select.Option value="pending">Pending</Select.Option>
        </Select>
      </TableFilters.Item>
    </React.Fragment>
  ),
}

export const CustomOrder = Template.bind({})
CustomOrder.args = {
  children: (
    <React.Fragment>
      <TableFilters.Item label="License status">
        <Select defaultValue="all">
          <Select.Option value="all">All</Select.Option>
          <Select.Option value="active">Active</Select.Option>
          <Select.Option value="inactive">Inactive</Select.Option>
          <Select.Option value="pending">Pending</Select.Option>
        </Select>
      </TableFilters.Item>
      <TableFilters.Item label="License type">
        <Select>
          <Select.Option value="all">All</Select.Option>
          <Select.Option value="inactive">Inactive</Select.Option>
          <Select.Option value="pending">Pending</Select.Option>
        </Select>
      </TableFilters.Item>
      <TableFilters.Item label="Organization" grows minWidth={300}>
        <Input
          placeholder="Search by organization's name or handle"
          iconName="IconSearch"
        />
      </TableFilters.Item>
      <TableFilters.Item label="Issued at">
        <Select>
          <Select.Option value="30days">Last 30 days</Select.Option>
        </Select>
      </TableFilters.Item>
      <TableFilters.Item label="Expires at">
        <Select>
          <Select.Option value="all">All time</Select.Option>
        </Select>
      </TableFilters.Item>
      <TableFilters.Item>
        <Button variant="plain" color="secondary">
          Clear Filters
        </Button>
      </TableFilters.Item>
    </React.Fragment>
  ),
}

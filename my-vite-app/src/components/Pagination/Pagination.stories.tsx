import React from "react"
import Pagination, { PaginationProps } from "./Pagination"
import { Meta, Story } from "@storybook/react/types-6-0"

export default {
  title: "Design System/Pagination",
  component: Pagination,
  argTypes: {
    count: {
      control: {
        type: "number",
        min: 1,
        max: 100,
        step: 1,
      },
    },
    defaultPage: {
      control: {
        type: "number",
        min: 1,
        max: 100,
        step: 1,
      },
    },
    page: {
      control: {
        type: "number",
        min: 1,
        max: 100,
        step: 1,
      },
    },
  },
} as Meta

const Template: Story<PaginationProps> = (props) => <Pagination {...props} />

// Each story then reuses that template
export const Example = Template.bind({})

Example.args = {
  count: 20,
}

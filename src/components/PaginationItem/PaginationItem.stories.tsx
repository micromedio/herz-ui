import React from "react"
import PaginationItem, { PaginationItemProps } from "./PaginationItem"
import { Meta, Story } from "@storybook/react/types-6-0"

export default {
  title: "Design System/Pagination/PaginationItem",
  component: PaginationItem,

  argTypes: {
    page: {
      control: {
        type: "number",
        min: 1,
        max: 100,
        step: 1,
      },
    },
    type: {
      control: {
        type: "inline-radio",
      },
    },
  },
} as Meta

const Template: Story<PaginationItemProps> = (props) => (
  <PaginationItem {...props} />
)

// Each story then reuses that template
export const Example = Template.bind({})
Example.args = {
  page: 1,
  type: "page",
}

export const Selected = Template.bind({})
Selected.args = {
  page: 1,
  type: "page",
  selected: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  type: "first",
  disabled: true,
}

export const First = Template.bind({})
First.args = {
  type: "first",
}

export const Last = Template.bind({})
Last.args = {
  type: "last",
}

export const Next = Template.bind({})
Next.args = {
  type: "next",
}

export const Previous = Template.bind({})
Previous.args = {
  type: "previous",
}

export const Ellipsis = Template.bind({})
Ellipsis.args = {
  type: "ellipsis",
}

import React from "react"
import Breadcrumbs, { BreadcrumbsProps } from "./Breadcrumbs"
import { Meta, Story } from "@storybook/react/types-6-0"

export default {
  title: "Design System/Breadcrumbs",
  component: Breadcrumbs,
} as Meta

const Template: Story<BreadcrumbsProps> = (props: BreadcrumbsProps) => {
  return (
    <Breadcrumbs {...props}>
      {/* <a href="#">Studies</a>
      <a href="#">New Study</a>
      <span>New patient</span> */}
    </Breadcrumbs>
  )
}

export const Example = Template.bind({})
Example.args = {
  children: [
    <a href="#" key={0}>
      Studies
    </a>,
    <a href="#" key={1}>
      New Study
    </a>,
    <span key={2}>New patient</span>,
  ],
}

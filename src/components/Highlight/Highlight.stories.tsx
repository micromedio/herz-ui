import React from "react"
import Highlight, { HighlightProps } from "./Highlight"
import { Meta, Story } from "@storybook/react/types-6-0"

export default {
  title: "Design System/Highlight",
  component: Highlight,
} as Meta

const Template: Story<HighlightProps> = (props) => <Highlight {...props} />

// Each story then reuses that template
export const Example = Template.bind({})

Example.args = {
  search: "highlight",
  text: "This is a simple text for highlighting purposes",
}

export const ColorChange = Template.bind({})

ColorChange.args = {
  backgroundColor: "primary.0",
  search: "highlight",
  text: "This is a simple text for highlighting purposes",
}

export const DoubleHighlight = Template.bind({})

DoubleHighlight.args = {
  search: "highlight",
  text:
    "This is a simple text for highlighting purposes and see it's possible to highlight twice or more times",
}

export const MultipleHighlight = Template.bind({})

MultipleHighlight.args = {
  search: "lorem",
  text:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
}

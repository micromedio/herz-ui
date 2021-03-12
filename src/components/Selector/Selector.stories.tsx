import React, { useState } from "react"
import { Meta, Story } from "@storybook/react/types-6-0"

import Selector, { SelectedItems, SelectorProps } from "./Selector"
import { mockedOptions } from "./__mocks__/options"

export default {
  title: "Design System/Selector",
  component: Selector,
} as Meta

const Template: Story<SelectorProps> = (props) => <Selector {...props} />

/** Multi selector controlled to make sure the selected items become persistent through state changes */
const MultiTemplate: Story<SelectorProps> = (props) => {
  const [selectedItems, setSelectedItems] = useState<SelectedItems>([])

  return (
    <Selector
      {...props}
      selectedItems={selectedItems}
      onSelectedItemsChange={(newSelectedItems) => {
        setSelectedItems(newSelectedItems)
      }}
    />
  )
}

export const Default = Template.bind({})

Default.args = {
  options: mockedOptions,
}

export const WithLabel = Template.bind({})

WithLabel.args = {
  options: mockedOptions,
  label: "Select an element: ",
}

export const MultipleSelection = MultiTemplate.bind({})

MultipleSelection.args = {
  options: mockedOptions,
  label: "Select one or multiple elements: ",
  multi: true,
}

export const Disabled = Template.bind({})

Disabled.args = {
  options: mockedOptions,
  label: "Select an element: ",
  disabled: true,
}

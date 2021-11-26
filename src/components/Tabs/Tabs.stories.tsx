/* eslint-disable react/jsx-key */
/** @jsxImportSource theme-ui */

import Tabs, { TabsProps } from "./Tabs"
import { Meta, Story } from "@storybook/react/types-6-0"

export default {
  title: "Design System/Tab",
  component: Tabs,
  decorators: [(Story) => <Story />],
  parameters: {
    creevey: {
      captureElement: "#root",
    },
  },
} as Meta

const Template: Story<TabsProps> = (props) => (
  <Tabs {...props} initialOpenIndex={1} />
)

// Each story then reuses that template
export const Default = Template.bind({})
Default.args = {
  children: [
    <Tabs.Tab title="Tab 1" />,
    <Tabs.Tab title="Tab 2" />,
    <Tabs.Tab title="Tab 3" />,
    <Tabs.Panel index={0}>Stuff Goes here</Tabs.Panel>,
    <Tabs.Panel index={1}>Other Goes here</Tabs.Panel>,
    <Tabs.Panel index={2}>More Stuff Goes here</Tabs.Panel>,
  ],
}

export const WithInitialOpen = Template.bind({})
WithInitialOpen.args = {
  ...Default.args,
  initialOpenIndex: 0,
}

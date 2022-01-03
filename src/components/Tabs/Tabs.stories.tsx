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
  <Tabs initialOpenIndex={1} {...props}>
    <Tabs.Tab key={0} title="Tab 1" />,
    <Tabs.Tab key={1} title="Tab 2" />,
    <Tabs.Tab key={2} title="Tab 3" />,
    <Tabs.Panel index={0}>Stuff Goes here</Tabs.Panel>,
    <Tabs.Panel index={1}>Other Goes here</Tabs.Panel>,
    <Tabs.Panel index={2}>More Stuff Goes here</Tabs.Panel>,
  </Tabs>
)

// Each story then reuses that template
export const Default = Template.bind({})

export const WithInitialOpen = Template.bind({})
WithInitialOpen.args = {
  initialOpenIndex: 0,
}

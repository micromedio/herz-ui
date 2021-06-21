/* eslint-disable react/jsx-key */
/** @jsxImportSource theme-ui */

import Tab, { TabProps } from "./Tab"
import { Meta, Story } from "@storybook/react/types-6-0"
import Paper from "../Paper/Paper"

export default {
  title: "Design System/Tab",
  component: Tab,
  decorators: [
    (Story) => (
      <Paper sx={{ p: 0, width: 500 }}>
        <Story />
      </Paper>
    ),
  ],
} as Meta

const Template: Story<TabProps> = (props) => (
  <Tab {...props} initialOpenIndex={1} />
)

// Each story then reuses that template
export const Default = Template.bind({})
Default.args = {
  children: [
    <Tab.Link title="Tab 1" />,
    <Tab.Link title="Tab 2" />,
    <Tab.Link title="Tab 3" />,
    <Tab.Panel index={0}>Stuff Goes here</Tab.Panel>,
    <Tab.Panel index={1}>Other Goes here</Tab.Panel>,
    <Tab.Panel index={2}>More Stuff Goes here</Tab.Panel>,
  ],
}

export const WithInitialOpen = Template.bind({})
WithInitialOpen.args = {
  ...Default.args,
  initialOpenIndex: 0,
}

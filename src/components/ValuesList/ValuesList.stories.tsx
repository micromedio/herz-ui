/** @jsxImportSource theme-ui */
import { Fragment } from "react"
import ValuesList, { ValuesListProps } from "./ValuesList"
import { Meta, Story } from "@storybook/react/types-6-0"
import Icon from "../Icon/Icon"

export default {
  title: "Design System/ValuesList",
  component: ValuesList,
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
} as Meta

const Template: Story<ValuesListProps> = (props) => <ValuesList {...props} />

// Each story then reuses that template
export const Default = Template.bind({})
Default.args = {
  children: (
    <Fragment>
      <ValuesList.Item>
        <ValuesList.Label>IP Address</ValuesList.Label>
        <ValuesList.Value>192.168.0.210</ValuesList.Value>
      </ValuesList.Item>
      <ValuesList.Item hideDivider>
        <ValuesList.Label>Connection Type</ValuesList.Label>
        <ValuesList.Value>IPv4 DHCP</ValuesList.Value>
      </ValuesList.Item>
    </Fragment>
  ),
}

export const WithIcons = Template.bind({})
WithIcons.args = {
  alignValues: "start",
  children: (
    <Fragment>
      <ValuesList.Item>
        <ValuesList.Label>ECG Monitor</ValuesList.Label>
        <ValuesList.Value>
          <span sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Icon name="IconRouter" sx={{ color: "secondary" }} /> WinCardio USB
          </span>
        </ValuesList.Value>
      </ValuesList.Item>
      <ValuesList.Item hideDivider>
        <ValuesList.Label>Electrodes</ValuesList.Label>
        <ValuesList.Value>
          <span sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Icon name="IconAlertTriangle" /> 6 connected
          </span>
        </ValuesList.Value>
      </ValuesList.Item>
    </Fragment>
  ),
}

export const WithLessSpacing = Template.bind({})
WithLessSpacing.args = {
  alignValues: "start",
  itemSpacing: "12px",
  children: (
    <Fragment>
      <ValuesList.Item>
        <ValuesList.Label>ECG Monitor</ValuesList.Label>
        <ValuesList.Value>
          <span sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Icon name="IconRouter" sx={{ color: "secondary" }} /> WinCardio USB
          </span>
        </ValuesList.Value>
      </ValuesList.Item>
      <ValuesList.Item hideDivider>
        <ValuesList.Label>Electrodes</ValuesList.Label>
        <ValuesList.Value>
          <span sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Icon name="IconAlertTriangle" /> 6 connected
          </span>
        </ValuesList.Value>
      </ValuesList.Item>
    </Fragment>
  ),
}

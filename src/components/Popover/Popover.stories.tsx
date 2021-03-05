import Popover, { PopoverProps } from "./Popover"
import { Meta, Story } from "@storybook/react/types-6-0"

export default {
  title: "Design System/Popover",
  component: Popover,
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 900,
          height: 900,
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta

const Template: Story<PopoverProps> = (props) => <Popover {...props} />

// Each story then reuses that template
export const Default = Template.bind({})
Default.args = {
  children: (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "tomato",
        height: 200,
        width: 200,
        padding: 16,
        borderRadius: 8,
      }}
    >
      Scroll to see how the popover moves
    </div>
  ),
  content: "tooltip",
  // content: (
  //   <div
  //     style={{
  //       height: 100,
  //       width: 100,
  //     }}
  //   >
  //     Custom content
  //   </div>
  // ),
}

/** @jsxImportSource theme-ui */
import Snackbar, { SnackbarProps } from "./Snackbar"
import { Meta, Story } from "@storybook/react/types-6-0"

export default {
  title: "Design System/Snackbar",
  component: Snackbar,
} as Meta

const Template: Story<SnackbarProps> = (props) => <Snackbar {...props} />

// Each story then reuses that template
export const Example = Template.bind({})
Example.args = {
  type: "success",
  title: "Title!",
  body: "Optional Body",
}

export const Success = Template.bind({})
Success.args = {
  type: "success",
  title: "Your file was uploaded!",
  body: (
    <span>
      The file <span sx={{ color: "#fff" }}>abcdef.jpg</span> was sucessfully
      uploaded
    </span>
  ),
}
export const Error = Template.bind({})
Error.args = {
  type: "error",
  title: "Something bad happened...",
}
export const Loading = Template.bind({})
Loading.args = {
  type: "loading",
  title: "Saving changes...",
}

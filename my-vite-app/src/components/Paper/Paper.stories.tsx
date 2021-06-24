import React from "react"
import Paper, { PaperProps } from "./Paper"
import { Meta, Story } from "@storybook/react/types-6-0"

export default {
  title: "Design System/Paper",
  component: Paper,
} as Meta

const Template: Story<PaperProps> = (props) => <Paper {...props} />

// Each story then reuses that template
export const Example = Template.bind({})

Example.args = {
  elevation: 1,
  children:
    "Reprehenderit exercitation nulla consequat veniam commodo sit ea pariatur excepteur sunt. Ut occaecat fugiat do laborum. In labore velit sunt elit ad exercitation officia. Aliquip aliqua minim laboris cillum anim exercitation minim fugiat. Magna aliqua consequat et ea. Nostrud mollit ad commodo labore. Cillum dolore ullamco fugiat ullamco ut magna excepteur. Labore ullamco exercitation excepteur ea. Proident qui ex enim pariatur laboris. Cupidatat excepteur non ea eiusmod mollit Lorem deserunt magna pariatur proident aute eiusmod Lorem. Non nulla velit anim occaecat veniam id officia proident. Qui proident non ea adipisicing qui aute magna labore fugiat occaecat deserunt minim. Cupidatat irure minim est laboris excepteur ea mollit et enim labore exercitation.",
}

// Each story then reuses that template
export const HigherElevation = Template.bind({})

HigherElevation.args = {
  elevation: 2,
  children:
    "Reprehenderit exercitation nulla consequat veniam commodo sit ea pariatur excepteur sunt. Ut occaecat fugiat do laborum. In labore velit sunt elit ad exercitation officia. Aliquip aliqua minim laboris cillum anim exercitation minim fugiat. Magna aliqua consequat et ea. Nostrud mollit ad commodo labore. Cillum dolore ullamco fugiat ullamco ut magna excepteur. Labore ullamco exercitation excepteur ea. Proident qui ex enim pariatur laboris. Cupidatat excepteur non ea eiusmod mollit Lorem deserunt magna pariatur proident aute eiusmod Lorem. Non nulla velit anim occaecat veniam id officia proident. Qui proident non ea adipisicing qui aute magna labore fugiat occaecat deserunt minim. Cupidatat irure minim est laboris excepteur ea mollit et enim labore exercitation.",
}

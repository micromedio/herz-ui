import EditableFieldGroup, { EditableFieldGroupProps } from "./Group"
import { Meta, Story } from "@storybook/react/types-6-0"
import EditableText from "../Text/Text"
import { useState } from "react"

export default {
  title: "Design System/EditableField/Group",
  component: EditableFieldGroup,
} as Meta

const Template: Story<EditableFieldGroupProps> = (
  props: EditableFieldGroupProps
) => {
  const [firstValue, setFirstValue] = useState("First")
  const [secondValue, setSecondValue] = useState("Second")

  const [firstDefaultValue, setFirstDefaultValue] = useState("First")
  const [secondDefaultValue, setSecondDefaultValue] = useState("Second")

  return (
    <EditableFieldGroup
      {...props}
      onSave={(values) => {
        props.onSave?.(values)
        setFirstDefaultValue(values.first)
        setSecondDefaultValue(values.second)
      }}
    >
      <EditableText
        name="first"
        value={firstValue}
        defaultValue={firstDefaultValue}
        onChange={(event) => setFirstValue(event.target.value)}
      />
      <span>texto blablabla</span>
      <EditableText
        name="second"
        value={secondValue}
        defaultValue={secondDefaultValue}
        onChange={(event) => setSecondValue(event.target.value)}
        controlsGroup
      />
    </EditableFieldGroup>
  )
}

// Each story then reuses that template
export const Default = Template.bind({})
Default.args = {}

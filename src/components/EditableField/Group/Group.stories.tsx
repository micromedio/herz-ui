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
      <div
        style={{
          display: "grid",
          gap: 6,
        }}
      >
        <EditableText
          name="first"
          value={firstValue}
          defaultValue={firstDefaultValue}
          onChange={(event) => setFirstValue(event.target.value)}
        />
        <EditableText
          name="second"
          value={secondValue}
          defaultValue={secondDefaultValue}
          onChange={(event) => setSecondValue(event.target.value)}
          controlsGroup
        />
      </div>
    </EditableFieldGroup>
  )
}

const TemplateWithTextArea: Story<EditableFieldGroupProps> = (
  props: EditableFieldGroupProps
) => {
  const [firstValue, setFirstValue] = useState("First")
  const [secondValue, setSecondValue] = useState("Second\n2")

  const [firstDefaultValue, setFirstDefaultValue] = useState("First")
  const [secondDefaultValue, setSecondDefaultValue] = useState("Second\n2")

  return (
    <EditableFieldGroup
      {...props}
      onSave={(values) => {
        props.onSave?.(values)
        setFirstDefaultValue(values.first)
        setSecondDefaultValue(values.second)
      }}
    >
      <div
        style={{
          display: "grid",
          gap: 6,
        }}
      >
        <EditableText
          name="first"
          value={firstValue}
          defaultValue={firstDefaultValue}
          onChange={(event) => setFirstValue(event.target.value)}
        />
        <EditableText
          controlsGroup
          defaultValue={secondDefaultValue}
          multiline
          name="second"
          onChange={(event) => setSecondValue(event.target.value)}
          rows={2}
          value={secondValue}
        />
      </div>
    </EditableFieldGroup>
  )
}

// Each story then reuses that template
export const Default = Template.bind({})
Default.args = {}

export const DefaultWithTextArea = TemplateWithTextArea.bind({})
DefaultWithTextArea.args = {}

import EditableFieldSelect, { EditableFieldSelectProps } from "./Select"
import { Meta, Story } from "@storybook/react/types-6-0"
import { useState } from "react"
import { action } from "@storybook/addon-actions"

export default {
  title: "Design System/EditableField/Select",
  component: EditableFieldSelect,
} as Meta

const mockedChildrenOptions = [
  {
    label: "CPF",
    value: "CPF",
  },

  {
    label: "CNPJ",
    value: "CNPJ",
  },
].map(({ label, value }) => (
  <EditableFieldSelect.Option key={value} value={value}>
    {label}
  </EditableFieldSelect.Option>
))

const Template: Story<EditableFieldSelectProps> = (
  props: EditableFieldSelectProps
) => {
  const [value, setValue] = useState<EditableFieldSelectProps["value"]>(
    props.value || ""
  )
  const [defaultValue, setDefaultValue] = useState<
    EditableFieldSelectProps["defaultValue"]
  >(props.defaultValue || "")

  return (
    <EditableFieldSelect
      {...props}
      value={value}
      defaultValue={defaultValue}
      onChange={(newValue) => {
        props.onChange?.(newValue)
        setValue(newValue)
      }}
      onSave={(newValue) => {
        props.onSave?.(newValue)
        setDefaultValue(newValue as EditableFieldSelectProps["value"])
      }}
    />
  )
}

const MultiTemplate: Story<EditableFieldSelectProps> = (
  props: EditableFieldSelectProps
) => {
  const [value, setValue] = useState<EditableFieldSelectProps["selectedItems"]>(
    props.selectedItems || []
  )
  const [defaultValue, setDefaultValue] = useState<
    EditableFieldSelectProps["defaultSelectedItems"]
  >(props.defaultSelectedItems || [])

  return (
    <EditableFieldSelect
      {...props}
      multi
      selectedItems={value}
      defaultSelectedItems={defaultValue}
      onSelectedItemsChange={(newValue) => {
        props.onSelectedItemsChange?.(newValue)
        setValue(newValue)
      }}
      onSave={(newValue) => {
        props.onSave?.(newValue)
        setDefaultValue(newValue as EditableFieldSelectProps["selectedItems"])
      }}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  value: "CPF",
  defaultValue: "CPF",
  helperText: "",
  status: undefined,
  onChange: action("onChange"),
  onSave: action("onSave"),
  saveOnBlur: false,
  resetOnBlur: true,
  children: mockedChildrenOptions,
}

export const Multi = MultiTemplate.bind({})
Multi.args = {
  selectedItems: ["CPF"],
  defaultSelectedItems: ["CPF"],
  onChange: action("onChange"),
  onSave: action("onSave"),
  saveOnBlur: false,
  resetOnBlur: true,
  children: mockedChildrenOptions,
}

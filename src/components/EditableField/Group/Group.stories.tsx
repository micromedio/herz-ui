/** @jsxImportSource theme-ui */
import EditableFieldGroup, { EditableFieldGroupProps } from "./Group"
import { Meta, Story } from "@storybook/react/types-6-0"
import EditableText from "../Text/Text"
import EditableSelect, { EditableFieldSelectProps } from "../Select/Select"
import EditableFieldAutocomplete from "../Autocomplete/Autocomplete"
import { useState } from "react"
import { mockedOptions } from "../../Autocomplete/__mocks__/options"
import Highlight from "../../Highlight/Highlight"

type AutocompleteItem = typeof mockedOptions[0]

export default {
  title: "Design System/EditableField/Group",
  component: EditableFieldGroup,
} as Meta

const Template: Story<EditableFieldGroupProps> = (
  props: EditableFieldGroupProps
) => {
  const [firstValue, setFirstValue] = useState("First")
  const [secondValue, setSecondValue] = useState("Second")
  const [thirdValue, setThirdValue] =
    useState<EditableFieldSelectProps["value"]>("third")
  const [fourthValue, setFourthValue] = useState<
    EditableFieldSelectProps["selectedItems"]
  >(["fourth"])

  const [firstDefaultValue, setFirstDefaultValue] = useState("First")
  const [secondDefaultValue, setSecondDefaultValue] = useState("Second")
  const [thirdDefaultValue, setThirdDefaultValue] =
    useState<EditableFieldSelectProps["defaultValue"]>("third")
  const [fourthDefaultValue, setFourthDefaultValue] = useState<
    EditableFieldSelectProps["defaultSelectedItems"]
  >(["fourth"])

  return (
    <EditableFieldGroup
      {...props}
      onSave={(values) => {
        props.onSave?.(values)
        setFirstDefaultValue(values.first)
        setSecondDefaultValue(values.second)
        setThirdDefaultValue(values.third)
        setFourthDefaultValue(values.fourth)
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
        />
        <EditableSelect
          name="third"
          value={thirdValue}
          defaultValue={thirdDefaultValue}
          onChange={setThirdValue}
        >
          <EditableSelect.Option value="third">Third</EditableSelect.Option>
          <EditableSelect.Option value="another">Another</EditableSelect.Option>
        </EditableSelect>
        <EditableSelect
          name="fourth"
          selectedItems={fourthValue}
          defaultSelectedItems={fourthDefaultValue}
          onSelectedItemsChange={setFourthValue}
          multi
          controlsGroup
        >
          <EditableSelect.Option value="fourth">Fourth</EditableSelect.Option>
          <EditableSelect.Option value="another">Another</EditableSelect.Option>
          <EditableSelect.Option value="somethingElse">
            Something Else
          </EditableSelect.Option>
        </EditableSelect>
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

const TemplateWithAutocomplete: Story<EditableFieldGroupProps> = (
  props: EditableFieldGroupProps
) => {
  const [items, setItems] = useState<AutocompleteItem[]>(mockedOptions)
  const [firstValue, setFirstValue] = useState("First")
  const [secondValue, setSecondValue] = useState<
    AutocompleteItem[] | null | undefined
  >([])

  const [firstDefaultValue, setFirstDefaultValue] = useState("First")
  const [secondDefaultValue, setSecondDefaultValue] = useState<
    AutocompleteItem[] | undefined
  >([])

  return (
    <EditableFieldGroup
      {...props}
      onSave={(values) => {
        props.onSave?.(values)
        setFirstDefaultValue(values.first)
        setSecondDefaultValue(values.autocomplete)
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
        <EditableFieldAutocomplete<AutocompleteItem>
          controlsGroup
          defaultSelectedOption={secondDefaultValue}
          getOptionLabel={(option) => option.label}
          multiSelect
          name="autocomplete"
          onInputValueChange={({ inputValue }) => {
            setItems(
              mockedOptions.filter((option) =>
                inputValue
                  ? option.label
                      .toLocaleLowerCase()
                      .startsWith(inputValue.toLocaleLowerCase())
                  : true
              )
            )
          }}
          onRemove={(option) => {
            setSecondValue(
              secondValue?.filter((selected) => selected.value !== option.value)
            )
          }}
          onSelectedItemsChange={(options) => {
            setSecondValue(options)
          }}
          options={items.slice(0, 5)}
          placeholder="Search by organization's name or handle"
          renderOption={({ defaultStyles, option, inputValue }) => (
            <div
              sx={{
                ...defaultStyles,
                alignContent: "center",
                alignItems: "center",
                display: "flex",
                padding: 2,
              }}
            >
              <Highlight search={inputValue} text={option.label} />
            </div>
          )}
          selectedOption={secondValue}
          totalCount={items.length}
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

export const DefaultWithAutocomplete = TemplateWithAutocomplete.bind({})

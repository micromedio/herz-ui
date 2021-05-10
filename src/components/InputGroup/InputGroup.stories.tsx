/** @jsxRuntime classic /
/** @jsx jsx */
import { jsx } from "theme-ui"
import InputGroup, { InputGroupProps } from "./InputGroup"
import { Meta, Story } from "@storybook/react/types-6-0"
import React from "react"
import Input from "../Input/Input"
import TextField from "../TextField/TextField"
import Selector from "../Selector/Selector"

export default {
  title: "Design System/InputGroup",
  component: InputGroup,
} as Meta

const Template: Story<InputGroupProps> = (props) => (
  <InputGroup {...props}>
    <Input placeholder="With a placeholder" />
    <Input placeholder="Error state" state="error" />
    <Selector
      options={[
        {
          label: "First",
          value: 1,
        },
        {
          label: "Second",
          value: 2,
        },
      ]}
    />
    <Input placeholder="Success state" state="success" />
  </InputGroup>
)

export const WithInputs = Template.bind({})
WithInputs.args = {}

const TextFieldTemplate: Story<InputGroupProps> = (props) => (
  <InputGroup {...props}>
    <TextField helperText="First Input" />
    <TextField helperText="Second Input" />
    <TextField
      helperText="Select"
      select
      selectProps={{
        value: 1,
        options: [
          {
            label: "First",
            value: 1,
          },
          {
            label: "Second",
            value: 2,
          },
        ],
      }}
    />
    <TextField helperText="Last Input" />
  </InputGroup>
)

export const WithTextFields = TextFieldTemplate.bind({})
WithTextFields.args = {}

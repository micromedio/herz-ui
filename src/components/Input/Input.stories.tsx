import React, { useState } from 'react';
import Input, { InputProps } from './Input';
import { Meta, Story } from '@storybook/react/types-6-0';

export default {
  title: 'Design System/Input',
  component: Input,
} as Meta;

const Template: Story<InputProps> = (props: InputProps) => {
  const [value, setValue] = useState(props.value);

  return (
    <Input
      {...props}
      value={value}
      onChange={(event) => {
        if (props.onChange) props.onChange(event);
        setValue(event.target.value);
      }}
    />
  );
};

const TextAreaTemplate: Story<InputProps> = (props: InputProps) => {
  const [value, setValue] = useState(props.value);

  return (
    <Input
      {...props}
      multiline
      rows={2}
      value={value}
      onChange={(event) => {
        if (props.onChange) props.onChange(event);
        setValue(event.target.value);
      }}
    />
  );
};

export const Example = Template.bind({});
Example.args = {
  placeholder: 'Placeholder text',
  iconName: 'IconSearch',
  value: '',
};

export const Password = Template.bind({});
Password.args = {
  placeholder: 'Insert your password',
  type: 'password',
};

export const Filled = Template.bind({});
Filled.args = {
  value: 'Filled input',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const WithError = Template.bind({});
WithError.args = {
  state: 'error',
};

export const WithSuccess = Template.bind({});
WithSuccess.args = {
  state: 'success',
};

export const Required = Template.bind({});
Required.args = {
  required: true,
};

export const TextArea = TextAreaTemplate.bind({});
TextArea.args = {
  placeholder: 'Placeholder text',
  iconName: 'IconSearch',
};

export const TextAreaFilled = TextAreaTemplate.bind({});
TextAreaFilled.args = {
  value: 'Filled input',
};

export const TextAreaDisabled = TextAreaTemplate.bind({});
TextAreaDisabled.args = {
  disabled: true,
};

export const TextAreaWithError = TextAreaTemplate.bind({});
TextAreaWithError.args = {
  state: 'error',
};

export const TextAreaWithSuccess = TextAreaTemplate.bind({});
TextAreaWithSuccess.args = {
  state: 'success',
};

export const TextAreaRequired = TextAreaTemplate.bind({});
TextAreaRequired.args = {
  required: true,
};

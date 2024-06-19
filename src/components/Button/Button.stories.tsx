import React from 'react';
import Button, { ButtonProps } from './Button';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react/types-6-0';
import ButtonExamples from './ButtonExamples';

export default {
  title: 'Design System/Button',
  component: Button,
} as Meta;

const ExamplesTemplate: Story = () => <ButtonExamples />;
export const Examples = ExamplesTemplate.bind({});

const Template: Story<ButtonProps> = (props: ButtonProps) => (
  <Button {...props} />
);

export const Basic = Template.bind({});
Basic.args = {
  children: 'Submit',
  disabled: false,
  variant: 'filled',
  color: 'primary',
  onClick: action('clicked'),
  iconName: 'IconPlus',
  size: 'large',
};

export const Filled = Template.bind({});
Filled.args = {
  ...Basic.args,
  variant: 'filled',
  color: 'text',
};

export const FilledReactNode = Template.bind({});
FilledReactNode.args = {
  ...Basic.args,
  variant: 'filled',
  color: 'text',
  children: (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="21"
        viewBox="0 0 21 21"
      >
        <title>MS-SymbolLockup</title>
        <rect x="1" y="1" width="9" height="9" fill="#f25022" />
        <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
        <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
        <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
      </svg>
    </>
  ),
  iconName: undefined,
};

export const FilledLight = Template.bind({});
FilledLight.args = {
  ...Basic.args,
  variant: 'filledLight',
  color: 'secondary',
};

export const Plain = Template.bind({});
Plain.args = {
  ...Basic.args,
  variant: 'plain',
  color: 'secondary',
};

export const PlainSmall = Template.bind({});
PlainSmall.args = {
  ...Basic.args,
  variant: 'plain',
  size: 'small',
  color: 'primary',
  iconName: undefined,
  children: 'children',
};

export const Icon = Template.bind({});
Icon.args = {
  color: 'text',
  iconName: 'IconPlus',
};

export const Loading = Template.bind({});
Loading.args = {
  ...Basic.args,
  iconName: undefined,
  loading: true,
  color: 'primary',
};

export const IconLoading = Template.bind({});
IconLoading.args = {
  ...Loading.args,
  iconName: 'IconPlus',
};

import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import Checkbox, { ICheckboxProps } from './Checkbox';

export default {
  title: 'Design System/Checkbox',
  component: Checkbox,
} as Meta;

const Template: Story<ICheckboxProps> = (props) => {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      {...props}
      id="checkbox"
      name="checkbox"
      checked={checked}
      onChange={() => setChecked((previousState) => !previousState)}
    />
  );
};

export const Default = Template.bind({});

Default.args = {};

export const Labeled = Template.bind({});

Labeled.args = {
  label: 'Check me',
};

export const Indeterminate = Template.bind({});

Indeterminate.args = {
  label: "I'm indeterminate",
  indeterminate: true,
};

export const Disabled = Template.bind({});

Disabled.args = {
  label: "I'm disabled",
  disabled: true,
};

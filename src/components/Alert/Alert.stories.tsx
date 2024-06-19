import React from 'react';
import Alert, { AlertProps } from './Alert';
import { Meta, Story } from '@storybook/react/types-6-0';

export default {
  title: 'Design System/Alert',
  component: Alert,
} as Meta;

const Template: Story<AlertProps> = (props) => <Alert {...props} />;

// Each story then reuses that template
export const Example = Template.bind({});

Example.args = {
  title: 'Alert going on',
  children: 'Here it goes your alert description',
  iconName: 'IconAlertOctagon',
  color: 'success',
  position: 'relative',
};

// Each story then reuses that template
export const BigDescription = Template.bind({});

BigDescription.args = {
  ...Example.args,
  children: (
    <>
      <span>Here it goes your alert description </span>
      <p>yet here, more alert description </p>
    </>
  ),
};

export const CustomIcon = Template.bind({});

CustomIcon.args = {
  ...Example.args,
  iconName: undefined,
  color: 'warning',
  iconSVG: (
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
  ),
};

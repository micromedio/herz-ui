/** @jsxImportSource theme-ui */
import React from 'react';
import LinearProgress, { LinearProgressProps } from './LinearProgress';
import { Meta, Story } from '@storybook/react/types-6-0';
import { CreeveyMeta } from 'creevey';

export default {
  title: 'Design System/LinearProgress',
  component: LinearProgress,
  decorators: [
    (Story) => (
      <div sx={{ width: 500 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    creevey: {
      skip: true,
    },
  },
} as Meta & CreeveyMeta;

const Template: Story<LinearProgressProps> = (props) => (
  <LinearProgress {...props} />
);

const DeterminateTemplate: Story<LinearProgressProps> = (props) => (
  <div
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 2,
    }}
  >
    25% - Progress = 0.25
    <LinearProgress {...props} progress={0.25} />
    50% - Progress = 0.5
    <LinearProgress {...props} progress={0.5} />
    75% - Progress = 0.75
    <LinearProgress {...props} progress={0.75} />
    100% - Progress = 1
    <LinearProgress {...props} progress={1} />
  </div>
);

// Each story then reuses that template
export const Default = Template.bind({});

export const Primary = Template.bind({});
Primary.args = {
  color: 'primary',
};

export const Success = Template.bind({});
Success.args = {
  color: 'success',
};

export const Warning = Template.bind({});
Warning.args = {
  color: 'warning',
};

export const WithCustomHeight = Template.bind({});
WithCustomHeight.args = {
  height: 8,
};

export const WithProgress = DeterminateTemplate.bind({});
WithProgress.parameters = {
  creevey: {
    skip: false,
  },
};

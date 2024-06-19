import React from 'react';
import ColorPalette from './ColorPalette';
import { Meta, Story } from '@storybook/react/types-6-0';

export default {
  title: 'Design System/ColorPalette',
  component: ColorPalette,
} as Meta;

const Template: Story = () => {
  return <ColorPalette />;
};

export const Default = Template.bind({});
Default.args = {};

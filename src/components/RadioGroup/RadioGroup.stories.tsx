import React from 'react';
import Radio from '../Radio/Radio';
import { RadioGroupProps } from './RadioGroup';
import { Meta, Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { radioChildrensMock } from './__mocks__/radioChildren';

const mockedChildrenOptions = radioChildrensMock.map(({ value, label }) => (
  <>
    <Radio value={value} label={label} />
  </>
));

export default {
  title: 'Design System/RadioGroup',
  component: Radio.Group,
  parameters: {
    creevey: {
      captureElement: '#root',
    },
  },
} as Meta;

const Template: Story<RadioGroupProps> = (props: RadioGroupProps) => (
  <Radio.Group {...props}>{props.children}</Radio.Group>
);

// Each story then reuses that template
export const Example = Template.bind({});

Example.args = {
  name: 'inputGroup',
  value: 'value 1',
  onChange: action('chosen'),
  children: mockedChildrenOptions,
};

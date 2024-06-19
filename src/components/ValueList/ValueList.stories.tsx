/** @jsxImportSource theme-ui */
import ValueList, { ValueListProps } from './ValueList';
import { Meta, Story } from '@storybook/react/types-6-0';
import Icon from '../Icon/Icon';

export default {
  title: 'Design System/ValueList',
  component: ValueList,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
} as Meta;

const Template: Story<ValueListProps> = (props) => <ValueList {...props} />;

// Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  items: [
    { label: 'IP Address', value: '192.168.0.210' },
    { label: 'Connection Type', value: 'IPv4 DHCP' },
  ],
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  alignValues: 'start',
  items: [
    {
      label: 'ECG Monitor',
      value: (
        <span sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Icon name="IconRouter" sx={{ color: 'secondary' }} /> WinCardio USB
        </span>
      ),
    },
    {
      label: 'Electrodes',
      value: (
        <span sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Icon name="IconAlertTriangle" /> 6 connected
        </span>
      ),
    },
  ],
};

export const WithLessSpacing = Template.bind({});
WithLessSpacing.args = {
  alignValues: 'start',
  itemSpacing: '12px',
  items: [
    {
      label: 'ECG Monitor',
      value: (
        <span sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Icon name="IconRouter" sx={{ color: 'secondary' }} /> WinCardio USB
        </span>
      ),
    },
    {
      label: 'Electrodes',
      value: (
        <span sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Icon name="IconAlertTriangle" /> 6 connected
        </span>
      ),
    },
  ],
};

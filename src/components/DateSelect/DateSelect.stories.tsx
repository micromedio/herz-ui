import DateSelect, { DateSelectProps } from './DateSelect';
import { Meta, Story } from '@storybook/react/types-6-0';

export default {
  title: 'Design System/DateSelect',
  component: DateSelect,
} as Meta;

const Template: Story<DateSelectProps> = (props) => <DateSelect {...props} />;

// Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  children: [
    <DateSelect.Option key={0} value={{ from: '12/05/2021', to: '12/05/2021' }}>
      Today
    </DateSelect.Option>,
    <DateSelect.Option key={1} value={{ from: '13/05/2021', to: '13/05/2021' }}>
      Tomorrow
    </DateSelect.Option>,
    <DateSelect.Option key={2} value={{ from: '09/05/2021', to: '15/05/2021' }}>
      This week
    </DateSelect.Option>,
    <DateSelect.Option key={3} value={{ from: '16/05/2021', to: '22/05/2021' }}>
      Next week
    </DateSelect.Option>,
    <DateSelect.Option key={4} value={{ from: '01/05/2021', to: '31/05/2021' }}>
      This month
    </DateSelect.Option>,
    <DateSelect.Option key={5} value={{ from: '01/05/2021', to: '30/05/2021' }}>
      Next month
    </DateSelect.Option>,
  ],
  defaultValue: { from: '12/05/2021', to: '12/05/2021' },
};

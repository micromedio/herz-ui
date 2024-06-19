import FloatingCard, { FloatingCardProps } from './FloatingCard';
import { Meta, Story } from '@storybook/react/types-6-0';
import Button from '../Button/Button';

export default {
  title: 'Design System/FloatingCard',
  component: FloatingCard,
  parameters: {
    creevey: {
      captureElement: null,
    },
  },
} as Meta;

const Template: Story<FloatingCardProps> = (props) => (
  <FloatingCard {...props} />
);

// Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  title: 'Card Title',
  titleAlign: 'center',
  body: 'really long body text so that the card grows',
  children: <Button>Open the Floating Card</Button>,
  isVisible: true,
};

export const TitleAlignStart = Template.bind({});
TitleAlignStart.args = {
  title: 'Card Title',
  titleAlign: 'start',
  body: 'really long body text so that the card grows',
  children: <Button>Open the Floating Card</Button>,
  isVisible: true,
};

/** @jsxImportSource theme-ui */

import Accordion, { AccordionProps } from './Accordion';
import { Meta, Story } from '@storybook/react/types-6-0';
import Paper from '../Paper/Paper';
import Button from '../Button/Button';
import ValueList from '../ValueList/ValueList';

export default {
  title: 'Design System/Accordion',
  component: Accordion,
  decorators: [
    (Story) => (
      <Paper sx={{ p: 0, width: 500 }}>
        <Story />
      </Paper>
    ),
  ],
} as Meta;

const Template: Story<AccordionProps> = (props) => <Accordion {...props} />;

// Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  children: [
    <Accordion.Item key={4} title="#4" sx={{ display: 'grid' }}>
      <ValueList
        items={[
          { label: 'Start date', value: '05/13/2021, 9:00 AM' },
          { label: 'Finish date', value: '05/16/2021, 9:44 AM' },
          { label: 'Session length', value: '72 h 44 min' },
          { label: 'Abnormal QTc’s', value: '3' },
          { label: 'Highest QTc', value: '500 ms' },
        ]}
      />
      <Button color="secondary" variant="filledLight">
        View session in a new tab
      </Button>
    </Accordion.Item>,
    <Accordion.Item key={3} title="#3">
      Content Item 3
    </Accordion.Item>,
    <Accordion.Item key={2} title="#2">
      Content Item 2
    </Accordion.Item>,
    <Accordion.Item key={1} title="#1">
      <p>
        Elit ad pariatur cillum pariatur cupidatat duis quis exercitation anim
        ex. Ipsum voluptate sint aliqua consequat ut amet. Ipsum ullamco
        proident sunt adipisicing proident enim nisi id. Eu officia fugiat et
        qui reprehenderit magna velit cillum consectetur et consectetur amet.
      </p>

      <p>
        Ut dolore nisi qui velit quis aliqua. Exercitation qui quis aute
        cupidatat incididunt aliqua mollit tempor reprehenderit aliquip
        adipisicing nostrud veniam reprehenderit. Do esse sit adipisicing minim
        non laboris excepteur veniam consequat laboris irure tempor duis
        deserunt. Est nostrud aliquip irure est. Incididunt proident proident
        minim Lorem excepteur nostrud magna consequat consequat eiusmod.
      </p>
    </Accordion.Item>,
  ],
};

export const WithInitialOpen = Template.bind({});
WithInitialOpen.args = {
  ...Default.args,
  initialOpenIndex: 0,
};

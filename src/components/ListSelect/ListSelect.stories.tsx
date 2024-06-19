import ListSelect, { ListSelectProps } from './ListSelect';
import { Meta, Story } from '@storybook/react/types-6-0';
import Icon from '../Icon/Icon';
import { useState } from 'react';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Design System/ListSelect',
  component: ListSelect,
} as Meta;

const Template: Story<ListSelectProps> = (props: ListSelectProps) => {
  const [selected, setSelected] = useState<ListSelectProps['selected']>(
    props?.selected
  );

  return (
    <ListSelect
      {...props}
      onSelect={(value) => {
        action('onSelect')(value);
        setSelected(value);
      }}
      selected={selected}
    />
  );
};

// Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  selected: 'walk',
  options: [
    {
      label: 'Walk',
      value: 'walk',
      suffix: <Icon name="IconWalk" />,
      affix: 'WALK',
    },
    {
      label: 'Train',
      value: 'train',
      suffix: <Icon name="IconTrain" />,
      affix: 'TRAIN',
    },
    {
      label: 'Car',
      value: 'car',
      suffix: <Icon name="IconCar" />,
      affix: 'CAR',
    },
    {
      label: 'Plane',
      value: 'plane',
      suffix: <Icon name="IconPlane" />,
      affix: 'PLANE',
    },
  ],
};

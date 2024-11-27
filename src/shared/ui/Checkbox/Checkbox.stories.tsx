import { StoryFn, Meta } from '@storybook/react';
import { Checkbox } from './Checkbox';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
} as Meta<typeof Checkbox>;

const Template: StoryFn<typeof Checkbox> = args => <Checkbox {...args} />;

export const DefaultCheckbox = Template.bind({});

DefaultCheckbox.args = {
  title: 'test',
  slot: 'test',
  onClick: () => {},
};

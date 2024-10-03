import { Meta, StoryFn } from '@storybook/react';
import { Select } from './Select';

export default {
  title: 'Components/Select',
  component: Select,
} as Meta<typeof Select>;

const Template: StoryFn<typeof Select> = args => <Select {...args} />;

export const DefaultSelect = Template.bind({});

DefaultSelect.args = {
  name: 'Select',
};

import { Meta, StoryFn } from '@storybook/react';
import { Label } from './Label';

export default {
    title: 'Components/Label',
    component: Label,
} as Meta<typeof Label>;

const Template: StoryFn<typeof Label> = (args) => <Label {...args} />;

export const DefaultLabel = Template.bind({});

DefaultLabel.args = {
    title: 'My label',
};
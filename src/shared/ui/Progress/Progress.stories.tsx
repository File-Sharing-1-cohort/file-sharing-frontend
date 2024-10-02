import { Meta, StoryFn } from '@storybook/react';
import { Progress } from './Progress';

export default {
    title: 'Components/Progress',
    component: Progress,
} as Meta<typeof Progress>

const Template: StoryFn<typeof Progress> = (args) => <Progress {...args} />;

export const DefaultProgress = Template.bind({});

DefaultProgress.args = {
    title: 'Progress Bar',
}
import { Meta, StoryFn } from '@storybook/react';
import { Toaster } from './Sonner';

export default {
    title: 'Components/Sonner',
    component: Toaster,
} as Meta<typeof Toaster>;

const Template: StoryFn<typeof Toaster> = (args) => <Toaster {...args} />;

export const DefaultToaster = Template.bind({});

DefaultToaster.args = {
    theme: 'dark',
}
import { StoryFn, Meta } from '@storybook/react';
import { Button } from './Button';

export default {
    title: 'Components/Button',
    component: Button,
} as Meta<typeof Button>

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />

export const DefaultButton = Template.bind({});
DefaultButton.args = {
    children: 'Default Button',
    variant: 'default',
    onClick: () => {},
}


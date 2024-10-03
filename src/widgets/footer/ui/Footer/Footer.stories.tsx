import { Meta, StoryFn } from '@storybook/react';
import { Footer } from './Footer';
import { BrowserRouter } from 'react-router-dom';

export default {
    title: 'Components/Footer',
    component: Footer,
} as Meta<typeof Footer>;

const Template: StoryFn<typeof Footer> = (args) => (
    <BrowserRouter>
        <Footer {...args} />
    </BrowserRouter>
)

export const DefaultFooter = Template.bind({});

DefaultFooter.args = {}
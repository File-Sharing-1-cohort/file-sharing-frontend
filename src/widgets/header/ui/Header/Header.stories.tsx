import { Meta, StoryFn } from '@storybook/react';
import { Header } from './Header';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Components/Header',
  component: Header,
} as Meta<typeof Header>;

const Template: StoryFn<typeof Header> = args => (
  <BrowserRouter>
    <Header {...args} />
  </BrowserRouter>
);

export const DefaultHeader = Template.bind({});

DefaultHeader.args = {};

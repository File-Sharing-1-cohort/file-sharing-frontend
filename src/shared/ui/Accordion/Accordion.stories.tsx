import { StoryFn, Meta } from '@storybook/react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './Accordion';

export default {
  title: 'Components/Accordion',
  component: Accordion,
} as Meta<typeof Accordion>;

const Template: StoryFn<{ type: 'single' | 'multiple' }> = args => (
  <Accordion type={args.type}>
    <AccordionItem value="item-1">
      <AccordionTrigger>Item 1</AccordionTrigger>
      <AccordionContent>Content for item 1</AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Item 2</AccordionTrigger>
      <AccordionContent>Content for item 2</AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger>Item 3</AccordionTrigger>
      <AccordionContent>Content for item 3</AccordionContent>
    </AccordionItem>
  </Accordion>
);

export const SimpleAccordion = Template.bind({});
SimpleAccordion.args = {
  type: 'single',
};

export const MultipleAccordion = Template.bind({});
MultipleAccordion.args = {
  type: 'multiple',
};

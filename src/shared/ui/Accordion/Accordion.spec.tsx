import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './Accordion';

describe('Accordion', () => {
  it('should toggle content visibility when clicked', () => {
    render(
      <Accordion type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();

    const trigger = screen.getByText('Trigger 1');

    fireEvent.click(trigger);

    expect(screen.getByText('Content 1')).toBeVisible();

    fireEvent.click(trigger);

    expect(screen.getByText('Content 1')).toBeVisible();
  });
});

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('Should do something when click', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>click me</Button>);
    const button = screen.getByText('click me');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});

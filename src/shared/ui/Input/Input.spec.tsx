import React from 'react';
import { render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('Should innclude placeholder', () => {
    const placeholder = 'Enter your placeholder';
    render(<Input placeholder={placeholder} />);
    const inputEl = screen.getByPlaceholderText(placeholder);
    expect(inputEl).toBeInTheDocument();
  });
});

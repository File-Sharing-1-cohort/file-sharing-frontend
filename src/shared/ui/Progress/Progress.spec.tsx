import React from 'react';
import { render, screen } from '@testing-library/react';
import { Progress } from './Progress';

describe('Progress', () => {
  it('Should show the progress', () => {
    const value = 75;
    render(<Progress value={value} />);
    const progressIndicator = screen.getByRole('progressbar').firstChild;
    expect(progressIndicator).toHaveStyle(
      `transform: translateX(-${100 - value}%)`,
    );
  });
});

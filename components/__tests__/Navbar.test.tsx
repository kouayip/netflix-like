import React from 'react';

import { render, screen } from '@testing-library/react';

import Navbar from '@/components/Navbar';

describe('Navbar', () => {
  it('renders the Components', () => {
    render(<Navbar />);
    expect(screen.getByText(/Netflix Like/i)).toBeInTheDocument();
  });
});

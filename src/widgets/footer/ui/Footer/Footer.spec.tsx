import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from './Footer';

describe('Footer Component', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        )
    });
    it('renders a link to the FAQ page', () => {
        const faqLink = screen.getByRole('link', { name: /FAQ/i });
        expect(faqLink).toBeInTheDocument();
        expect(faqLink).toHaveAttribute('href', '/faq');
    });
    it('render linnk to Home Page', () => {
        const homeLink = screen.getByRole('link', { name: /Logo/i })
        expect(homeLink).toBeInTheDocument();
        expect(homeLink).toHaveAttribute('href', '/');
    })
})
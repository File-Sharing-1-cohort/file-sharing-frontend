import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Checkbox } from "./Checkbox";

describe('Checkbox', () => {
    it('Should be checked when clicked', () => {
        const onClick = jest.fn();
        render(<Checkbox onClick={onClick} />);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).not.toBeChecked();
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
    })
})
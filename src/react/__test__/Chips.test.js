import React from 'react';
import {render,cleanup, screen, fireEvent} from '@testing-library/react';
import {act} from 'react-dom/test-utils';

import Chips from '../view/Chips';


let container = null;
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    cleanup(container);
    container.remove();
    container = null;
});

test('Render chips from fetched data', () => {
    act(() => {
        render(<Chips 
            categories={[{id : '1', name : 'name'}]} 
            clickedChipsId={[1,2,3]} 
            selectedChip={jest.fn()}/>
        , 
        container
        );
    })
    expect(container.firstChild).toBe(container.querySelector('[data-testid="chip-label"]'));

    const chip = screen.getByTestId('chip-label');
    expect(chip.dataset.state).toMatch('unchecked');
    expect(chip.textContent).toBe('name');
});

test('Checked filter chips', () => {
    const selectedChip = jest.fn();

    act(() => {
        render(<Chips 
            categories={[{id : '1', name : 'name'}]} 
            clickedChipsId={[1,2,3]} 
            selectedChip={jest.fn()}/>
        , 
        container
        );
    })
    expect(container.firstChild).toBe(container.querySelector('[data-testid="chip-label"]'));    
    const chip = screen.getByTestId('chip-label');

    act(() => {
        fireEvent.click(screen.getByText(/name/i));
    });
    expect(selectedChip).toHaveBeenCalledTimes(0);
    expect(chip.dataset.state).toMatch('checked');

})


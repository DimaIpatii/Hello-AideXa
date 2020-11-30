import React from 'react';
import {render,cleanup, screen} from '@testing-library/react';
import {act} from 'react-dom/test-utils';

import Filter from '../view/Filter';
import Chips from '../view/Chips';

function MockChips ({categories,clickedChipsId,selectChip}) {
    
    return (
        <div data-testid="chips">
            {categories,clickedChipsId}
        </div>
    )
}

jest.mock('../view/Chips', () => ({
    __esModule: true,
    namedExport: jest.fn(),
    default: jest.fn()
  })
);

  
let container = null;
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    //Chips.mockClear();
});

beforeAll(() => {
    Chips.mockImplementation(MockChips)
});

afterEach(() => {
    cleanup(container);
    container.remove();
    container = null;
});


test('Render Filter menu', () => {
    
    const tegs = [{id : '1', name : 'name'}];
    
    const selectChips = jest.fn(() => tegs[0]);
    const clickedTeg = jest.fn(() => ({ state : false}));
    const toggLeFilter = jest.fn();

    act(() => {
        render(
            <Filter 
                categories={[{id : '1', name : 'name'},{id : '2', name : 'name'}]}
                teg={tegs}
                selectChips={selectChips}
                clickedTeg={clickedTeg}

                clickedChipsId={[1,2,3]}
                selectChip={jest.fn()}
            />, 
            container);
    });
    expect(container.firstChild).toBe(container.querySelector('[data-testid="dropdown-menu"]'));

    act(() => {
        if(tegs.length > 0){
        
            expect(selectChips).toHaveBeenCalledTimes(1);
            expect(selectChips).toHaveReturnedWith({id : '1', name : 'name'});
    
            expect(clickedTeg).toHaveBeenCalledTimes(1);
            expect(clickedTeg).toHaveReturnedWith({ state : false});
        }
    });

    const navigationMenu = screen.getByTestId('filter-navigation');
    expect(navigationMenu.classList.contains('filter-hide')).toBeTruthy();
    
    act(() => {
        screen.getByTestId('filter-toggle').click();
    });
    expect(toggLeFilter).toHaveBeenCalledTimes(0);  
    expect(navigationMenu.classList.contains('filter-show')).toBeTruthy();
});
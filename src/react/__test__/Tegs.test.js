import React from 'react';
import {render,cleanup, screen, fireEvent} from '@testing-library/react';
import {act} from 'react-dom/test-utils';

import Tegs from '../view/Tegs';


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

test('Render teg buttons of a card', () => {
    const callback = jest.fn();
    
    act(() => {
        render(<Tegs categories={[{id : '1', name : 'name'}]} getTeg={callback}/>);
    });
    
    const tegButton = screen.getByTestId('teg-button');
    expect(tegButton.textContent).toBe('name');
    expect(tegButton.id).toBe('1');

});

test('Select categories by clicking teg element', () => {
    const clickeTeg = {id : '1', name : 'name', state : true};
    const callback = jest.fn(() => clickeTeg);

    act(() => {
        render(<Tegs categories={[{id : '1', name : 'name'}]} getTeg={callback}/>);
    })
    
    fireEvent.click(screen.getByTestId('teg-button'));
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveReturnedWith({id : '1', name : 'name', state : true})
});
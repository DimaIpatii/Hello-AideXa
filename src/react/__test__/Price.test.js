import React from 'react';
import {render,cleanup, screen} from '@testing-library/react';
import {act} from 'react-dom/test-utils';

import Price from '../view/Price';


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


test('Calculate and render price', () => {
    const price = '10.00';
    const disount = '5.00';
    const discountPrice = Number(price) - Number(disount);

    act(() => {
        render(<Price price={price} discount={disount}/>, container);
    })

    expect(screen.getByTestId("price-old").textContent).toEqual(`€ ${price}`);
    expect(screen.getByTestId("price-current").textContent).toEqual(`€ ${discountPrice.toFixed(2)}`);
})

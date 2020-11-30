import React from 'react';
import {render,cleanup, screen, fireEvent} from '@testing-library/react';
import {act} from 'react-dom/test-utils';

import Tegs from '../view/Tegs';
import Price from '../view/Price';

import RenderProductCard from '../view/RenderProductCard';

function MockTegs (props) {
    const [tegOne] = props.categories;

    return (
        <div data-testid="tegs">
            {tegOne.id,tegOne.name}
        </div>
    )
};

function MockPrice ({price, discount}) {
 
    return(
        <div data-testid="price">{price}:{discount}</div>
    )
};


jest.mock('../view/Tegs', () => ({
    __esModule: true,
    namedExport: jest.fn(),
    default: jest.fn()
  })
);
jest.mock('../view/Price', () => ({
    __esModule: true,
    namedExport: jest.fn(),
    default: jest.fn()
  })
);

  
let container = null;
beforeAll(() => {
    Tegs.mockImplementation(MockTegs);
    Price.mockImplementation(MockPrice);
});
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    Price.mockClear();
    Tegs.mockClear();
});
afterEach(() => {
    cleanup(container);
    container.remove();
    container = null;
});

test('No cards to render', () => {
    const searchResult = [];
    const chips = [{id: 16, name: "Games" }, {id: 15,name: "Outdoors & Tools" }, {id: 17,name: "Health & Tools"}];
    const selectedTeg = [{id: 16, name: "Games" }];

    act(() => {
        render(<RenderProductCard 
            cardList={searchResult}
            chipList={chips}
            clickedTeg={selectedTeg}
        />, container);
    });
});


test('Render Product Card', () => {

    const searchResult = [
        {
            id: 1,
            name: "Fantastic Copper Pants",
            description: "Aut carcer caritas adamo coruscus nulla viriliter annus summopere cibus desipio alter argumentum bellicus auris aptus vindico depereo repellendus universe aranea comitatus quo vigor absque reiciendis vilis ascisco caput deputo vir tergeo cubo vereor ocer voluptatem copia aqua tibi acceptus nesciunt ustilo compono bestia pariatur angelus cornu censura sordeo vester surgo ventosus suscipio talis.",
            image: "https://loremflickr.com/250/250",
            price: "46444.5",
            discount_amount: "22108.12",
            status: true,
            categories: [
                {id: 16, name: "Games" },
                {id: 15,name: "Outdoors & Tools" },
                {id: 17,name: "Health & Tools"}
            ]
        },
    ];
    const chips = [{id: 16, name: "Games" }, {id: 15,name: "Outdoors & Tools" }, {id: 17,name: "Health & Tools"}];
    const selectedTeg = [{id: 16, name: "Games" }];
    const card = {
        id: 1,
        name: "Fantastic Copper Pants",
        description: "Aut carcer caritas adamo coruscus nulla viriliter annus summopere cibus desipio alter argumentum bellicus auris aptus vindico depereo repellendus universe aranea comitatus quo vigor absque reiciendis vilis ascisco caput deputo vir tergeo cubo vereor ocer voluptatem copia aqua tibi acceptus nesciunt ustilo compono bestia pariatur angelus cornu censura sordeo vester surgo ventosus suscipio talis.",
        image: "https://loremflickr.com/250/250",
        price: "46444.5",
        discount_amount: "22108.12",
        status: true,
        categories: [
            {id: 16, name: "Games" },
            {id: 15,name: "Outdoors & Tools" },
            {id: 17,name: "Health & Tools"}
        ]
    }

    // **********************************************
    const moreButton = jest.fn();
    const clouseButton = jest.fn();
    const tegOnClick = jest.fn();

    // **********************************************
    act(() => {
        render(<RenderProductCard 
            cardList={searchResult}
            chipList={chips}
            clickedTeg={selectedTeg}

            price={card.price} 
            discount={card.discount_amount}

            categories={card.categories} 
            getTeg={tegOnClick}
        />, container);
    });
    expect(screen.getByTestId('products-wrapper').firstChild).toBe(screen.getByTestId('product-card'));

    //Side front
    //*****************************************
    //image:
    expect(screen.getByTestId('product-image-big').src).toMatch(card.image);
    expect(screen.getByTestId('product-image-big').alt).toMatch(card.name);

    expect(screen.getByTestId('product-image-small').src).toMatch(card.image);
    expect(screen.getByTestId('product-image-big').alt).toMatch(card.name);

    //product name:
    expect(screen.getByTestId('product-name').textContent).toMatch(card.name);

    //buy button:
    expect(screen.getByTestId('button-buy').textContent).toMatch('buy');

    //price:
    expect(screen.getByTestId('price').textContent).toEqual(`${card.price}:${card.discount_amount}`);

    //more button:
    expect(screen.getByTestId('button-more').textContent).toMatch('more');

    //Side back
    //*****************************************
    //button-clouse
    expect(screen.getByTestId('button-clouse').firstChild).toBe(screen.getByTestId('clouse-icon'));

    //categories caption
    expect(screen.getByTestId('cadegories-caption').textContent).toMatch('Same Categories');

    //tegs:
    expect(screen.getByTestId('tegs').textContent).toMatch(card.categories[0].name);

    //description caption:
    expect(screen.getByTestId('description-caption').textContent).toMatch('Description');

    //description:
    expect(screen.getByTestId('description').textContent).toMatch(card.description);


    //*****************************************
    // More button:
    act(() => {
        fireEvent.click(screen.getByTestId('button-more'));
    });
    expect(moreButton).toHaveBeenCalledTimes(0);
    expect(screen.getByTestId('product-backside').classList.contains('show')).toBeTruthy();

    // Clouse button:
    act(() => {
        fireEvent.click(screen.getByTestId('button-clouse'));
    });
    expect(clouseButton).toHaveBeenCalledTimes(0);
    expect(screen.getByTestId('product-backside').classList.contains('hide')).toBeTruthy();
});
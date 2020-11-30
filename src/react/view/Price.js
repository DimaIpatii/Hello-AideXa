import React from 'react'

// Price Handler:
const Price = ({price, discount }) => {
    const calculatedPrice = Number(price) - Number(discount);
    const regxp = /(\d)(?=(\d{3})+(?!\d))/g;

    const oldPrice = price.replace(regxp, '$1,');
    const discountPrice = calculatedPrice.toFixed(2).replace(regxp, '$1,');

    return (
        <p className="price">
            {/* <!-- old price --> */}
            <span data-testid="price-old" className="price__discount price__discount_del">
                <del>€ {oldPrice}</del>
            </span>
            {/* <!-- current price --> */}
            <span data-testid="price-current">€ {discountPrice}</span>
        </p>
    )
}

export default Price;
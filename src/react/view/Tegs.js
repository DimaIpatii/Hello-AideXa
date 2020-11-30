import React from 'react';

const Tegs = ({categories,getTeg}) => {
    return categories.map((item) => {
                                        
        return (
            <div key={`teg-${item.id}`} >
                
                <a href="#"  data-testid="teg-button" id={item.id} className="product-details-tags__tag-item filter-item filter-item_small" onClick={getTeg} >
                    {item.name}
                </a>
            </div>
        )
    })
}


export default Tegs;
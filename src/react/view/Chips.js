import React from 'react';

const Chips = ({categories = [], clickedChipsId = [], selectChip}) => {

    return categories.map((item) => {

        return( 
            <label
                data-testid="chip-label" 
                htmlFor={`input-${item.id}`} 
                id={`${item.id}`} 
                className={`dropdown-menu__filter-item filter-item ${clickedChipsId.includes(item.id) ? 'filter-item-selected' : ''}`} 
                onClick={selectChip} 
                data-state={clickedChipsId.includes(item.id) ? 'checked' : 'unchecked'} 
                key={`chips-${item.id}`}>

                {item.name}
                <input 
                    type="checkbox" 
                    id={`input-${item.id}`} 
                    value={item.name} 
                    className="filter-input-item" />
            </label>
        )
    })
}

export default Chips;

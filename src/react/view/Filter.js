import React, {useState,useEffect} from 'react';

// **************************************
// Component Helpers:
// **************************************
import Chips from './Chips';


// **************************************
// Component:
// **************************************
const Filter = ({categories = [], teg = [], selectChips, clickedTeg}) => {
    
    // Filter Header:
    const [toggleFilterState, setToggleFilter] = useState(false);
    
    // Chips State:
    const [clickedChipsId, setClickedChip] = useState([]);
    
    // ******************************************************

     // Dropdown Controller:
     const toggLeFilter = () => {
        setToggleFilter(!toggleFilterState);
    };

    // Select Chips on Click:
    const selectChip = (event) => {
        const chipsId = Number(event.target.id);
        const chipsName = String(event.target.textContent);
        const chipState = String(event.target.dataset.state);

        // Add underline state to Chips
        setClickedChip(() => {
            // Add    
            if(!clickedChipsId.includes(chipsId)){
                return [...clickedChipsId,chipsId];
            }
            // Remove
            else{
                const clicked = clickedChipsId.filter(el => el !== chipsId);
                return [...clicked];
            }
        });
     
        // Defines Chip State
        // Unchecked State:
        if(chipState == 'unchecked'){
            selectChips({
                status : true,
                id : chipsId,
                name : chipsName
            });
        }
        // Checked State:
        else if(chipState == 'checked'){
            selectChips({
                status : false,
                id : chipsId,
            });   
        }
    }

    // *************************************

    // Add teg element to the filter chips list
    useEffect(() => {
        
        setClickedChip(() => {
            // Reset clicked chips:
            if(teg.length > 0){
                const [tegEl] = teg;

                selectChips({
                    id : tegEl.id,
                    name : tegEl.name
                });

                clickedTeg({ state : false});

                return [tegEl.id];
            }
            // Leave current chips list:
            else{
                return [...clickedChipsId];
            }
        });
        
    },[teg]);

    // *************************************
    return (
    <div className="app__dropdown-filter dropdown-filter " data-testid="dropdown-menu">
                
        <div className="dropdown-filter__header dropdown-header">
            <h2 className="dropdown-header__caption">Filter</h2>
            <button className="dropdown-header__button btn btn_filter-open" onClick={toggLeFilter} data-testid="filter-toggle">
                <ion-icon name="chevron-down-outline" class="btn__icon_open-filter"></ion-icon>
            </button>
        </div>

        <nav className={`dropdown-filter__menu dropdown-menu ${toggleFilterState ? 'filter-show' : 'filter-hide'}`} data-testid="filter-navigation">
            {
                categories.length > 0
                ? <Chips
                    data-testid="filter-chips" 
                    categories={categories} 
                    clickedChipsId={clickedChipsId} 
                    selectChip={selectChip}/> 
                : null
            }
        </nav>
        
    </div>)
}

export default Filter;
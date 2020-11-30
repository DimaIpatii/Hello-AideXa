// ***********************************
// React: 
// ***********************************
import React, {useState,useEffect,useReducer} from 'react';


// ***********************************
// Components: 
// ***********************************
import RenderProductCard from './RenderProductCard';
import Filter from './Filter';

// ***********************************
// Helpers: 
// ***********************************
import getFetchedData from '../model/getFetchedData';
import getCategories from '../model/getCategories';

// State: 
// ***********************************
import tegState from '../model/tegState';
import chipState from '../model/chipState';




const App = () => {
    const [searchResult, setSearchData] = useState([]);
    const [categories, setCategories] = useState([]);

    const [chips, dispatchChips] = useReducer(chipState,categories);
    const [teg, dispatchTeg] = useReducer(tegState,[]);

    // ******************************************************

    const selectedChips = (selectdChip) => {
        /* Checked */
        if(selectdChip.status === true){
            return dispatchChips({
                type : 'CHIPS_CHECKED',
                playload : {
                    name : selectdChip.name,
                    id : selectdChip.id
                }
            })
        }
        /* Unchecked */
        if(selectdChip.status === false){
            return dispatchChips({
                type : 'CHIPS_UNCHECKED',
                playload : {
                    id : selectdChip.id
                }
            });
        }
        
        /* Selected Teg of Product Card:*/
        return dispatchChips({playload: selectdChip});
    }

    const selectedTeg = (teg) => {
        if(teg.state === true){
            return dispatchTeg({
                status : 'TEG_CLICKED',
                playload : {
                    id : teg.id,
                    name : teg.name
                }
            })
        }
        if(teg.state === false){
            return dispatchTeg({
                status : 'TEG_REMOVE',
            })
        }
    }

    // ******************************************************

    /* Fetch Data */
    useEffect(async () => {
        setSearchData(await getFetchedData());
    },  []);

    /* Set Filter Chips */
    useEffect(() => {
        setCategories(getCategories(searchResult));
    }, [searchResult]);


    // ******************************************************
    
    return (
        <div data-testid="app-wrapper" className="app" data-testid="arr-wrapper" >
            
            <Filter categories={categories} teg={teg} selectChips={selectedChips} clickedTeg={selectedTeg}/>
            <RenderProductCard cardList={searchResult} chipList={chips} clickedTeg={selectedTeg} />
            
        </div>
    )
}

export default App;

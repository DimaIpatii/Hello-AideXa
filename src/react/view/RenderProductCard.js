import React, {useState, useEffect} from 'react';

// ***************************************
// Helpers:
// ***************************************
import getCardsByChips from '../model/getCardsByChips';
import Tegs from './Tegs';
import Price from './Price';



const RenderProductCard = ({cardList, chipList, clickedTeg}) => {

    const [openedCard, setOpenCard] = useState([]);
    const [data, setData] = useState(cardList);

    // Toggle Card:
    // ***************************************
    const openDetalis = (event) => {
    
        if(event.target.tagName != 'BUTTON') return;
        
        const cardId = Number(event.target.value);

        // Add Open State to individual card:
        setOpenCard(() => {
            if(!openedCard.includes(cardId)){
                return [...openedCard,cardId];
            }
        })
    };

    const closeDetails = (event) => {
        let target = event.target;
        if(target.tagName != 'BUTTON') target = target.closest('button');

        const cardId = Number(target.value);
        const opened = openedCard.filter(el => el !== cardId);

        setOpenCard([...opened]);
    }

    // Teg Click:
    // ***************************************
    const tegOnClick = (event) => {
        const target = event.target;
        clickedTeg({
            state : true,
            id : Number(target.id),
            name : String(target.textContent)
        })
    }

    // ***************************************

    useEffect(() => {
        setData(() => {
            if(chipList.length > 0){
                return getCardsByChips(chipList,cardList);
            }else{
                return cardList;
            }
        })
    },[cardList,chipList]);

    
    return (
        <main className="app__main main" data-testid="products-wrapper">
        {
            data.length > 0 ?
            data.map((card) => {

                return (
                    <div id={`productCard-${card.id}`} className='product-card' key={`card-${card.id}`} data-testid="product-card">
                        {/* <!-- Product Card Front --> */}
                        <div className="product-front">
                            <div className="product-front__image">
                                <img src={`${card.image}`} alt={`${card.name}`} data-testid="product-image-big"/>
                            </div>
                            <div className="prodyct-info">
                                <figure className="prodyct-info-head">
                                    <div className="prodyct-info-head__image">
                                        <img src={`${card.image}`} alt={`${card.name}`} data-testid="product-image-small"/>
                                    </div>
                                    <figcaption className="product-name prodyct-info-head__name" data-testid="product-name">{card.name}</figcaption>
                                </figure>
                                <nav className="prodyct-info-body">
                                    <button className="btn btn_buy prodyct-info-body__btn-buy" data-testid="button-buy">buy</button>

                                    {/* Price Component */}
                                    <Price price={card.price} discount={card.discount_amount} data-testid="price-wrapper"/>
                                    
                                    <button className="btn btn_more prodyct-info-body__btn-more" onClick={openDetalis} value={card.id} data-testid="button-more">more</button>
                                </nav>
                            </div>
                        </div>
                        
                        {/* <!-- Product Card Back --> */}
                        <div className={`product-details product-card__details ${openedCard.includes(card.id) ? 'show' : 'hide'}`}  data-testid="product-backside">
                            <button className="btn btn_clouse product-details__btn" value={`${card.id}`} onClick={closeDetails} data-testid="button-clouse">
                                <ion-icon name="close-outline" data-testid="clouse-icon"></ion-icon>
                            </button>
                            <h3 className="product-details__caption" data-testid="cadegories-caption">Same Categories</h3>
                            
                            <nav className="product-details-tags">
                                
                                <Tegs categories={card.categories} getTeg={tegOnClick}/>
                                
                            </nav>
                            
                            <h3 className="product-details__caption" data-testid="description-caption">Description</h3>
                            
                            <p className="product-details__description" data-testid="description">
                                {card.description}
                            </p>
                            
                        </div>
                    </div>
                )
            })
            : null
        }
    </main>
    )
}

export default RenderProductCard;
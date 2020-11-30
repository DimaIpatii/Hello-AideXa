// Get Cards based on selected chips or teg
function getCardsByChips(selectedChips = [], allCards = []){
    
    if(!Array.isArray(selectedChips) || !Array.isArray(allCards)) return;
    
    const filteredCards = [];
    let n = 0;

    // Generate list of cards based on selected filter chips:
    for(let chip of selectedChips){
        const cards = allCards.filter(card => {
            const cardsPass = card.categories.some(el => el.id == chip.id);
            if(cardsPass) return card;
        })
        filteredCards.push(...cards);
    }

    // Order list
    filteredCards.sort(function (prev, next) {
        if(prev.id <= next.id) {
            return -1;
        }else if(prev.if >= next.id){
            return 1;
        }else{
            return 0;
        }
    });
    
    // Prevent repeated card elements:
    return filteredCards.filter(card => {
        
        if(card.id > n){
            n = card.id;
            return card;
        }
    });
}

export default getCardsByChips;
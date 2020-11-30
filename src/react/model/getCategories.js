/* Separate Categories from Search result */
function getCategories (searchData = []){

    const output = [];
    let acc = 0;

    // 1. get categoris from Search Result:
    const categoriesList = searchData.map(item => item.categories);
    
    // 2. Unite nested array
    const categories = categoriesList.flat(1);

    // 3. Sort categories by its ID:
    categories.sort((a,b) => {
        if(a.id <= b.id) {
            return -1;
        }
        if(a.id >= b.id){
            return 1;
        }
        return 0;
    });

    // 4. Clear from repeaded ID:
    for(let item of categories){
        
        if(item.id > acc){
            acc = item.id;
            output.push(item);
        }
    }

    return output;
}

export default getCategories;
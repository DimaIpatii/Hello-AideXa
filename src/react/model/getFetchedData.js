const getFetchedData = async () => {
    try{
        const request = await fetch('https://gorest.co.in/public-api/products');
        
        if(!request.ok){
            throw new Error('Cannot get request! Please try againe. ');
        }else{
            const response = await request.json();
            const {data} = response;
            return data;
        }

    }catch(err){
        console.error(err.message);
    }
}

export default getFetchedData;
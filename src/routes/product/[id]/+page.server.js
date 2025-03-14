export const load = async({ params, setHeaders }) => {

    console.log("FETCHING PRODUCT BY ID")

    const response = await fetch(`https://tentlify-ecom.up.railway.app/api/products/${params.id}`);
    const product = await response.json()


    setHeaders({
        'Cache-Control': 'public, max-age=300'
    })

    return {
        product
        
    }

}
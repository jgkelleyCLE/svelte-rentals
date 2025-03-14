export const load = async({ params, setHeaders }) => {

    console.log("FETCHING PRODUCTS BY CATEGORY")

    const response = await fetch(`https://tentlify-ecom.up.railway.app/api/products/category/${params.slug}`);
    const products = await response.json()

    setHeaders({
        'Cache-Control': 'public, max-age=300'
    })

    return {
        products,
        slug: params.slug
    };
}
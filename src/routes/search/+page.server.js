export const load = async({ url }) => {
    const query = url.searchParams.get('q') || ""


    let products = []

    if (query.trim()) {
        try {
            // Replace with your actual API endpoint
            const baseUrl = 'https://tentlify-ecom.up.railway.app/api/products/search';
            const response = await fetch(`${baseUrl}?q=${encodeURIComponent(query)}`);
            
            if (!response.ok) {
                throw new Error(`API responded with status: ${response.status}`);
            }
            
            products = await response.json();
            
        } catch (error) {
            console.error('Search API error:', error);
            // Return the error to be handled in the component
            return {
                query,
                products: [],
                error: {
                    message: error.message
                }
            };
        }
    }

    return {
        query,
        products,
        initialFetch: true
    }
}
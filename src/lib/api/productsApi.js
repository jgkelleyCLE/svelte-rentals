export const getProducts = async() => {

   
        const response = await fetch(`https://tentlify-ecom.up.railway.app/api/products`)
        const products = await response.json()
        
        if (!response.ok) {
            throw new Error('Failed to fetch products!');
          }

          return products

}

export const updateProductStatus = async(productId, status) => {

    const response = await fetch(`https://tentlify-ecom.up.railway.app/api/products/${productId}/status`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
    })

}

export const editProduct = async(productId, tags) => {

    const response = await fetch(`https://tentlify-ecom.up.railway.app/api/products/tags/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tags })
    })
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.message || 'Failed to update tags.');
    }
    return data

}
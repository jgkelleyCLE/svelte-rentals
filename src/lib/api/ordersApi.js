export const getOrders = async() => {
    const response = await fetch(`https://tentlify-ecom.up.railway.app/api/orders`)
    const orders = await response.json()

    if (!response.ok) {
        throw new Error('Failed to fetch orders!');
      }

      return orders

}

export const updateOrderStatus = async(id, status) => {

    const response = await fetch(`https://tentlify-ecom.up.railway.app/api/orders/${id}/status`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({status})
    })
    

}

export const createOrder = async({ title, cart, eventDate, itemsPrice, taxPrice, shippingPrice, totalPrice }) => {

    const response = await fetch(`https://tentlify-ecom.up.railway.app/api/orders`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ title, orderItems: cart, eventDate, itemsPrice, taxPrice, shippingPrice, totalPrice })
    })
}


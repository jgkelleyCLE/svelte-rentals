export const sendEmail = async(cartList, subtotal, deliveryFee, taxPrice, total, email, selected, title) => {


    try {

        console.log("SEND EMAIL DATA: ", { cartList, subtotal, deliveryFee, taxPrice, total, email, selected, title })

    const response = await fetch(`https://tentlify-ecom.up.railway.app/api/mail/send`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ cartList, subtotal, deliveryFee, taxPrice, total, email, selected, title }),
        
    })

    const data = await response.json().catch(() => ({}));
        return data;
        
    } catch (error) {
        
        console.error("Email send error:", error);
        throw error; 
    }
    

}
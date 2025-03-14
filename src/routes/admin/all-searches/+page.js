export const load = async({ params }) => {

    const response = await fetch(`https://tentlify-ecom.up.railway.app/api/search`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error('Failed to fetch searches');
    }
    
    return {
        searches: data
    }

}
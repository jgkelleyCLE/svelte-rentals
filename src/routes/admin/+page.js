export const load = async({ params }) => {
    
    let searches = []

    const response = await fetch(`https://tentlify-ecom.up.railway.app/api/search`);
    const data = await response.json();
    // console.log("RESPONSE IN SEARCH API", data)

    return {
        searches: data
    }

}
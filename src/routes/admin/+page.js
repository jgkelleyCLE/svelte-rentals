export const load = async ({ params }) => {
  let searches = [];

  const response = await fetch(`https://tentlify-ecom.up.railway.app/api/search`);
  const data = await response.json();

  return {
    searches: data,
  };
};

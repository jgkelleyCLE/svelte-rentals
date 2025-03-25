export const load = async ({ params }) => {
  const id = params.id;
  const response = await fetch(`https://tentlify-ecom.up.railway.app/api/search/${id}`);
  const search = await response.json();

  return search;
};

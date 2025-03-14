const API_BASE_URL = 'https://tentlify-ecom.up.railway.app';

export const createSearch = async(data) => {
  const response = await fetch(`${API_BASE_URL}/api/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to record search');
  }

  return response.json();
}

export const getAllSearches = async() => {

  const response = await fetch(`${API_BASE_URL}/api/search`);
  const data = response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch searches');
  }
  return data
  
}
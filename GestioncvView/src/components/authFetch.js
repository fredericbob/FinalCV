export const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    };
  
    try {
      const response = await fetch(url, { ...options, headers });
  
      if (!response.ok) {
        // Log response status and body for debugging
        const errorDetails = await response.text();
        console.error('Response status:', response.status);
        console.error('Response body:', errorDetails);
        throw new Error(`La réponse du réseau n'était pas correcte. Statut: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error('Erreur lors de la requête à l\'API:', error);
      throw error;
    }
  };
  
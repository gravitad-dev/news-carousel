import axios from 'axios';

const VITE_IP_KEY = import.meta.env.VITE_IP_KEY;

// Función para obtener la información de ubicación basada en la IP utilizando ipgeolocation.io
const fetchLocationByIP = async () => {
  try {
    const ipInfoResponse = await axios.get(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${VITE_IP_KEY}`
    );

    const { data } = ipInfoResponse;

    if (data.error) {
      throw new Error(`Error: ${data.error.message}`);
    }

    const { latitude: lat, longitude: lon, country_code3: country } = data;
    return { lat, lon, country };
  } catch (error) {
    console.error('Error getting location by IP:', error);
    throw error;
  }
};

// Función para obtener el país basado en la IP
export const fetchCountryByIP = async () => {
  try {
    const { country } = await fetchLocationByIP();
    return country;
  } catch (error) {
    // Manejar el caso específico de error de bloqueo por adblock
    if (error.response && error.response.status === 403) {
      console.error(
        'La solicitud fue bloqueada por un bloqueador de anuncios.'
      );
      // Puedes mostrar un mensaje al usuario o sugerir una acción alternativa
      return null;
    } else {
      console.error('Error getting country by IP:', error);
      return null;
    }
  }
};

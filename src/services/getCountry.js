import axios from 'axios';

// const VITE_IP_KEY = '4918ecb3de5e4e82bbdea08b5023abe9'; // Reemplaza con tu API key de ipgeolocation.io
const VITE_IP_KEY = import.meta.env.VITE_IP_KEY;

// Función para obtener la información de ubicación basada en la IP utilizando ipgeolocation.io
const fetchLocationByIP = async () => {
  try {
    const ipInfoResponse = await axios.get(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${VITE_IP_KEY}`
    );
    const {
      latitude: lat,
      longitude: lon,
      country_code3: country,
    } = ipInfoResponse.data;
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
    console.error('Error getting country by IP:', error);
    return null;
  }
};

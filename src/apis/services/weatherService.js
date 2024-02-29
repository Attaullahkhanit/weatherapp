import axios from 'axios';

// const API_KEY = 'c8aa997ee2af1cafaa9ce5080e3ee14b';
const API_KEY = '291a7f0f9a995ae658c2d4b21dd9f0f7';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const getWeatherByLocation = async (latitude, longitude) => {
  try {
    const response = await axios.get(`${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
const userLocation = { latitude: 33.6844, longitude: 73.0479 }
getWeatherByLocation(userLocation.latitude, userLocation.longitude);
export { getWeatherByLocation };

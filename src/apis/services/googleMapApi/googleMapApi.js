import axios from 'axios';
const API_KEY = 'AIzaSyA3wfl35CzCuXjk1wCkz64hZawNYyWjHDg';
const BASE_URL = 'https://maps.googleapis.com/maps/api';

const getDirections = async (origin, destination) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/directions/json?origin=${origin}&destination=${destination}&key=${API_KEY}`
      );
      
      if (response.status !== 200) {
        console.error(`Unexpected status code: ${response.status}`);
        console.error(response.data);
        throw new Error(`Unexpected status code: ${response.status}`);
      }
      
      return response.data;
    } catch (error) {
      console.error('Error fetching directions data:', error);
      throw error;
    }
  };
  

// Example usage:
const origin = 'New+York,NY';
const destination = 'Los+Angeles,CA';

getDirections(origin, destination)
  .then(data => {
    console.log('Directions API Response:', data);
    // Handle the data as needed
  })
  .catch(error => {
    console.error('Error:', error);
  });

export { getDirections };

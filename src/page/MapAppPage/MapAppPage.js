import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import axios from 'axios';
import './styles.scss';

const API_KEY = 'AIzaSyA3wfl35CzCuXjk1wCkz64hZawNYyWjHDg';

const MapAppPage = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [directions, setDirections] = useState(null);

  const getLatLng = async (zipcode) => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=${API_KEY}`);
      const { lat, lng } = response.data.results[0].geometry.location;
      return { lat, lng };
    } catch (error) {
      console.error('Error getting coordinates: ', error);
      return null;
    }
  };

  const handleSearch = async () => {
    const originLatLng = await getLatLng(origin);
    const destinationLatLng = await getLatLng(destination);

    if (originLatLng && destinationLatLng) {
      setDirections({
        origin: originLatLng,
        destination: destinationLatLng,
        travelMode: 'DRIVING',
      });
    }
  };

  return (
    <div className="app-container">
      <div className="search-container">
        <input type="text" placeholder="Enter origin ZIP code" value={origin} onChange={(e) => setOrigin(e.target.value)} />
        <input type="text" placeholder="Enter destination ZIP code" value={destination} onChange={(e) => setDestination(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="map-container">
        <LoadScript googleMapsApiKey={API_KEY}>
          <GoogleMap
            mapContainerStyle={{ height: '400px', width: '100%' }}
            zoom={10}
            center={{ lat: 37.7749, lng: -122.4194 }} // Default center, you can adjust it based on your needs
          >
            {directions && <DirectionsService options={directions} callback={(result) => setDirections({ ...directions, response: result })} />}
            {directions && directions.response && <DirectionsRenderer options={{ directions: directions.response }} />}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default MapAppPage;

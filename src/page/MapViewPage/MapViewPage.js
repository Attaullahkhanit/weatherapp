import React, { useRef, useState } from 'react';
import { Box, Button, ButtonGroup, IconButton, Input, Skeleton, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import DirectionsIcon from '@mui/icons-material/Directions';
import ClearIcon from '@mui/icons-material/Clear';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api';

const center = { lat: 48.8584, lng: 2.2945 };

function MapViewPage() {
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const originRef = useRef(null);
  const destinationRef = useRef(null);

  async function calculateRoute() {
    if (!originRef.current || !destinationRef.current || originRef.current.value === '' || destinationRef.current.value === '') {
      return;
    }
    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    if (originRef.current) originRef.current.value = '';
    if (destinationRef.current) destinationRef.current.value = '';
  }

  return (
    <Box
    position='relative'
    display='flex'
    flexDirection='column'
    alignItems='center'
    height='100vh'
    width='100vw'
    >
    <Box position='absolute' left={0} top={0} height='100%' width='100%' zIndex='2'>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100vh' }}
          onLoad={map => setMap(map)}
        >
          <MarkerF position={center} />
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
      </LoadScript>
      </Box>
      <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
      >
        <Box display='flex' justifyContent='space-between' alignItems='center' mb={2} zIndex='0'>
          <Autocomplete
            options={[]}
            renderInput={(params) => <Input {...params} inputRef={originRef} placeholder='Origin' />}
          />
          <Autocomplete
            options={[]}
            renderInput={(params) => <Input {...params} inputRef={destinationRef} placeholder='Destination' />}
          />
          <ButtonGroup>
            <Button color='primary' onClick={calculateRoute} startIcon={<DirectionsIcon />}>
              Calculate Route
            </Button>
            <IconButton color='secondary' onClick={clearRoute}>
              <ClearIcon />
            </IconButton>
          </ButtonGroup>
        </Box>
        <Box mt={4} display='flex' justifyContent='space-between'>
          <Typography>Distance: {distance}</Typography>
          <Typography>Duration: {duration}</Typography>
          <IconButton color='primary' onClick={() => map?.panTo(center) && map?.setZoom(15)}>
            <LocationOnIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default MapViewPage;

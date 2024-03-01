import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  Input,
  Skeleton,
  Typography,
} from "@mui/material";
// import Autocomplete from "@mui/material/Autocomplete";
import DirectionsIcon from "@mui/icons-material/Directions";
import ClearIcon from "@mui/icons-material/Clear";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
  Autocomplete,
} from "@react-google-maps/api";
// import SearchLocation from "../../components/SearchLocation/SearchLocation";

const center = { lat: 30.3753, lng: 69.3451 };

const containerStyle = {
  width: "100%",
  height: "100vh",
};

function MapViewPage() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  if (!isLoaded) {
    return <Skeleton />;
  }

  async function calculateRoute({ handleLocationSelect }) {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    console.log("Origin:", originRef.current.value);
    console.log("Destination:", destiantionRef.current.value);
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }
  // Api Calling
  const saveZipCodeEndPoint = async () => {
    try {
      if (
        originRef.current.value === "" ||
        destiantionRef.current.value === "" ||
        !directionsResponse
      ) {
        console.error("Invalid data to save.");
        return;
      }

      const saveData = {
        origin: originRef.current.value,
        destination: destiantionRef.current.value,
        distance: distance,
        duration: duration,
      };
      const result = await saveZipCodeApi(saveData);
      console.log("Save API response:", result);
    } catch (error) {
      console.error("Save API error:", error);
    }
  };

  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100vh"
      width="100vw"
    >
      <Box position="absolute" left={0} top={0} height="100%" width="100%">
        <GoogleMap
          mapContainerStyle={containerStyle}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          center={center}
          zoom={15}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        style={{
          backgroundColor: "white",
          borderRadius: "5px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          zIndex: "2",
        }}
      >
        <Box
          borderRadius="lg"
          px={2}
          mb={2}
          bgColor="white"
          minW="container.md"
          zIndex="1"
        >
          {/* <SearchLocation onLocationSelect={handleLocationSelect} /> */}
        </Box>
        <Divider />
        <Box
          p={2}
          borderRadius="lg"
          bgColor="white"
          shadow="base"
          minW="container.md"
          zIndex="1"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Autocomplete>
              <Input type="text" placeholder="Origin" ref={originRef} />
            </Autocomplete>
            <Autocomplete>
              <Input
                type="text"
                placeholder="Destination"
                ref={destiantionRef}
              />
            </Autocomplete>
            <ButtonGroup>
              <Button color="primary" type="submit" onClick={calculateRoute}>
                Calculate Route
              </Button>
              <IconButton color="secondary" onClick={clearRoute}>
                <ClearIcon />
              </IconButton>
            </ButtonGroup>
          </Box>

          <Box
            mt={4}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            display="flex"
            justifyContent="space-between"
          >
            <Typography>Distance: {distance}</Typography>
            <Typography>Duration: {duration}</Typography>
            <Button variant="outlined" onClick={saveZipCodeEndPoint}>
              Save
            </Button>
            <IconButton
              color="primary"
              isRound
              onClick={() => map?.panTo(center) && map?.setZoom(15)}
            >
              <LocationOnIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default MapViewPage;

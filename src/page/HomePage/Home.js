import React, { useEffect, useState } from "react";
import { getWeatherByLocation } from "../../apis/services/weatherService";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  Paper,
  Typography,
  Switch,
  FormControlLabel,
  Box,
  Button,
} from "@mui/material";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import WeatherToday from "../../components/WeatherCards/WeatherToday";
import SearchLocation from "../../components/SearchLocation/SearchLocation";
import { useNavigate } from "react-router-dom";
import clearsky from '../../assets/clear sky12.jpg';
import { showSuccessToast } from "../../utils/showToast";


const Home = ({ userAuthenticated, setUserAuthenticated }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const navigate = useNavigate()

  const handleLogout = () => {
    setUserAuthenticated(false);
    showSuccessToast("You Are Log Out")
    navigate("/");
  };

  const handleLocationSelect = async (selectedLocation) => {
    const { latLng } = selectedLocation;
    getWeatherData(latLng.lat, latLng.lng);
  };
  const temperatureInCelsius = weatherData
    ? Math.round(weatherData.main.temp) - 273.15
    : null;
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeatherData(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
  const getWeatherData = async (latitude, longitude) => {
    try {
      const data = await getWeatherByLocation(latitude, longitude);
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper
        elevation={3}
        sx={{
          padding: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          className="title-bar"
          sx={{
            width: "100%",
            display: "inline-flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxSizing: "border-box",
            position: "relative",
            zIndex: "1",
          }}
        >
          <Box>
            <Typography variant="h5" component="h1" gutterBottom>
              Weather App
            </Typography>
          </Box>
          <Box className="search-input-field">
            <SearchLocation onLocationSelect={handleLocationSelect} />
          </Box>
          <Box>
            <Button onClick={()=> handleLogout()} variant="contained">LogOut</Button>
            <FormControlLabel
              sx={{ ml: "auto" }}
              control={
                <Switch
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
              }
              label={
                darkMode ? (
                  <>
                    <Box sx={{ display: "inline-flex", alignItems: "center" }}>
                      Light Mode
                      <MdOutlineLightMode fontSize="large" />
                    </Box>
                  </>
                ) : (
                  <>
                    <Box sx={{ display: "inline-flex", alignItems: "center" }}>
                      Dark Mode
                      <MdDarkMode fontSize="large" />
                    </Box>
                  </>
                )
              }
            />
          </Box>
        </Box>
        {/* MapViewCard */}
        {/* <MapViewCard/> */}
        {/* Weather Card Data */}
        <Box sx={{width: "100%", justifyItems:'end', textAlign: 'end', marginBottom: '10px' }}>
          <Button onClick={()=> navigate("/mapview")} variant="contained" color="success">Map View</Button>
        </Box>
        <WeatherToday weatherData={weatherData} />
        {/* <Box sx={{width: "100%", justifyItems:'end', textAlign: 'end', marginBottom: '10px' }}>
          <Button onClick={()=> navigate("/map")} variant="contained">Map</Button>
        </Box> */}
      </Paper>
    </ThemeProvider>
  );
};

export default Home;

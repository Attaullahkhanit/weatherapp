import React, { useEffect, useState } from "react";
import { Container, Grid, Divider, Typography, Box } from '@mui/material';
import { FaWind } from 'react-icons/fa';
import { BsThermometerSun } from "react-icons/bs";
import { MdDewPoint } from "react-icons/md";
import { FaCompressAlt } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";
import { FaDroplet } from "react-icons/fa6";
import { FaSun } from "react-icons/fa";
import { GiConcentricCrescents } from "react-icons/gi";
import { Paper } from "@mui/material";
import HeavyRain from "../../assets/heavy-rain1.jpg";
import ClearSky from "../../assets/clearSky.jpg";
import LightRain from "../../assets/lightrain.jpg";
import ScatcherCloud from "../../assets/scaturedclo.jpg";
import OvercastClouds from "../../assets/overcastclouds1.jpg";
import BrokenClouds from "../../assets/brokenClouds.jpg";
import Haze from "../../assets/haze9.jpg";

import "./styles.scss";
import { convertLength } from "@mui/material/styles/cssUtils";

  const WeatherToday = ({ weatherData }) => {
  const [bg, setBg] = useState(ClearSky);
  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    if (weatherData) {
      const weatherCondition = weatherData.weather[0].main.toLowerCase();
      if(weatherCondition === 'rain') {
        setBg(HeavyRain);
      } else if(weatherCondition === 'clear') {
        setBg(ClearSky);
      } else if(weatherCondition === 'clouds') {
        setBg(ScatcherCloud);
      } else if(weatherCondition === 'light rain'){
        setBg(LightRain);
      } else if(weatherCondition === 'overcast clouds'){
        setBg(OvercastClouds);
      } else if(weatherCondition === 'broken clouds'){
        setBg(BrokenClouds);
      } else if(weatherCondition === 'haze'){
        setBg(Haze);
      } else {
        setBg(ClearSky);
      }

      const icon = weatherData?.weather[0]?.icon;
      if (icon) {
        const lastChar = icon.charAt(icon.length - 1);
        setTimeOfDay(lastChar === 'd' ? 'Day' : lastChar === 'n' ? 'Night' : '');
      }
    }
  }, [weatherData]);

  const temperatureInCelsius = weatherData ? (weatherData.main.feels_like - 273.15) : null;
  const temperatureInCelsiusMax = weatherData ? (weatherData.main.temp_max - 273.15) : null;
  const temperatureInCelsiusMin = weatherData ? (weatherData.main.temp_min - 273.15) : null;
  const visibilityInKilometers = weatherData ? (weatherData.visibility / 1000) : null;

  return (
    <>
    { weatherData && (
    <Paper className="card-container" >
      <Box style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <Typography variant="h4" component="h1" gutterBottom>Weather Today ,{weatherData.name}, {weatherData.sys.country}</Typography>
      <Typography variant="body1">{timeOfDay}</Typography>
      </Box>
      <Box className="flex-box" my={2} style={{ backgroundImage: `url(${bg})` }}>
        <Box>
        <Typography variant="h6" component="h2" sx={{color: 'white'}}>
          Feels like
        </Typography>
        <Typography variant="h6" component="h3" fontWeight="bolder" sx={{color: 'white'}}>
          {temperatureInCelsius !== null ? `${Math.round(temperatureInCelsius)}°C` : 'N/A'}
        </Typography>
          </Box>
          <Box>
          <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt="Weather Icon"
                style={{ width: '80px', height: '80px' }}
          />
          <Typography sx={{color: 'white'}}>
            {weatherData.weather[0].description}
          </Typography>
          </Box>
      </Box>

      <Container>
      <Grid container spacing={4}>
        {/* First Column */}
        <Grid item xs={12} md={6}>
          <Box className="flex-box">
            <Box className="icon-box">
              <BsThermometerSun/>
              <Typography sx={{pl: '8px'}} variant="body1">High/Low</Typography>
            </Box>
            <Box>
            <Typography variant="body1">{temperatureInCelsiusMax !== null ? `${Math.round(temperatureInCelsiusMax)}` : 'N/A'}°/{temperatureInCelsiusMin !== null ? `${Math.round(temperatureInCelsiusMin)}` : 'N/A'}°C</Typography>
            </Box>
          </Box>
          <Divider className="divider" />
          <Box className="flex-box">
            <Box className="icon-box">
            <MdDewPoint />
            <Typography sx={{pl: '8px'}} variant="body1">Humidity</Typography>
            </Box>
            <Box>
            <Typography variant="body1">{weatherData.main.humidity}%</Typography>
            </Box>
          </Box>
          <Divider className="divider" />
          <Box className="flex-box">
          <Box className="icon-box">
            <FaCompressAlt />
            <Typography sx={{pl: '8px'}} variant="body1">Pressure</Typography>
            </Box>
            <Box>
            <Typography variant="body1">{weatherData.main.pressure} mb</Typography>
            </Box>
          </Box>
          <Divider className="divider" />
          <Box className="flex-box">
          <Box className="icon-box">
            <MdVisibility />
            <Typography sx={{pl: '8px'}} variant="body1">Visibility</Typography>
            </Box>
            <Box>
            <Typography variant="body1">{visibilityInKilometers !== null ? `${visibilityInKilometers.toFixed(2)} km` : 'N/A'}</Typography>
            </Box>
          </Box>
        </Grid>

        {/* Second Column */}
        <Grid item xs={12} md={6}>
          <Box className="flex-box">
          <Box className="icon-box">
            <FaWind />
            <Typography sx={{pl: '8px'}} variant="body1">Wind</Typography>
            </Box>
            <Box>
            <Typography variant="body1">{weatherData?.wind?.speed} km/h</Typography>
            </Box>
          </Box>
          <Divider className="divider" />
          <Box className="flex-box">
          <Box className="icon-box">
            <FaDroplet />
            <Typography sx={{pl: '8px'}} variant="body1">Dew Point</Typography>
            </Box>
            <Box>
            <Typography variant="body1">4°</Typography>
            </Box>
          </Box>
          <Divider className="divider" />
          <Box className="flex-box">
          <Box className="icon-box">
            <FaSun />
            <Typography sx={{pl: '8px'}} variant="body1">UV Index</Typography>
            </Box>
            <Box>
            <Typography variant="body1">4 of 11</Typography>
            </Box>
          </Box>
          <Divider className="divider" />
          <Box className="flex-box">
          <Box className="icon-box">
            <GiConcentricCrescents />
            <Typography sx={{pl: '8px'}} variant="body1">Moon Phase</Typography>
            </Box>
            <Box>
            <Typography variant="body1">Waning Gibbous</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
    
    </Paper>
    )}
    </>
  );
};

export default WeatherToday;

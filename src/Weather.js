import React, { useState } from "react";
import Temperature from './Temp';
import WindSpeed from './Ws';
import WeatherCondition from './Wc';
import SunriseSunset from './Rise';
import Humidity from "./Humidity";
import Coordinates from "./Coordinates";
import './dd.css'; 
import Grid from '@mui/material/Grid';

const Weather = () => {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [weatherCondition, setWeatherCondition] = useState("");
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [coordinates, setCoordinates] = useState({ lon: null, lat: null });

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c4594e42d223f012c15fc87028b93c70&units=metric`)
      .then(response => response.json())
      .then(data => {
        if (data.main) {
          setTemp(data.main.temp);
          setWindSpeed(data.wind.speed);
          setWeatherCondition(data.weather[0].description);
          setSunrise(new Date(data.sys.sunrise * 1000).toLocaleTimeString());
          setSunset(new Date(data.sys.sunset * 1000).toLocaleTimeString());
          setHumidity(data.main.humidity);
          setCoordinates({ lon: data.coord.lon, lat: data.coord.lat });
        } else {
          setTemp("City not found");
          setWindSpeed("City not found");
          setWeatherCondition("City not found");
          setSunrise("City not found");
          setSunset("City not found");
          setHumidity("City not found");
          setCoordinates({ lon: "City not found" });
        }
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
        setTemp("Error fetching data");
        setWindSpeed(null);
        setWeatherCondition("");
        setSunrise(null);
        setSunset(null);
        setHumidity(null);
        setCoordinates({ lon: null, lat: null });
      });
  };

  return (
    <div className="weather-app">
      <form onSubmit={handleFormSubmit} className="form">
        <input
          type="text"
          value={city} // Bind the value to the city state
          placeholder="Enter city"
          onChange={handleInputChange}
          className="input"
        />
        <input
          type='submit'
          value='Get Weather'
          className="submit-btn"
        />
      </form>
      <Grid container spacing={2} className="grid-container">
        <Grid item xs={12} sm={6} md={4} lg={2} className="grid-item">
          <div className="glass-card">
            <Temperature temp={temp} />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2} className="grid-item">
          <div className="glass-card">
            <WindSpeed windSpeed={windSpeed} />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2} className="grid-item">
          <div className="glass-card">
            <WeatherCondition weatherCondition={weatherCondition} />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2} className="grid-item">
          <div className="glass-card">
            <SunriseSunset sunrise={sunrise} sunset={sunset} />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2} className="grid-item">
          <div className="glass-card">
            <Humidity humidity={humidity} />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2} className="grid-item">
          <div className="glass-card">
            <Coordinates lon={coordinates.lon} lat={coordinates.lat} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Weather;

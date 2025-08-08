import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      const response = await fetch('https://api.weatherapi.com/v1/forecast.json?key=b8e50a44d75a416f98591324250808&q=London&days=7&aqi=yes');
      const data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch weather data');
      setLoading(false);
    }
  };

  if (loading) return <div className="App">Loading weather data...</div>;
  if (error) return <div className="App">Error: {error}</div>;
  if (!weather) return <div className="App">No weather data</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Dashboard</h1>
        <div className="weather-info">
          <h2>{weather.location.name}, {weather.location.country}</h2>
          <div className="current-weather">
            <h3>{weather.current.temp_c}°C</h3>
            <p>{weather.current.condition.text}</p>
            <p>Feels like: {weather.current.feelslike_c}°C</p>
            <p>Humidity: {weather.current.humidity}%</p>
            <p>Wind: {weather.current.wind_kph} km/h</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App; 
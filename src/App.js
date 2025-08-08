import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [location, setLocation] = useState('London');
  const [searchInput, setSearchInput] = useState('London');
  const [units, setUnits] = useState('metric');
  const [theme, setTheme] = useState('light');

  const fetchWeather = useCallback(async (searchLocation) => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b8e50a44d75a416f98591324250808&q=${searchLocation}&days=7&aqi=yes`);
      const data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch weather data');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather(location);
  }, [fetchWeather, location]);

  const handleLocationChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setLocation(searchInput.trim());
    }
  };

  const toggleUnits = () => {
    setUnits(units === 'metric' ? 'imperial' : 'metric');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (loading) return (
    <div className={`App ${theme}`}>
      <div className="loading">Loading weather data...</div>
    </div>
  );

  if (error) return (
    <div className={`App ${theme}`}>
      <div className="error">Error: {error}</div>
    </div>
  );

  if (!weather) return (
    <div className={`App ${theme}`}>
      <div className="error">No weather data</div>
    </div>
  );

  const current = weather.current;
  const forecast = weather.forecast?.forecastday || [];
  const hourly = forecast[0]?.hour || [];

  return (
    <div className={`App ${theme}`}>
      <div className="dashboard">
        {/* Header */}
        <header className="header">
          <h1>Weather Dashboard</h1>
          <div className="controls">
            <form onSubmit={handleLocationSubmit} className="search-form">
              <input 
                type="text" 
                value={searchInput} 
                onChange={handleLocationChange}
                placeholder="Enter location..."
                className="location-input"
              />
              <button type="submit" className="search-button">
                Search
              </button>
            </form>
            <button onClick={toggleUnits} className="unit-toggle">
              {units === 'metric' ? '°C' : '°F'}
            </button>
            <button onClick={toggleTheme} className="theme-toggle">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </header>

        {/* Current Weather */}
        <section className="current-weather">
          <div className="location-info">
            <h2>{weather.location.name}, {weather.location.country}</h2>
            <p className="time">{new Date(current.last_updated).toLocaleString()}</p>
          </div>
          
          <div className="weather-main">
            <div className="temperature">
              <span className="temp-value">
                {units === 'metric' ? current.temp_c : current.temp_f}°
              </span>
              <span className="temp-unit">
                {units === 'metric' ? 'C' : 'F'}
              </span>
            </div>
            <div className="weather-condition">
              <img src={current.condition.icon} alt={current.condition.text} />
              <p>{current.condition.text}</p>
            </div>
          </div>

          <div className="weather-details">
            <div className="detail-item">
              <span className="label">Feels like</span>
              <span className="value">
                {units === 'metric' ? current.feelslike_c : current.feelslike_f}°
              </span>
            </div>
            <div className="detail-item">
              <span className="label">Humidity</span>
              <span className="value">{current.humidity}%</span>
            </div>
            <div className="detail-item">
              <span className="label">Wind</span>
              <span className="value">
                {units === 'metric' ? current.wind_kph : current.wind_mph} {units === 'metric' ? 'km/h' : 'mph'}
              </span>
            </div>
            <div className="detail-item">
              <span className="label">UV Index</span>
              <span className="value">{current.uv}</span>
            </div>
            <div className="detail-item">
              <span className="label">Pressure</span>
              <span className="value">{current.pressure_mb} mb</span>
            </div>
            <div className="detail-item">
              <span className="label">Visibility</span>
              <span className="value">{current.vis_km} km</span>
            </div>
          </div>
        </section>

        {/* Hourly Forecast */}
        <section className="hourly-forecast">
          <h3>Hourly Forecast</h3>
          <div className="hourly-container">
            {hourly.slice(0, 24).map((hour, index) => (
              <div key={index} className="hourly-item">
                <span className="hour-time">
                  {new Date(hour.time).getHours()}:00
                </span>
                <img src={hour.condition.icon} alt={hour.condition.text} />
                <span className="hour-temp">
                  {units === 'metric' ? hour.temp_c : hour.temp_f}°
                </span>
                <span className="hour-chance">
                  {hour.chance_of_rain}%
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Daily Forecast */}
        <section className="daily-forecast">
          <h3>7-Day Forecast</h3>
          <div className="daily-container">
            {forecast.map((day, index) => (
              <div key={index} className="daily-item">
                <div className="day-info">
                  <span className="day-name">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                  <span className="day-date">
                    {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <img src={day.day.condition.icon} alt={day.day.condition.text} />
                <div className="day-temps">
                  <span className="max-temp">
                    {units === 'metric' ? day.day.maxtemp_c : day.day.maxtemp_f}°
                  </span>
                  <span className="min-temp">
                    {units === 'metric' ? day.day.mintemp_c : day.day.mintemp_f}°
                  </span>
                </div>
                <div className="day-details">
                  <span className="chance-rain">{day.day.daily_chance_of_rain}%</span>
                  <span className="condition">{day.day.condition.text}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Environmental Data */}
        <section className="environmental-data">
          <h3>Environmental Data</h3>
          <div className="env-grid">
            <div className="env-item">
              <span className="env-label">Air Quality</span>
              <span className="env-value">{weather.current.air_quality?.['us-epa-index'] || 'N/A'}</span>
            </div>
            <div className="env-item">
              <span className="env-label">UV Index</span>
              <span className="env-value">{current.uv}</span>
            </div>
            <div className="env-item">
              <span className="env-label">Pressure</span>
              <span className="env-value">{current.pressure_mb} mb</span>
            </div>
            <div className="env-item">
              <span className="env-label">Visibility</span>
              <span className="env-value">{current.vis_km} km</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App; 
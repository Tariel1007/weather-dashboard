import React, { useEffect } from 'react';
import { WeatherProvider, useWeather } from './context/WeatherContext';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import EnvironmentalData from './components/EnvironmentalData';
import WeatherAlerts from './components/WeatherAlerts';
import LocationSearch from './components/LocationSearch';
import Settings from './components/Settings';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

const WeatherDashboard: React.FC = () => {
  const { state, fetchWeather, fetchWeatherByCoords } = useWeather();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.log('Geolocation error:', error);
          fetchWeather(state.currentLocation);
        }
      );
    } else {
      fetchWeather(state.currentLocation);
    }
  }, []);

  if (state.loading) {
    return <LoadingSpinner />;
  }

  if (state.error) {
    return <ErrorMessage message={state.error} />;
  }

  if (!state.weatherData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="weather-dashboard">
      <Header />
      <main className="dashboard-main">
        <div className="dashboard-grid">
          <section className="current-weather-section">
            <CurrentWeather />
          </section>
          <section className="controls-section">
            <LocationSearch />
            <Settings />
          </section>
          <section className="hourly-forecast-section">
            <HourlyForecast />
          </section>
          <section className="daily-forecast-section">
            <DailyForecast />
          </section>
          <section className="environmental-data-section">
            <EnvironmentalData />
          </section>
          {state.weatherData.alerts.length > 0 && (
            <section className="alerts-section">
              <WeatherAlerts />
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <WeatherProvider>
      <WeatherDashboard />
    </WeatherProvider>
  );
};

export default App;

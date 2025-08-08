import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { 
  formatTemperature, 
  getWeatherIcon, 
  calculateFeelsLike,
  getClothingSuggestion,
  getActivityRecommendation
} from '../utils/weatherUtils';
import './CurrentWeather.css';

const CurrentWeather: React.FC = () => {
  const { state } = useWeather();
  const { weatherData, preferences } = state;

  if (!weatherData) return null;

  const { current, location } = weatherData;
  const feelsLike = calculateFeelsLike(current.temp_c, current.humidity, current.wind_kph);
  const clothingSuggestion = getClothingSuggestion(current.temp_c);
  const activityRecommendation = getActivityRecommendation(current.temp_c, current.condition.text);

  return (
    <div className="current-weather weather-card fade-in-up">
      <div className="current-weather-grid">
        {/* Main Weather Display */}
        <div className="main-weather">
          <div className="weather-icon-large">
            {getWeatherIcon(current.condition.code, current.is_day === 1)}
          </div>
          <div className="temperature-display">
            <div className="current-temp">
              {formatTemperature(current.temp_c, current.temp_f, preferences.units)}
            </div>
            <div className="feels-like">
              Feels like {formatTemperature(feelsLike, feelsLike * 9/5 + 32, preferences.units)}
            </div>
          </div>
          <div className="weather-condition">
            <h2>{current.condition.text}</h2>
            <p className="location-full">
              {location.name}, {location.region}, {location.country}
            </p>
          </div>
        </div>

        {/* Key Weather Metrics */}
        <div className="weather-metrics">
          <div className="metric-item">
            <span className="metric-label">Humidity</span>
            <span className="metric-value">{current.humidity}%</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Wind</span>
            <span className="metric-value">
              {Math.round(preferences.units.wind === 'kmh' ? current.wind_kph : current.wind_mph)} {preferences.units.wind === 'kmh' ? 'km/h' : 'mph'}
            </span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Pressure</span>
            <span className="metric-value">
              {Math.round(preferences.units.pressure === 'mb' ? current.pressure_mb : current.pressure_in)} {preferences.units.pressure === 'mb' ? 'mb' : 'in'}
            </span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Visibility</span>
            <span className="metric-value">
              {Math.round(preferences.units.visibility === 'km' ? current.vis_km : current.vis_miles)} {preferences.units.visibility === 'km' ? 'km' : 'miles'}
            </span>
          </div>
          <div className="metric-item">
            <span className="metric-label">UV Index</span>
            <span className="metric-value">{current.uv}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Cloud Cover</span>
            <span className="metric-value">{current.cloud}%</span>
          </div>
        </div>

        {/* Recommendations */}
        <div className="recommendations">
          <div className="recommendation-card">
            <h3>👕 Clothing</h3>
            <p>{clothingSuggestion}</p>
          </div>
          <div className="recommendation-card">
            <h3>🎯 Activities</h3>
            <p>{activityRecommendation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather; 
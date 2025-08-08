import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { getUVLevel, getAirQualityLevel, getWindDirection } from '../utils/weatherUtils';
import './EnvironmentalData.css';

const EnvironmentalData: React.FC = () => {
  const { state } = useWeather();
  const { weatherData, preferences } = state;

  if (!weatherData) return null;

  const { current } = weatherData;
  const uvLevel = getUVLevel(current.uv);
  const windDirection = getWindDirection(current.wind_degree);

  return (
    <div className="environmental-data weather-card">
      <div className="section-header">
        <div>
          <h3 className="section-title">Environmental Data</h3>
          <p className="section-subtitle">Detailed conditions</p>
        </div>
      </div>
      
      <div className="env-grid">
        <div className="env-item">
          <div className="env-icon">🌡️</div>
          <div className="env-content">
            <h4>Humidity</h4>
            <p className="env-value">{current.humidity}%</p>
            <p className="env-description">
              {current.humidity < 30 ? 'Very dry' : 
               current.humidity < 50 ? 'Comfortable' : 
               current.humidity < 70 ? 'Moderate' : 'High humidity'}
            </p>
          </div>
        </div>

        <div className="env-item">
          <div className="env-icon">💨</div>
          <div className="env-content">
            <h4>Wind</h4>
            <p className="env-value">
              {Math.round(preferences.units.wind === 'kmh' ? current.wind_kph : current.wind_mph)} {preferences.units.wind === 'kmh' ? 'km/h' : 'mph'}
            </p>
            <p className="env-description">
              {windDirection} {current.wind_dir}
            </p>
          </div>
        </div>

        <div className="env-item">
          <div className="env-icon">📊</div>
          <div className="env-content">
            <h4>Pressure</h4>
            <p className="env-value">
              {Math.round(preferences.units.pressure === 'mb' ? current.pressure_mb : current.pressure_in)} {preferences.units.pressure === 'mb' ? 'mb' : 'in'}
            </p>
            <p className="env-description">
              {current.pressure_mb < 1000 ? 'Low pressure' : 
               current.pressure_mb > 1020 ? 'High pressure' : 'Normal pressure'}
            </p>
          </div>
        </div>

        <div className="env-item">
          <div className="env-icon">👁️</div>
          <div className="env-content">
            <h4>Visibility</h4>
            <p className="env-value">
              {Math.round(preferences.units.visibility === 'km' ? current.vis_km : current.vis_miles)} {preferences.units.visibility === 'km' ? 'km' : 'miles'}
            </p>
            <p className="env-description">
              {current.vis_km < 5 ? 'Poor visibility' : 
               current.vis_km < 10 ? 'Moderate visibility' : 'Good visibility'}
            </p>
          </div>
        </div>

        <div className="env-item">
          <div className="env-icon">☀️</div>
          <div className="env-content">
            <h4>UV Index</h4>
            <p className="env-value" style={{ color: uvLevel.color }}>
              {current.uv} - {uvLevel.level}
            </p>
            <p className="env-description">
              {current.uv <= 2 ? 'Low risk' : 
               current.uv <= 5 ? 'Moderate risk' : 
               current.uv <= 7 ? 'High risk' : 
               current.uv <= 10 ? 'Very high risk' : 'Extreme risk'}
            </p>
          </div>
        </div>

        <div className="env-item">
          <div className="env-icon">☁️</div>
          <div className="env-content">
            <h4>Cloud Cover</h4>
            <p className="env-value">{current.cloud}%</p>
            <p className="env-description">
              {current.cloud < 25 ? 'Clear skies' : 
               current.cloud < 50 ? 'Partly cloudy' : 
               current.cloud < 75 ? 'Mostly cloudy' : 'Overcast'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalData; 
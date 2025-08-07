import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { formatTime, formatTemperature, getWeatherIcon, formatWindSpeed } from '../utils/weatherUtils';
import './HourlyForecast.css';

const HourlyForecast: React.FC = () => {
  const { state } = useWeather();
  const { weatherData, preferences } = state;

  if (!weatherData) return null;

  const today = weatherData.forecast.forecastday[0];
  const hourlyData = today.hour;

  return (
    <div className="hourly-forecast weather-card">
      <div className="section-header">
        <div>
          <h3 className="section-title">Hourly Forecast</h3>
          <p className="section-subtitle">Next 24 hours</p>
        </div>
      </div>
      
      <div className="hourly-scroll">
        <div className="hourly-grid">
          {hourlyData.map((hour, index) => (
            <div key={index} className="hourly-item">
              <div className="hour-time">{formatTime(hour.time)}</div>
              <div className="hour-icon">
                {getWeatherIcon(hour.condition.code, hour.is_day === 1)}
              </div>
              <div className="hour-temp">
                {formatTemperature(hour.temp_c, hour.temp_f, preferences.units)}
              </div>
              <div className="hour-wind">
                {formatWindSpeed(hour.wind_kph, hour.wind_mph, preferences.units)}
              </div>
              <div className="hour-precip">
                {hour.chance_of_rain > 0 && (
                  <span className="precip-chance">{hour.chance_of_rain}%</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast; 
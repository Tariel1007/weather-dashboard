import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { formatDate, formatTemperature, getWeatherIcon } from '../utils/weatherUtils';
import './DailyForecast.css';

const DailyForecast: React.FC = () => {
  const { state } = useWeather();
  const { weatherData, preferences } = state;

  if (!weatherData) return null;

  const dailyData = weatherData.forecast.forecastday;

  return (
    <div className="daily-forecast weather-card">
      <div className="section-header">
        <div>
          <h3 className="section-title">7-Day Forecast</h3>
          <p className="section-subtitle">Extended weather outlook</p>
        </div>
      </div>
      
      <div className="daily-grid">
        {dailyData.map((day, index) => (
          <div key={index} className="daily-item">
            <div className="daily-date">
              <div className="day-name">{formatDate(day.date)}</div>
            </div>
            
            <div className="daily-weather">
              <div className="daily-icon">
                {getWeatherIcon(day.day.condition.code)}
              </div>
              <div className="daily-condition">{day.day.condition.text}</div>
            </div>
            
            <div className="daily-temps">
              <div className="temp-high">
                {formatTemperature(day.day.maxtemp_c, day.day.maxtemp_f, preferences.units)}
              </div>
              <div className="temp-low">
                {formatTemperature(day.day.mintemp_c, day.day.mintemp_f, preferences.units)}
              </div>
            </div>
            
            <div className="daily-details">
              <div className="detail-item">
                <span className="detail-label">Rain</span>
                <span className="detail-value">{day.day.daily_chance_of_rain}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Wind</span>
                <span className="detail-value">
                  {Math.round(preferences.units.wind === 'kmh' ? day.day.maxwind_kph : day.day.maxwind_mph)} {preferences.units.wind === 'kmh' ? 'km/h' : 'mph'}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">UV</span>
                <span className="detail-value">{day.day.uv}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecast; 
import React from 'react';
import { useWeather } from '../context/WeatherContext';
import './WeatherAlerts.css';

const WeatherAlerts: React.FC = () => {
  const { state } = useWeather();
  const { weatherData } = state;

  if (!weatherData || weatherData.alerts.length === 0) return null;

  return (
    <div className="weather-alerts weather-card">
      <div className="section-header">
        <div>
          <h3 className="section-title">Weather Alerts</h3>
          <p className="section-subtitle">Severe weather warnings</p>
        </div>
        <div className="alert-count">{weatherData.alerts.length} active</div>
      </div>
      
      <div className="alerts-list">
        {weatherData.alerts.map((alert, index) => (
          <div key={index} className="alert-item">
            <div className="alert-header">
              <div className="alert-icon">⚠️</div>
              <div className="alert-info">
                <h4 className="alert-title">{alert.headline}</h4>
                <p className="alert-severity">{alert.severity} - {alert.urgency}</p>
              </div>
            </div>
            
            <div className="alert-content">
              <p className="alert-description">{alert.desc}</p>
              <div className="alert-details">
                <div className="detail-row">
                  <span className="detail-label">Areas:</span>
                  <span className="detail-value">{alert.areas}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Effective:</span>
                  <span className="detail-value">{alert.effective}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Expires:</span>
                  <span className="detail-value">{alert.expires}</span>
                </div>
              </div>
              
              {alert.instruction && (
                <div className="alert-instruction">
                  <strong>Instructions:</strong> {alert.instruction}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherAlerts; 
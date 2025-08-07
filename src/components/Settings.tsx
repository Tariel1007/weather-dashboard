import React from 'react';
import { useWeather } from '../context/WeatherContext';
import './Settings.css';

const Settings: React.FC = () => {
  const { state, toggleTheme, updateUnits } = useWeather();
  const { preferences } = state;

  return (
    <div className="settings weather-card">
      <div className="section-header">
        <h3 className="section-title">Settings</h3>
      </div>
      
      <div className="settings-content">
        {/* Theme Toggle */}
        <div className="setting-group">
          <label className="setting-label">Theme</label>
          <div className="setting-control">
            <button
              className={`theme-btn ${preferences.theme.mode === 'light' ? 'active' : ''}`}
              onClick={() => preferences.theme.mode !== 'light' && toggleTheme()}
            >
              ☀️ Light
            </button>
            <button
              className={`theme-btn ${preferences.theme.mode === 'dark' ? 'active' : ''}`}
              onClick={() => preferences.theme.mode !== 'dark' && toggleTheme()}
            >
              🌙 Dark
            </button>
          </div>
        </div>

        {/* Temperature Units */}
        <div className="setting-group">
          <label className="setting-label">Temperature</label>
          <div className="setting-control">
            <button
              className={`unit-btn ${preferences.units.temperature === 'celsius' ? 'active' : ''}`}
              onClick={() => updateUnits({ temperature: 'celsius' })}
            >
              °C
            </button>
            <button
              className={`unit-btn ${preferences.units.temperature === 'fahrenheit' ? 'active' : ''}`}
              onClick={() => updateUnits({ temperature: 'fahrenheit' })}
            >
              °F
            </button>
          </div>
        </div>

        {/* Wind Speed Units */}
        <div className="setting-group">
          <label className="setting-label">Wind Speed</label>
          <div className="setting-control">
            <button
              className={`unit-btn ${preferences.units.wind === 'kmh' ? 'active' : ''}`}
              onClick={() => updateUnits({ wind: 'kmh' })}
            >
              km/h
            </button>
            <button
              className={`unit-btn ${preferences.units.wind === 'mph' ? 'active' : ''}`}
              onClick={() => updateUnits({ wind: 'mph' })}
            >
              mph
            </button>
          </div>
        </div>

        {/* Pressure Units */}
        <div className="setting-group">
          <label className="setting-label">Pressure</label>
          <div className="setting-control">
            <button
              className={`unit-btn ${preferences.units.pressure === 'mb' ? 'active' : ''}`}
              onClick={() => updateUnits({ pressure: 'mb' })}
            >
              mb
            </button>
            <button
              className={`unit-btn ${preferences.units.pressure === 'in' ? 'active' : ''}`}
              onClick={() => updateUnits({ pressure: 'in' })}
            >
              in
            </button>
          </div>
        </div>

        {/* Visibility Units */}
        <div className="setting-group">
          <label className="setting-label">Visibility</label>
          <div className="setting-control">
            <button
              className={`unit-btn ${preferences.units.visibility === 'km' ? 'active' : ''}`}
              onClick={() => updateUnits({ visibility: 'km' })}
            >
              km
            </button>
            <button
              className={`unit-btn ${preferences.units.visibility === 'miles' ? 'active' : ''}`}
              onClick={() => updateUnits({ visibility: 'miles' })}
            >
              miles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 
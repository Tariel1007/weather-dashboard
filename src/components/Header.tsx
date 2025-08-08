import React from 'react';
import { format } from 'date-fns';
import { useWeather } from '../context/WeatherContext';
import './Header.css';

const Header: React.FC = () => {
  const { state } = useWeather();
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="app-title">
            <span className="weather-icon">🌤️</span>
            Weather Dashboard
          </h1>
          {state.weatherData && (
            <p className="location-info">
              {state.weatherData.location.name}, {state.weatherData.location.country}
            </p>
          )}
        </div>
        
        <div className="header-right">
          <div className="current-time">
            <span className="time">{format(currentTime, 'HH:mm:ss')}</span>
            <span className="date">{format(currentTime, 'EEE, MMM d, yyyy')}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 
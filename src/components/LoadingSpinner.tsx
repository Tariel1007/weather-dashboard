import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <h2 className="loading-text">Loading weather data...</h2>
        <p className="loading-subtitle">Fetching current conditions and forecasts</p>
      </div>
    </div>
  );
};

export default LoadingSpinner; 
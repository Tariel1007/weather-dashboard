import React from 'react';
import './ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="error-container">
      <div className="error-content">
        <div className="error-icon">⚠️</div>
        <h2 className="error-title">Oops! Something went wrong</h2>
        <p className="error-message">{message}</p>
        <p className="error-suggestion">
          Please check your internet connection and try again.
        </p>
        <button 
          className="error-retry-btn"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage; 
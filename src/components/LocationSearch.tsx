import React, { useState, useEffect } from 'react';
import { useWeather } from '../context/WeatherContext';
import weatherService from '../services/weatherService';
import './LocationSearch.css';

const LocationSearch: React.FC = () => {
  const { state, fetchWeather, addFavoriteLocation, removeFavoriteLocation } = useWeather();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsSearching(true);
    try {
      const results = await weatherService.searchLocations(query);
      setSuggestions(results);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Search error:', error);
      setSuggestions([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleLocationSelect = (location: any) => {
    setSearchQuery(location.name);
    setShowSuggestions(false);
    fetchWeather(location.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchWeather(searchQuery.trim());
      setShowSuggestions(false);
    }
  };

  const isFavorite = (locationName: string) => {
    return state.preferences.favoriteLocations.includes(locationName);
  };

  const toggleFavorite = (locationName: string) => {
    if (isFavorite(locationName)) {
      removeFavoriteLocation(locationName);
    } else {
      addFavoriteLocation(locationName);
    }
  };

  return (
    <div className="location-search weather-card">
      <div className="section-header">
        <h3 className="section-title">Location</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search for a city..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            🔍
          </button>
        </div>
        
        {isSearching && (
          <div className="search-loading">Searching...</div>
        )}
        
        {showSuggestions && suggestions.length > 0 && (
          <div className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => handleLocationSelect(suggestion)}
              >
                <div className="suggestion-info">
                  <span className="suggestion-name">{suggestion.name}</span>
                  <span className="suggestion-details">
                    {suggestion.region && `${suggestion.region}, `}
                    {suggestion.country}
                  </span>
                </div>
                <button
                  type="button"
                  className={`favorite-btn ${isFavorite(suggestion.name) ? 'favorited' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(suggestion.name);
                  }}
                >
                  {isFavorite(suggestion.name) ? '★' : '☆'}
                </button>
              </div>
            ))}
          </div>
        )}
      </form>
      
      {state.preferences.favoriteLocations.length > 0 && (
        <div className="favorites-section">
          <h4>Favorites</h4>
          <div className="favorites-list">
            {state.preferences.favoriteLocations.map((location, index) => (
              <div key={index} className="favorite-item">
                <span className="favorite-name">{location}</span>
                <button
                  type="button"
                  className="remove-favorite-btn"
                  onClick={() => removeFavoriteLocation(location)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSearch; 
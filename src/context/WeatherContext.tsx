import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { WeatherData, UserPreferences, Units, Theme } from '../types/weather';
import weatherService from '../services/weatherService';

interface WeatherState {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  currentLocation: string;
  preferences: UserPreferences;
}

type WeatherAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_WEATHER_DATA'; payload: WeatherData }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_LOCATION'; payload: string }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<UserPreferences> }
  | { type: 'TOGGLE_THEME' }
  | { type: 'UPDATE_UNITS'; payload: Partial<Units> };

const initialState: WeatherState = {
  weatherData: null,
  loading: false,
  error: null,
  currentLocation: 'New York',
  preferences: {
    units: {
      temperature: 'celsius',
      wind: 'kmh',
      pressure: 'mb',
      visibility: 'km'
    },
    theme: {
      mode: 'light'
    },
    favoriteLocations: []
  }
};

function weatherReducer(state: WeatherState, action: WeatherAction): WeatherState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_WEATHER_DATA':
      return { ...state, weatherData: action.payload, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_LOCATION':
      return { ...state, currentLocation: action.payload };
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload }
      };
    case 'TOGGLE_THEME':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          theme: {
            mode: state.preferences.theme.mode === 'light' ? 'dark' : 'light'
          }
        }
      };
    case 'UPDATE_UNITS':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          units: { ...state.preferences.units, ...action.payload }
        }
      };
    default:
      return state;
  }
}

interface WeatherContextType {
  state: WeatherState;
  dispatch: React.Dispatch<WeatherAction>;
  fetchWeather: (location: string) => Promise<void>;
  fetchWeatherByCoords: (lat: number, lon: number) => Promise<void>;
  toggleTheme: () => void;
  updateUnits: (units: Partial<Units>) => void;
  addFavoriteLocation: (location: string) => void;
  removeFavoriteLocation: (location: string) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

interface WeatherProviderProps {
  children: React.ReactNode;
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('weather-preferences');
    if (savedPreferences) {
      try {
        const preferences = JSON.parse(savedPreferences);
        dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences });
      } catch (error) {
        console.error('Error loading preferences:', error);
      }
    }

    // Load saved location
    const savedLocation = localStorage.getItem('weather-location');
    if (savedLocation) {
      dispatch({ type: 'SET_LOCATION', payload: savedLocation });
    }
  }, []);

  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('weather-preferences', JSON.stringify(state.preferences));
  }, [state.preferences]);

  // Save location to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('weather-location', state.currentLocation);
  }, [state.currentLocation]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.preferences.theme.mode);
  }, [state.preferences.theme.mode]);

  const fetchWeather = async (location: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      // Try to fetch real data first
      const data = await weatherService.getCurrentWeather(location);
      dispatch({ type: 'SET_WEATHER_DATA', payload: data });
      dispatch({ type: 'SET_LOCATION', payload: location });
    } catch (error) {
      // Fallback to mock data for development
      console.warn('Using mock data due to API error:', error);
      const mockData = weatherService.getMockWeatherData();
      dispatch({ type: 'SET_WEATHER_DATA', payload: mockData });
      dispatch({ type: 'SET_LOCATION', payload: location });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const data = await weatherService.getWeatherByCoords(lat, lon);
      dispatch({ type: 'SET_WEATHER_DATA', payload: data });
      dispatch({ type: 'SET_LOCATION', payload: data.location.name });
    } catch (error) {
      console.error('Error fetching weather by coordinates:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch weather data' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const updateUnits = (units: Partial<Units>) => {
    dispatch({ type: 'UPDATE_UNITS', payload: units });
  };

  const addFavoriteLocation = (location: string) => {
    if (!state.preferences.favoriteLocations.includes(location)) {
      dispatch({
        type: 'UPDATE_PREFERENCES',
        payload: {
          favoriteLocations: [...state.preferences.favoriteLocations, location]
        }
      });
    }
  };

  const removeFavoriteLocation = (location: string) => {
    dispatch({
      type: 'UPDATE_PREFERENCES',
      payload: {
        favoriteLocations: state.preferences.favoriteLocations.filter(
          loc => loc !== location
        )
      }
    });
  };

  const value: WeatherContextType = {
    state,
    dispatch,
    fetchWeather,
    fetchWeatherByCoords,
    toggleTheme,
    updateUnits,
    addFavoriteLocation,
    removeFavoriteLocation
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
}; 
import { format, fromUnixTime } from 'date-fns';
import { Units } from '../types/weather';

// Temperature conversion utilities
export const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9/5) + 32;
};

export const fahrenheitToCelsius = (fahrenheit: number): number => {
  return (fahrenheit - 32) * 5/9;
};

// Wind speed conversion
export const kmhToMph = (kmh: number): number => {
  return kmh * 0.621371;
};

export const mphToKmh = (mph: number): number => {
  return mph / 0.621371;
};

// Pressure conversion
export const mbToIn = (mb: number): number => {
  return mb * 0.02953;
};

export const inToMb = (inches: number): number => {
  return inches / 0.02953;
};

// Visibility conversion
export const kmToMiles = (km: number): number => {
  return km * 0.621371;
};

export const milesToKm = (miles: number): number => {
  return miles / 0.621371;
};

// Format temperature based on user preferences
export const formatTemperature = (tempC: number, tempF: number, units: Units): string => {
  const temp = units.temperature === 'celsius' ? tempC : tempF;
  const unit = units.temperature === 'celsius' ? '°C' : '°F';
  return `${Math.round(temp)}${unit}`;
};

// Format wind speed
export const formatWindSpeed = (windKph: number, windMph: number, units: Units): string => {
  const speed = units.wind === 'kmh' ? windKph : windMph;
  const unit = units.wind === 'kmh' ? 'km/h' : 'mph';
  return `${Math.round(speed)} ${unit}`;
};

// Format pressure
export const formatPressure = (pressureMb: number, pressureIn: number, units: Units): string => {
  const pressure = units.pressure === 'mb' ? pressureMb : pressureIn;
  const unit = units.pressure === 'mb' ? 'mb' : 'in';
  return `${Math.round(pressure)} ${unit}`;
};

// Format visibility
export const formatVisibility = (visKm: number, visMiles: number, units: Units): string => {
  const visibility = units.visibility === 'km' ? visKm : visMiles;
  const unit = units.visibility === 'km' ? 'km' : 'miles';
  return `${Math.round(visibility)} ${unit}`;
};

// Format time
export const formatTime = (timeString: string): string => {
  const date = new Date(timeString);
  return format(date, 'HH:mm');
};

// Format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'EEE, MMM d');
};

// Format date with time
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'MMM d, HH:mm');
};

// Get weather icon based on condition code
export const getWeatherIcon = (conditionCode: number, isDay: boolean = true): string => {
  const iconMap: { [key: number]: string } = {
    1000: isDay ? '☀️' : '🌙', // Clear
    1003: '⛅', // Partly cloudy
    1006: '☁️', // Cloudy
    1009: '☁️', // Overcast
    1030: '🌫️', // Mist
    1063: '🌦️', // Patchy rain
    1066: '🌨️', // Patchy snow
    1069: '🌨️', // Patchy sleet
    1087: '⛈️', // Thundery outbreaks
    1114: '🌨️', // Blowing snow
    1117: '🌨️', // Blizzard
    1135: '🌫️', // Fog
    1147: '🌫️', // Freezing fog
    1150: '🌧️', // Patchy light drizzle
    1153: '🌧️', // Light drizzle
    1168: '🌧️', // Freezing drizzle
    1171: '🌧️', // Heavy freezing drizzle
    1180: '🌧️', // Patchy light rain
    1183: '🌧️', // Light rain
    1186: '🌧️', // Moderate rain at times
    1189: '🌧️', // Moderate rain
    1192: '🌧️', // Heavy rain at times
    1195: '🌧️', // Heavy rain
    1198: '🌧️', // Light freezing rain
    1201: '🌧️', // Moderate or heavy freezing rain
    1204: '🌨️', // Light sleet
    1207: '🌨️', // Moderate or heavy sleet
    1210: '🌨️', // Patchy light snow
    1213: '🌨️', // Light snow
    1216: '🌨️', // Patchy moderate snow
    1219: '🌨️', // Moderate snow
    1222: '🌨️', // Patchy heavy snow
    1225: '🌨️', // Heavy snow
    1237: '🌨️', // Ice pellets
    1240: '🌧️', // Light rain shower
    1243: '🌧️', // Moderate or heavy rain shower
    1246: '🌧️', // Torrential rain shower
    1249: '🌨️', // Light sleet showers
    1252: '🌨️', // Moderate or heavy sleet showers
    1255: '🌨️', // Light snow showers
    1258: '🌨️', // Moderate or heavy snow showers
    1261: '🌨️', // Light showers of ice pellets
    1264: '🌨️', // Moderate or heavy showers of ice pellets
    1273: '⛈️', // Patchy light rain with thunder
    1276: '⛈️', // Moderate or heavy rain with thunder
    1279: '⛈️', // Patchy light snow with thunder
    1282: '⛈️', // Moderate or heavy snow with thunder
  };

  return iconMap[conditionCode] || '🌤️';
};

// Get UV index level
export const getUVLevel = (uv: number): { level: string; color: string } => {
  if (uv <= 2) return { level: 'Low', color: '#10b981' };
  if (uv <= 5) return { level: 'Moderate', color: '#f59e0b' };
  if (uv <= 7) return { level: 'High', color: '#f97316' };
  if (uv <= 10) return { level: 'Very High', color: '#ef4444' };
  return { level: 'Extreme', color: '#7c3aed' };
};

// Get air quality level
export const getAirQualityLevel = (aqi: number): { level: string; color: string } => {
  if (aqi <= 50) return { level: 'Good', color: '#10b981' };
  if (aqi <= 100) return { level: 'Moderate', color: '#f59e0b' };
  if (aqi <= 150) return { level: 'Unhealthy for Sensitive Groups', color: '#f97316' };
  if (aqi <= 200) return { level: 'Unhealthy', color: '#ef4444' };
  if (aqi <= 300) return { level: 'Very Unhealthy', color: '#7c3aed' };
  return { level: 'Hazardous', color: '#dc2626' };
};

// Get wind direction arrow
export const getWindDirection = (degree: number): string => {
  const directions = ['↑', '↗️', '→', '↘️', '↓', '↙️', '←', '↖️'];
  const index = Math.round(degree / 45) % 8;
  return directions[index];
};

// Get clothing suggestions based on temperature
export const getClothingSuggestion = (tempC: number): string => {
  if (tempC < 0) return 'Heavy winter coat, gloves, scarf, and hat';
  if (tempC < 10) return 'Winter coat or heavy jacket';
  if (tempC < 20) return 'Light jacket or sweater';
  if (tempC < 25) return 'T-shirt and light clothing';
  return 'Light summer clothing';
};

// Get activity recommendations
export const getActivityRecommendation = (tempC: number, condition: string): string => {
  const isRainy = condition.toLowerCase().includes('rain');
  const isSnowy = condition.toLowerCase().includes('snow');
  const isStormy = condition.toLowerCase().includes('thunder') || condition.toLowerCase().includes('storm');

  if (isStormy) return 'Stay indoors - avoid outdoor activities';
  if (isRainy) return 'Indoor activities recommended';
  if (isSnowy) return 'Great for winter sports if conditions allow';
  if (tempC < 0) return 'Indoor activities or winter sports';
  if (tempC < 10) return 'Light outdoor activities with proper clothing';
  if (tempC < 25) return 'Perfect for outdoor activities';
  if (tempC < 30) return 'Good for outdoor activities, stay hydrated';
  return 'Limit outdoor activities, stay in shade';
};

// Calculate feels like temperature (simplified)
export const calculateFeelsLike = (tempC: number, humidity: number, windKph: number): number => {
  // Simplified wind chill and heat index calculation
  if (tempC < 10) {
    // Wind chill effect
    return tempC - (windKph * 0.1);
  } else if (tempC > 27) {
    // Heat index effect
    return tempC + (humidity * 0.01);
  }
  return tempC;
}; 
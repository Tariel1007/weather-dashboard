import axios from 'axios';
import { WeatherData, Location } from '../types/weather';

// Using WeatherAPI.com as the primary weather service
// You'll need to sign up for a free API key at https://www.weatherapi.com/
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || 'your_api_key_here';
const BASE_URL = 'https://api.weatherapi.com/v1';

class WeatherService {
  private apiKey: string;

  constructor(apiKey: string = API_KEY) {
    this.apiKey = apiKey;
  }

  async getCurrentWeather(location: string): Promise<WeatherData> {
    try {
      const response = await axios.get(`${BASE_URL}/forecast.json`, {
        params: {
          key: this.apiKey,
          q: location,
          days: 7,
          aqi: 'yes',
          alerts: 'yes'
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw new Error('Failed to fetch weather data');
    }
  }

  async getWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
    try {
      const response = await axios.get(`${BASE_URL}/forecast.json`, {
        params: {
          key: this.apiKey,
          q: `${lat},${lon}`,
          days: 7,
          aqi: 'yes',
          alerts: 'yes'
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching weather data by coordinates:', error);
      throw new Error('Failed to fetch weather data');
    }
  }

  async searchLocations(query: string): Promise<Location[]> {
    try {
      const response = await axios.get(`${BASE_URL}/search.json`, {
        params: {
          key: this.apiKey,
          q: query
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error searching locations:', error);
      throw new Error('Failed to search locations');
    }
  }

  // Mock data for development/testing when API key is not available
  getMockWeatherData(): WeatherData {
    return {
      location: {
        name: "New York",
        region: "New York",
        country: "United States of America",
        lat: 40.71,
        lon: -74.01,
        timezone: "America/New_York",
        localtime: "2024-01-15 14:30"
      },
      current: {
        temp_c: 22,
        temp_f: 71.6,
        feelslike_c: 24,
        feelslike_f: 75.2,
        condition: {
          text: "Partly cloudy",
          icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
          code: 1003
        },
        humidity: 65,
        wind_kph: 15,
        wind_mph: 9.3,
        wind_degree: 180,
        wind_dir: "S",
        pressure_mb: 1013,
        pressure_in: 29.91,
        precip_mm: 0,
        precip_in: 0,
        uv: 5,
        vis_km: 10,
        vis_miles: 6,
        cloud: 50,
        is_day: 1,
        last_updated: "2024-01-15 14:30"
      },
      forecast: {
        forecastday: [
          {
            date: "2024-01-15",
            date_epoch: 1705257600,
            day: {
              maxtemp_c: 25,
              maxtemp_f: 77,
              mintemp_c: 18,
              mintemp_f: 64.4,
              avgtemp_c: 21.5,
              avgtemp_f: 70.7,
              maxwind_kph: 20,
              maxwind_mph: 12.4,
              totalprecip_mm: 0,
              totalprecip_in: 0,
              avgvis_km: 10,
              avgvis_miles: 6,
              avghumidity: 60,
              daily_will_it_rain: 0,
              daily_chance_of_rain: 0,
              daily_will_it_snow: 0,
              daily_chance_of_snow: 0,
              condition: {
                text: "Partly cloudy",
                icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
                code: 1003
              },
              uv: 5
            },
            astro: {
              sunrise: "07:15 AM",
              sunset: "04:45 PM",
              moonrise: "10:30 AM",
              moonset: "11:45 PM",
              moon_phase: "Waxing Crescent",
              moon_illumination: "25"
            },
            hour: Array.from({ length: 24 }, (_, i) => ({
              time_epoch: 1705257600 + i * 3600,
              time: `2024-01-15 ${String(i).padStart(2, '0')}:00`,
              temp_c: 20 + Math.sin(i / 24 * Math.PI) * 5,
              temp_f: (20 + Math.sin(i / 24 * Math.PI) * 5) * 9/5 + 32,
              is_day: i >= 6 && i <= 18 ? 1 : 0,
              condition: {
                text: "Partly cloudy",
                icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
                code: 1003
              },
              wind_kph: 15,
              wind_mph: 9.3,
              wind_degree: 180,
              wind_dir: "S",
              pressure_mb: 1013,
              pressure_in: 29.91,
              precip_mm: 0,
              precip_in: 0,
              humidity: 65,
              cloud: 50,
              feelslike_c: 22,
              feelslike_f: 71.6,
              vis_km: 10,
              vis_miles: 6,
              uv: 5,
              gust_kph: 25,
              gust_mph: 15.5,
              chance_of_rain: 0,
              chance_of_snow: 0
            }))
          }
        ]
      },
      alerts: []
    };
  }
}

export default new WeatherService(); 
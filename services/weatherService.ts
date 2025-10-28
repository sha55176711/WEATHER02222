
import type { WeatherData } from '../types';

const API_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export const getWeatherData = async (latitude: string, longitude: string): Promise<WeatherData> => {
  const params = new URLSearchParams({
    latitude,
    longitude,
    current: 'temperature_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum',
    timezone: 'auto',
  });

  const url = `${API_BASE_URL}?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.reason || 'Failed to fetch weather data.');
  }

  const data = await response.json();
  return data as WeatherData;
};

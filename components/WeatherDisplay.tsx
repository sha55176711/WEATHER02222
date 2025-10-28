
import React from 'react';
import type { WeatherData } from '../types';
import { WEATHER_CODES } from '../constants';
import WeatherCard from './WeatherCard';
import WeatherIcon from './WeatherIcon';

interface WeatherDisplayProps {
  data: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data }) => {
  const { current, daily, timezone, current_units, daily_units } = data;
  const weatherInfo = WEATHER_CODES[current.weather_code] || { description: 'Unknown', icon: 'fa-question-circle' };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Current Weather Section */}
      <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Current Weather</h2>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <WeatherIcon code={current.weather_code} isDay={current.is_day === 1} large={true} />
            <div>
              <p className="text-5xl font-bold">{Math.round(current.temperature_2m)}{current_units.temperature_2m}</p>
              <p className="text-gray-300 capitalize">{weatherInfo.description}</p>
            </div>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-gray-300">Feels like: {Math.round(current.apparent_temperature)}{current_units.temperature_2m}</p>
            <p className="text-gray-300">Wind: {current.wind_speed_10m} {current_units.wind_speed_10m}</p>
            <p className="text-gray-300">Precipitation: {current.precipitation} {daily_units.precipitation_sum}</p>
             <p className="text-gray-400 text-sm mt-2">{timezone}</p>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast Section */}
      <div>
        <h2 className="text-2xl font-semibold text-cyan-400 mb-4 text-center">7-Day Forecast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {daily.time.map((time, index) => (
            <WeatherCard
              key={time}
              date={time}
              maxTemp={daily.temperature_2m_max[index]}
              minTemp={daily.temperature_2m_min[index]}
              weatherCode={daily.weather_code[index]}
              tempUnit={daily_units.temperature_2m_max}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;

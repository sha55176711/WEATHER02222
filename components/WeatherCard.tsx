
import React from 'react';
import WeatherIcon from './WeatherIcon';

interface WeatherCardProps {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
  tempUnit: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ date, maxTemp, minTemp, weatherCode, tempUnit }) => {
  const day = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
  
  return (
    <div className="bg-gray-800 p-4 rounded-lg text-center flex flex-col items-center justify-between h-full transform hover:scale-105 transition-transform duration-300">
      <p className="font-bold text-lg text-cyan-400">{day}</p>
      <div className="my-3">
        <WeatherIcon code={weatherCode} isDay={true} />
      </div>
      <div>
        <p className="font-semibold">{Math.round(maxTemp)}{tempUnit}</p>
        <p className="text-gray-400">{Math.round(minTemp)}{tempUnit}</p>
      </div>
    </div>
  );
};

export default WeatherCard;

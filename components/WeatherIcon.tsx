
import React from 'react';
import { WEATHER_CODES } from '../constants';

interface WeatherIconProps {
  code: number;
  isDay: boolean;
  large?: boolean;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ code, isDay, large = false }) => {
  let weatherInfo = WEATHER_CODES[code] || { icon: 'fa-question-circle' };
  let iconClass = weatherInfo.icon;

  if (isDay === false && (code === 0 || code === 1)) {
    iconClass = 'fa-moon';
  } else if (isDay === false && code === 2) {
    iconClass = 'fa-cloud-moon';
  }

  const sizeClass = large ? 'text-6xl' : 'text-4xl';

  return <i className={`fas ${iconClass} ${sizeClass} text-yellow-300`}></i>;
};

export default WeatherIcon;

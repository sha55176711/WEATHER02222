
import React, { useState } from 'react';
import type { Coordinates } from '../types';

interface CoordinateInputProps {
  onSubmit: (coordinates: Coordinates) => void;
  loading: boolean;
}

const CoordinateInput: React.FC<CoordinateInputProps> = ({ onSubmit, loading }) => {
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateCoordinates()) {
      onSubmit({ latitude, longitude });
    }
  };

  const validateCoordinates = (): boolean => {
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    if (isNaN(lat) || lat < -90 || lat > 90) {
      setError('Latitude must be a number between -90 and 90.');
      return false;
    }
    if (isNaN(lon) || lon < -180 || lon > 180) {
      setError('Longitude must be a number between -180 and 180.');
      return false;
    }
    setError(null);
    return true;
  };
  
  const handleUseMyLocation = () => {
    setError(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lon } = position.coords;
          setLatitude(lat.toFixed(4));
          setLongitude(lon.toFixed(4));
          onSubmit({ latitude: lat.toString(), longitude: lon.toString() });
        },
        () => {
          setError('Could not retrieve your location. Please enable location services.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="Latitude (e.g., 52.52)"
          className="flex-grow p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          disabled={loading}
        />
        <input
          type="text"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="Longitude (e.g., 13.41)"
          className="flex-grow p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 disabled:bg-gray-500"
          disabled={loading}
        >
          {loading ? 'Fetching...' : 'Get Weather'}
        </button>
      </form>
       <div className="flex justify-center mt-4">
         <button
          onClick={handleUseMyLocation}
          className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition duration-300 flex items-center gap-2"
          disabled={loading}
        >
          <i className="fas fa-map-marker-alt"></i>
          Use My Location
        </button>
       </div>
      {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
    </div>
  );
};

export default CoordinateInput;

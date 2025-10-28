
import React, { useState, useCallback, useEffect } from 'react';
import type { Coordinates, WeatherData } from './types';
import { getWeatherData } from './services/weatherService';
import CoordinateInput from './components/CoordinateInput';
import WeatherDisplay from './components/WeatherDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorAlert from './components/ErrorAlert';

const App: React.FC = () => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  const fetchWeather = useCallback(async (coords: Coordinates) => {
    if (!coords.latitude || !coords.longitude) return;
    setLoading(true);
    setError(null);
    setWeatherData(null);
    try {
      const data = await getWeatherData(coords.latitude, coords.longitude);
      setWeatherData(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  }, []);
  
  const handleCoordinatesSubmit = (coords: Coordinates) => {
    setCoordinates(coords);
    fetchWeather(coords);
  };
  
  useEffect(() => {
    // On initial load, try to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          handleCoordinatesSubmit({ latitude: latitude.toString(), longitude: longitude.toString() });
        },
        () => {
          // If user denies location, we just wait for manual input.
          setInitialLoad(false);
        }
      );
    } else {
      setInitialLoad(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400">Weather Forecast</h1>
          <p className="text-gray-400 mt-2">Enter coordinates or use your location to get the latest weather updates.</p>
        </header>

        <main>
          <CoordinateInput onSubmit={handleCoordinatesSubmit} loading={loading} />

          <div className="mt-8">
            {initialLoad && (
                 <div className="text-center p-8 bg-gray-800 rounded-lg">
                    <p className="text-gray-300">Getting your location...</p>
                 </div>
            )}
            {loading && <LoadingSpinner />}
            {error && <ErrorAlert message={error} />}
            {weatherData && <WeatherDisplay data={weatherData} />}
            {!initialLoad && !loading && !error && !weatherData && (
                <div className="text-center p-8 bg-gray-800 rounded-lg">
                    <p className="text-gray-300">Enter coordinates to see the weather forecast.</p>
                </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;

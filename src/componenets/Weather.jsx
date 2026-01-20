import React, { useEffect, useState } from "react";
import { FaCloud, FaCloudRain, FaSun, FaWind, FaTint } from "react-icons/fa";

const Weather = ({ destination }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // First, get coordinates for the destination using geocoding
        const geoResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${destination}&count=1&language=en&format=json`
        );
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
          setError("Location not found");
          setLoading(false);
          return;
        }

        const { latitude, longitude, country } = geoData.results[0];

        // Get weather data
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&temperature_unit=celsius&timezone=auto`
        );
        const weatherData = await weatherResponse.json();
        const current = weatherData.current;

        setWeather({
          temp: Math.round(current.temperature_2m),
          humidity: current.relative_humidity_2m,
          windSpeed: Math.round(current.wind_speed_10m),
          weatherCode: current.weather_code,
          country,
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch weather");
        setLoading(false);
      }
    };

    if (destination) {
      fetchWeather();
    }
  }, [destination]);

  const getWeatherIcon = (code) => {
    if (!code) return <FaSun className="text-yellow-400" />;
    
    // WMO Weather interpretation codes
    if (code === 0) return <FaSun className="text-yellow-400" />; // Clear
    if (code === 1 || code === 2) return <FaCloud className="text-gray-400" />; // Partly cloudy
    if (code === 3) return <FaCloud className="text-gray-500" />; // Overcast
    if (code >= 45 && code <= 48) return <FaCloud className="text-gray-400" />; // Foggy
    if (code >= 51 && code <= 67) return <FaCloudRain className="text-blue-400" />; // Drizzle
    if (code >= 71 && code <= 77) return <FaCloudRain className="text-blue-500" />; // Snow
    if (code >= 80 && code <= 82) return <FaCloudRain className="text-blue-600" />; // Rain
    if (code >= 85 && code <= 86) return <FaCloudRain className="text-blue-700" />; // Snow showers
    if (code >= 80 && code <= 89) return <FaCloudRain className="text-blue-600" />; // Showers
    if (code >= 90 && code <= 99) return <FaCloudRain className="text-blue-800" />; // Thunderstorm
    return <FaCloud className="text-gray-400" />;
  };

  const getWeatherDescription = (code) => {
    if (!code) return "Clear";
    if (code === 0) return "Clear";
    if (code === 1 || code === 2) return "Partly Cloudy";
    if (code === 3) return "Overcast";
    if (code >= 45 && code <= 48) return "Foggy";
    if (code >= 51 && code <= 67) return "Drizzle";
    if (code >= 71 && code <= 77) return "Snow";
    if (code >= 80 && code <= 82) return "Rain";
    if (code >= 85 && code <= 86) return "Snow Showers";
    if (code >= 90 && code <= 99) return "Thunderstorm";
    return "Unknown";
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-md border border-blue-200">
        <p className="text-slate-600 animate-pulse">Loading weather...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg shadow-md border border-red-200">
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-lg shadow-md border border-blue-300 hover:shadow-lg transition">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Live Weather</h3>
      
      <div className="space-y-4">
        {/* Weather Icon and Temp */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-5xl">
              {getWeatherIcon(weather.weatherCode)}
            </div>
            <div>
              <p className="text-4xl font-bold text-slate-800">{weather.temp}°C</p>
              <p className="text-sm text-slate-600">{getWeatherDescription(weather.weatherCode)}</p>
            </div>
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-300">
          {/* Humidity */}
          <div className="flex items-center gap-2">
            <FaTint size={16} className="text-blue-600" />
            <div>
              <p className="text-xs text-slate-600">Humidity</p>
              <p className="font-semibold text-slate-800">{weather.humidity}%</p>
            </div>
          </div>

          {/* Wind Speed */}
          <div className="flex items-center gap-2">
            <FaWind size={16} className="text-blue-600" />
            <div>
              <p className="text-xs text-slate-600">Wind Speed</p>
              <p className="font-semibold text-slate-800">{weather.windSpeed} km/h</p>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="text-center pt-2 border-t border-blue-300">
          <p className="text-xs text-slate-600">{destination}, {weather.country}</p>
        </div>
      </div>
    </div>
  );
};

export default Weather;

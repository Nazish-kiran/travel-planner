import React, { useEffect, useState } from "react";
import { FaClock, FaGlobeAmericas } from "react-icons/fa";

const TimezoneWidget = ({ destination }) => {
  const [times, setTimes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimezone = async () => {
      try {
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${destination}&count=1&language=en&format=json`
        );
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
          setLoading(false);
          return;
        }

        const { latitude, longitude, timezone } = data.results[0];

        // Get timezone info
        const tzResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&current=temperature_2m`
        );
        const tzData = await tzResponse.json();

        const destTimezone = tzData.timezone;
        const now = new Date();
        
        // Get current time in destination
        const destTime = new Date(now.toLocaleString('en-US', { timeZone: destTimezone }));
        const localTime = now;

        const timeDiff = (destTime - localTime) / (1000 * 60 * 60);

        setTimes({
          destination: destTimezone,
          destTime: destTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          localTime: localTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          timeDiff: timeDiff,
        });
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    if (destination) {
      fetchTimezone();
    }
  }, [destination]);

  if (loading) {
    return (
      <div className="bg-blue-50 p-4 rounded-lg shadow-md border border-blue-200">
        <p className="text-slate-600 text-sm animate-pulse">Loading timezone...</p>
      </div>
    );
  }

  if (!times) {
    return null;
  }

  const sign = times.timeDiff >= 0 ? '+' : '';

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-md border border-blue-200">
      <div className="flex items-center gap-2 mb-3">
        <FaClock className="text-blue-600" size={18} />
        <h4 className="font-bold text-slate-800 text-sm">Timezone</h4>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-slate-600">Your Time</span>
          <span className="font-semibold text-slate-800">{times.localTime}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-600">Destination</span>
          <span className="font-semibold text-blue-700">{times.destTime}</span>
        </div>
        <div className="pt-2 border-t border-blue-200">
          <p className="text-center font-bold text-blue-600">
            {sign}{Math.abs(times.timeDiff).toFixed(1)}h difference
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimezoneWidget;

import React, { useEffect, useState } from "react";
import { FaMosque } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";

const PrayerTimesWidget = ({ destination }) => {
  const [prayer, setPrayer] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        // Get coordinates from destination
        const geoResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${destination}&count=1&language=en&format=json`
        );
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
          setLoading(false);
          return;
        }

        const { latitude, longitude } = geoData.results[0];
        const today = new Date().toISOString().split('T')[0];

        // Fetch prayer times from Al Adhan API
        const prayerResponse = await fetch(
          `https://api.aladhan.com/v1/calendar/${today.split('-')[0]}/${today.split('-')[1]}?latitude=${latitude}&longitude=${longitude}&method=2`
        );
        const prayerData = await prayerResponse.json();

        if (prayerData.data && prayerData.data.length > 0) {
          const timings = prayerData.data[0].timings;
          setPrayer({
            Fajr: timings.Fajr,
            Dhuhr: timings.Dhuhr,
            Asr: timings.Asr,
            Maghrib: timings.Maghrib,
            Isha: timings.Isha,
          });
        }
        setLoading(false);
      } catch (err) {
        console.log("Prayer times not available for this location");
        setLoading(false);
      }
    };

    if (destination) {
      fetchPrayerTimes();
    }
  }, [destination]);

  // Calculate countdown to next prayer
  useEffect(() => {
    if (!prayer) return;

    const calculateCountdown = () => {
      const now = new Date();
      const prayerList = [
        { name: "Fajr", time: prayer.Fajr },
        { name: "Dhuhr", time: prayer.Dhuhr },
        { name: "Asr", time: prayer.Asr },
        { name: "Maghrib", time: prayer.Maghrib },
        { name: "Isha", time: prayer.Isha },
      ];

      let nextPrayer = prayerList[0];

      for (let p of prayerList) {
        // Extract only HH:MM from the time string (removes timezone info if present)
        const timeStr = p.time.split(' ')[0]; // Get "04:30" from "04:30 (GMT+02:00)"
        const [hours, minutes] = timeStr.split(":").map(Number);
        
        if (isNaN(hours) || isNaN(minutes)) {
          console.log('Invalid time format:', p.time);
          continue;
        }
        
        const prayerTime = new Date();
        prayerTime.setHours(hours, minutes, 0, 0);

        if (prayerTime > now) {
          nextPrayer = p;
          break;
        }
      }

      const nextTime = new Date();
      const nextTimeStr = nextPrayer.time.split(' ')[0];
      const [hours, minutes] = nextTimeStr.split(":").map(Number);
      
      if (isNaN(hours) || isNaN(minutes)) {
        console.log('Invalid next prayer time:', nextPrayer.time);
        return;
      }
      
      nextTime.setHours(hours, minutes, 0, 0);

      const diff = nextTime - now;
      const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
      const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setCountdown({
        name: nextPrayer.name,
        hours: Math.max(0, hoursLeft),
        minutes: Math.max(0, minutesLeft),
      });
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [prayer]);

  if (loading) {
    return (
      <div className="bg-green-50 p-4 rounded-lg shadow-md border border-green-200">
        <p className="text-slate-600 text-sm animate-pulse">Loading prayer times...</p>
      </div>
    );
  }

  if (!prayer) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg shadow-md border border-green-200">
      <div className="flex items-center gap-2 mb-3">
        <FaMosque className="text-green-700" size={18} />
        <h4 className="font-bold text-slate-800 text-sm">Prayer Times</h4>
      </div>

      {countdown && (
        <div className="bg-white border-2 border-green-500 rounded-lg p-3 mb-3">
          <div className="flex items-center gap-2 mb-2">
            <MdAccessTime className="text-green-600" size={16} />
            <span className="text-xs text-slate-600">Next Prayer</span>
          </div>
          <p className="font-bold text-green-700 text-lg">{countdown.name}</p>
          <p className="text-slate-700 font-semibold">
            {countdown.hours}h {countdown.minutes}m
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 text-xs">
        {Object.entries(prayer).map(([name, time]) => (
          <div key={name} className="bg-white rounded p-2 text-center border border-green-200">
            <p className="text-slate-600 font-semibold text-xs">{name}</p>
            <p className="text-slate-800 font-bold">{time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrayerTimesWidget;

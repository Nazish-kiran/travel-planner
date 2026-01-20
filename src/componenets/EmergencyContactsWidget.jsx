import React, { useEffect, useState } from "react";
import { FaPhone, FaHospital, FaExclamationTriangle} from "react-icons/fa";

const cityToCountry = {
  "paris": "france",
  "london": "united kingdom",
  "tokyo": "japan",
  "new york": "united states",
  "dubai": "united arab emirates",
  "sydney": "australia",
  "bangkok": "thailand",
  "barcelona": "spain",
  "rome": "italy",
  "amsterdam": "netherlands",
  "berlin": "germany",
  "moscow": "russia",
  "istanbul": "turkey",
  "delhi": "india",
  "singapore": "singapore",
  "hong kong": "hong kong",
  "cairo": "egypt",
  "mexico city": "mexico",
  "toronto": "canada",
  "vancouver": "canada",
  "los angeles": "united states",
  "san francisco": "united states",
  "chicago": "united states",
  "miami": "united states",
  "vegas": "united states",
  "las vegas": "united states",
};

const EmergencyContactsWidget = ({ destination }) => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        let searchDestination = destination.toLowerCase().trim();
        
        // Check if destination is a city and convert to country
        if (cityToCountry[searchDestination]) {
          searchDestination = cityToCountry[searchDestination];
        }

        const response = await fetch(
          `https://restcountries.com/v3.1/name/${searchDestination}`
        );
        const data = await response.json();

        if (!data || data.length === 0) {
          console.log(`No emergency info found for: ${searchDestination}`);
          setLoading(false);
          return;
        }

        const country = data[0];

        // Common emergency numbers by region
        const emergencyMap = {
          'Europe': '112',
          'Americas': '911',
          'Asia': '999 or 112',
          'Africa': '112 or 999',
          'Oceania': '000 or 112',
        };

        const region = country.region || '';
        const emergencyNumber = emergencyMap[region] || '112 or 911';
        const countryCode = country.idd?.root ? country.idd.root + (country.idd?.suffixes?.[0] || '') : 'N/A';

        setInfo({
          country: country.name.common,
          region,
          emergency: emergencyNumber,
          phone: countryCode,
        });
        setLoading(false);
      } catch (err) {
        console.error('Emergency contacts fetch error:', err.message);
        setLoading(false);
      }
    };

    if (destination) {
      setLoading(true);
      fetchInfo();
    }
  }, [destination]);

  if (loading) {
    return (
      <div className="bg-red-50 p-4 rounded-lg shadow-md border border-red-200">
        <p className="text-slate-600 text-sm animate-pulse">Loading contacts...</p>
      </div>
    );
  }

  if (!info) {
    return (
      <div className="bg-red-50 p-4 rounded-lg shadow-md border border-red-200">
        <div className="flex items-center gap-2 mb-3">
          <FaExclamationTriangle className="text-red-600" size={18} />
          <h4 className="font-bold text-slate-800 text-sm">Emergency Contacts</h4>
        </div>
        <p className="text-slate-600 text-xs">Unable to fetch emergency info for {destination}</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg shadow-md border border-red-200">
      <div className="flex items-center gap-2 mb-3">
        <FaExclamationTriangle className="text-red-600" size={18} />
        <h4 className="font-bold text-slate-800 text-sm">Emergency Contacts</h4>
      </div>
      
      <div className="space-y-3 text-sm">
        <div className="bg-white rounded p-3 border-l-4 border-red-600">
          <div className="flex items-center gap-2 mb-1">
            <FaPhone className="text-red-600" size={14} />
            <span className="text-slate-600 text-xs">Emergency</span>
          </div>
          <p className="font-bold text-red-700 text-lg">{info.emergency}</p>
        </div>

        <div className="bg-white rounded p-3 border-l-4 border-orange-600">
          <div className="flex items-center gap-2 mb-1">
            <FaPhone className="text-orange-600" size={14} />
            <span className="text-slate-600 text-xs">Country Code</span>
          </div>
          <p className="font-semibold text-slate-800">+{info.phone}</p>
        </div>

        <div className="text-xs text-slate-600 bg-white rounded p-2">
          <p className="font-semibold text-slate-700 mb-1">Tips:</p>
          <ul className="space-y-1">
            <li>• Keep important numbers written down</li>
            <li>• Register with your embassy</li>
            <li>• Have travel insurance info ready</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactsWidget;

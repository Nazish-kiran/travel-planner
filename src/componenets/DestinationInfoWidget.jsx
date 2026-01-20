import React, { useEffect, useState } from "react";
import { FaInfoCircle, FaLanguage, FaUsers, FaClock } from "react-icons/fa";

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

const DestinationInfoWidget = ({ destination }) => {
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
          console.log(`No info found for: ${searchDestination}`);
          setLoading(false);
          return;
        }

        const country = data[0];
        const languages = Object.values(country.languages || {}).join(', ');
        const population = country.population?.toLocaleString() || 'N/A';
        const region = country.region || 'N/A';
        const capital = country.capital?.[0] || 'N/A';

        setInfo({
          name: country.name.common,
          region,
          capital,
          languages,
          population,
          area: country.area?.toLocaleString() + ' km²' || 'N/A',
        });
        setLoading(false);
      } catch (err) {
        console.error('Info fetch error:', err.message);
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
      <div className="bg-purple-50 p-4 rounded-lg shadow-md border border-purple-200">
        <p className="text-slate-600 text-sm animate-pulse">Loading info...</p>
      </div>
    );
  }

  if (!info) {
    return (
      <div className="bg-purple-50 p-4 rounded-lg shadow-md border border-purple-200">
        <div className="flex items-center gap-2 mb-3">
          <FaInfoCircle className="text-purple-600" size={18} />
          <h4 className="font-bold text-slate-800 text-sm">Destination Info</h4>
        </div>
        <p className="text-slate-600 text-xs">Unable to fetch info for {destination}</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg shadow-md border border-purple-200">
      <div className="flex items-center gap-2 mb-3">
        <FaInfoCircle className="text-purple-600" size={18} />
        <h4 className="font-bold text-slate-800 text-sm">Destination Info</h4>
      </div>
      
      <div className="space-y-2 text-xs">
        <div>
          <p className="text-slate-600">Region</p>
          <p className="font-semibold text-slate-800">{info.region}</p>
        </div>
        <div>
          <p className="text-slate-600">Capital</p>
          <p className="font-semibold text-slate-800">{info.capital}</p>
        </div>
        <div>
          <div className="flex items-center gap-1 text-slate-600">
            <FaLanguage size={12} />
            Languages
          </div>
          <p className="font-semibold text-slate-800">{info.languages}</p>
        </div>
        <div>
          <div className="flex items-center gap-1 text-slate-600">
            <FaUsers size={12} />
            Population
          </div>
          <p className="font-semibold text-slate-800">{info.population}</p>
        </div>
        <div className="pt-2 border-t border-purple-200">
          <p className="text-slate-600">Area</p>
          <p className="font-semibold text-purple-700">{info.area}</p>
        </div>
      </div>
    </div>
  );
};

export default DestinationInfoWidget;

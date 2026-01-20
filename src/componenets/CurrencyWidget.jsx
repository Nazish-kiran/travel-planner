import React, { useEffect, useState } from "react";
import { FaDollarSign } from "react-icons/fa";

// Simple city to country mapping for common destinations
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
  "bangkok": "thailand",
  "delhi": "india",
  "singapore": "singapore",
  "hong kong": "hong kong",
  "cairo": "egypt",
  "dubai": "united arab emirates",
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

const CurrencyWidget = ({ destination }) => {
  const [currency, setCurrency] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        let searchDestination = destination.toLowerCase().trim();
        
        // Check if destination is a city and convert to country
        if (cityToCountry[searchDestination]) {
          searchDestination = cityToCountry[searchDestination];
        }

        // Try to fetch country data
        const countryResponse = await fetch(
          `https://restcountries.com/v3.1/name/${searchDestination}`
        );
        const countryData = await countryResponse.json();

        if (!countryData || countryData.length === 0) {
          console.log(`No country found for: ${searchDestination}`);
          setLoading(false);
          return;
        }

        const country = countryData[0];
        const currencyCodes = Object.keys(country.currencies || {});
        
        if (currencyCodes.length === 0) {
          console.log('No currencies found for country');
          setLoading(false);
          return;
        }

        const currencyCode = currencyCodes[0];
        const currencyName = country.currencies[currencyCode]?.name || 'Unknown';
        const currencySymbol = country.currencies[currencyCode]?.symbol || currencyCode;

        // Get exchange rate using exchangerate.host
        let exchangeRate = 1;
        try {
          const rateResponse = await fetch(
            `https://api.exchangerate.host/convert?from=USD&to=${currencyCode}`
          );
          const rateData = await rateResponse.json();
          
          if (rateData.success && rateData.result) {
            exchangeRate = rateData.result;
          }
        } catch (e) {
          console.log('Exchange rate fetch failed');
        }

        setCurrency({
          code: currencyCode,
          name: currencyName,
          symbol: currencySymbol,
          rate: parseFloat(exchangeRate).toFixed(2),
        });
        setLoading(false);
      } catch (err) {
        console.error('Currency fetch error:', err.message);
        setLoading(false);
      }
    };

    if (destination) {
      setLoading(true);
      fetchCurrency();
    }
  }, [destination]);

  if (loading) {
    return (
      <div className="bg-green-50 p-4 rounded-lg shadow-md border border-green-200">
        <p className="text-slate-600 text-sm animate-pulse">Loading currency...</p>
      </div>
    );
  }

  // Always show something - either currency data or a message
  if (!currency) {
    return (
      <div className="bg-green-50 p-4 rounded-lg shadow-md border border-green-200">
        <div className="flex items-center gap-2 mb-3">
          <FaDollarSign className="text-green-600" size={18} />
          <h4 className="font-bold text-slate-800 text-sm">Currency</h4>
        </div>
        <p className="text-slate-600 text-xs">Unable to fetch currency info for {destination}</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg shadow-md border border-green-200">
      <div className="flex items-center gap-2 mb-3">
        <FaDollarSign className="text-green-600" size={18} />
        <h4 className="font-bold text-slate-800 text-sm">Currency</h4>
      </div>
      
      <div className="space-y-2 text-sm">
        <div>
          <p className="text-slate-600 text-xs">Currency Code</p>
          <p className="font-bold text-slate-800">{currency.code}</p>
        </div>
        <div>
          <p className="text-slate-600 text-xs">Exchange Rate</p>
          <p className="font-semibold text-green-700">1 USD = {currency.rate} {currency.code}</p>
        </div>
        <div className="pt-2 border-t border-green-200">
          <p className="text-center text-slate-600 text-xs">{currency.symbol} {currency.name}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrencyWidget;

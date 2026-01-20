import React, { useEffect, useState } from "react";
import { FaDollarSign } from "react-icons/fa";

const CurrencyWidget = ({ destination }) => {
  const [currency, setCurrency] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${destination}`
        );
        const data = await response.json();

        if (!data || data.length === 0) {
          setLoading(false);
          return;
        }

        const country = data[0];
        const currencyCode = Object.keys(country.currencies || {})[0];
        const currencyName = country.currencies?.[currencyCode]?.name || 'Unknown';
        const currencySymbol = country.currencies?.[currencyCode]?.symbol || currencyCode;

        // Get exchange rate (using a simple API)
        let exchangeRate = 1;
        try {
          const rateResponse = await fetch(
            `https://api.exchangerate-api.com/v4/latest/USD`
          );
          const rateData = await rateResponse.json();
          exchangeRate = rateData.rates?.[currencyCode] || 1;
        } catch (e) {
          // If API fails, we'll just show the currency info
        }

        setCurrency({
          code: currencyCode,
          name: currencyName,
          symbol: currencySymbol,
          rate: exchangeRate.toFixed(2),
        });
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    if (destination) {
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

  if (!currency) {
    return null;
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

import React, { useEffect, useState } from "react";
import { FaPhone, FaHospital, FaExclamationTriangle} from "react-icons/fa";

const EmergencyContactsWidget = ({ destination }) => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
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

        setInfo({
          country: country.name.common,
          region,
          emergency: emergencyNumber,
          phone: country.idd?.root + (country.idd?.suffixes?.[0] || '') || 'N/A',
        });
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    if (destination) {
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
    return null;
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

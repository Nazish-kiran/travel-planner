// src/components/BudgetSummary.jsx
import React, { useContext } from "react";
import { TripContext } from "../context/TripContext";
import { FaWallet } from "react-icons/fa";

const BudgetSummary = () => {
  const { trip } = useContext(TripContext);

  if (!trip) return null;

  const dayTotals = trip.days.map(day =>
    day.activities.reduce((sum, a) => sum + (a.cost || 0), 0)
  );

  const tripActivitiesTotal = dayTotals.reduce((sum, daySum) => sum + daySum, 0);
  const accommodationCost = trip.accommodation?.cost || 0;
  const transportationCost = (trip.transportation || []).reduce((sum, t) => sum + (t.cost || 0), 0);
  const tripTotal = tripActivitiesTotal + accommodationCost + transportationCost;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600">
      <div className="flex items-center gap-2 mb-6">
        <FaWallet size={28} className="text-green-600" />
        <h2 className="text-2xl font-bold text-slate-800">Budget Summary</h2>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between bg-slate-50 p-4 rounded-lg border border-slate-200">
          <span className="font-semibold text-slate-700">Activities:</span>
          <span className="font-bold text-blue-600">${tripActivitiesTotal.toFixed(2)}</span>
        </div>
        
        {accommodationCost > 0 && (
          <div className="flex justify-between bg-slate-50 p-4 rounded-lg border border-slate-200">
            <span className="font-semibold text-slate-700">Accommodation:</span>
            <span className="font-bold text-indigo-600">${accommodationCost.toFixed(2)}</span>
          </div>
        )}
        
        {transportationCost > 0 && (
          <div className="flex justify-between bg-slate-50 p-4 rounded-lg border border-slate-200">
            <span className="font-semibold text-slate-700">Transportation:</span>
            <span className="font-bold text-orange-600">${transportationCost.toFixed(2)}</span>
          </div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t-2 border-slate-200">
        <h3 className="font-bold text-slate-800 mb-3">Daily Breakdown</h3>
        <div className="space-y-2">
          {trip.days.map((day, index) => (
            <div key={index} className="flex justify-between text-sm text-slate-600 py-1">
              <span>Day {day.day}:</span>
              <span className="font-semibold text-slate-800">${dayTotals[index].toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-lg mt-6 text-center shadow-lg">
        <p className="text-sm font-semibold mb-2">Total Trip Budget</p>
        <p className="text-4xl font-bold">${tripTotal.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default BudgetSummary;

import React, { useContext, useState } from "react";
import { TripContext } from "../context/TripContext";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

const BudgetAlert = () => {
  const { trip, setTrip } = useContext(TripContext);
  const [budgetLimit, setBudgetLimit] = useState(trip?.budgetLimit || "");
  const [showSetBudget, setShowSetBudget] = useState(!trip?.budgetLimit);

  if (!trip) return null;

  const totalActivitiesCost = (trip.days || []).reduce((sum, day) => {
    return sum + (day.activities || []).reduce((daySum, activity) => daySum + (activity.cost || 0), 0);
  }, 0);

  const accommodationCost = trip.accommodation?.cost || 0;
  const transportationCost = (trip.transportation || []).reduce((sum, t) => sum + (t.cost || 0), 0);
  const totalCost = totalActivitiesCost + accommodationCost + transportationCost;

  const handleSetBudget = () => {
    if (budgetLimit && !isNaN(budgetLimit)) {
      setTrip({
        ...trip,
        budgetLimit: parseFloat(budgetLimit),
      });
      setShowSetBudget(false);
    }
  };

  const handleRemoveBudget = () => {
    setTrip({
      ...trip,
      budgetLimit: null,
    });
    setBudgetLimit("");
    setShowSetBudget(true);
  };

  if (showSetBudget) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Set Budget Limit</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Budget Limit ($)
            </label>
            <input
              type="number"
              value={budgetLimit}
              onChange={(e) => setBudgetLimit(e.target.value)}
              placeholder="e.g., 5000"
              className="w-full border border-slate-300 p-3 rounded-lg focus:border-slate-700 focus:outline-none"
            />
          </div>
          <button
            onClick={handleSetBudget}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-semibold transition"
          >
            Set Budget
          </button>
        </div>
      </div>
    );
  }

  const remaining = trip.budgetLimit - totalCost;
  const percentage = (totalCost / trip.budgetLimit) * 100;
  const isOverBudget = remaining < 0;
  const isWarning = remaining < trip.budgetLimit * 0.1; // Warning at 90% spent

  return (
    <div className={`p-6 rounded-lg shadow-md border-l-4 ${isOverBudget ? "bg-red-50 border-red-500" : isWarning ? "bg-yellow-50 border-yellow-500" : "bg-green-50 border-green-500"}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          {isOverBudget ? (
            <>
              <FaExclamationTriangle className="text-red-600" size={24} />
              Budget Exceeded
            </>
          ) : isWarning ? (
            <>
              <FaExclamationTriangle className="text-yellow-600" size={24} />
              Budget Warning
            </>
          ) : (
            <>
              <FaCheckCircle className="text-green-600" size={24} />
              Within Budget
            </>
          )}
        </h3>
        <button
          onClick={handleRemoveBudget}
          className="text-sm text-slate-600 hover:text-slate-800 underline"
        >
          Change
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-slate-700">Budget Used</span>
            <span className="font-bold text-lg">${totalCost.toFixed(2)} / ${trip.budgetLimit.toFixed(2)}</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-4">
            <div
              className={`h-4 rounded-full transition-all duration-300 ${
                isOverBudget ? "bg-red-600" : isWarning ? "bg-yellow-500" : "bg-green-600"
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </div>

        <div className={`p-3 rounded-lg ${isOverBudget ? "bg-red-100" : isWarning ? "bg-yellow-100" : "bg-green-100"}`}>
          <p className={`font-bold text-lg ${isOverBudget ? "text-red-700" : isWarning ? "text-yellow-700" : "text-green-700"}`}>
            {isOverBudget ? (
              <>Over Budget by ${Math.abs(remaining).toFixed(2)}</>
            ) : (
              <>Remaining: ${remaining.toFixed(2)}</>
            )}
          </p>
          <p className={`text-sm ${isOverBudget ? "text-red-600" : isWarning ? "text-yellow-600" : "text-green-600"}`}>
            {percentage.toFixed(1)}% of budget used
          </p>
        </div>

        {isOverBudget && (
          <p className="text-sm text-red-700 font-semibold">
            ⚠️ You have exceeded your budget. Consider reducing expenses or increasing your budget limit.
          </p>
        )}
        {isWarning && !isOverBudget && (
          <p className="text-sm text-yellow-700 font-semibold">
            ⚠️ You are approaching your budget limit. Be careful with future expenses.
          </p>
        )}
      </div>
    </div>
  );
};

export default BudgetAlert;

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TripContext } from "../context/TripContext";
import Analytics from "../componenets/Analytics";
import { FaArrowLeft } from "react-icons/fa";

const AnalyticsPage = () => {
  const { trip } = useContext(TripContext);
  const navigate = useNavigate();

  if (!trip) {
    return null;
  }

  // Calculate additional insights
  const dayTotals = trip.days.map(day =>
    day.activities.reduce((sum, a) => sum + (a.cost || 0), 0)
  );

  const tripActivitiesTotal = dayTotals.reduce((sum, daySum) => sum + daySum, 0);
  const accommodationCost = trip.accommodation?.cost || 0;
  const transportationCost = (trip.transportation || []).reduce((sum, t) => sum + (t.cost || 0), 0);
  const tripTotal = tripActivitiesTotal + accommodationCost + transportationCost;

  const totalActivities = trip.days.reduce((sum, day) => sum + day.activities.length, 0);
  const totalDays = trip.days.length;

  // Find highest cost day
  const maxDayCost = Math.max(...dayTotals, 0);
  const maxDayIndex = dayTotals.indexOf(maxDayCost);
  const mostExpensiveDay = maxDayIndex + 1;

  // Find least cost day
  const minDayCost = Math.min(...dayTotals.filter(cost => cost > 0), 0);
  const minDayIndex = dayTotals.indexOf(minDayCost > 0 ? minDayCost : Infinity);
  const cheapestDay = minDayIndex >= 0 && minDayIndex !== -1 ? minDayIndex + 1 : null;

  // Most expensive category
  const categoryBreakdown = {};
  trip.days.forEach(day => {
    day.activities.forEach(activity => {
      if (!categoryBreakdown[activity.category]) {
        categoryBreakdown[activity.category] = { count: 0, cost: 0 };
      }
      categoryBreakdown[activity.category].count += 1;
      categoryBreakdown[activity.category].cost += activity.cost || 0;
    });
  });

  const mostExpensiveCategory = Object.entries(categoryBreakdown).reduce(
    (max, [category, data]) => data.cost > max.cost ? { category, ...data } : max,
    { category: "N/A", count: 0, cost: 0 }
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-700 to-slate-900 text-white p-6 shadow-lg sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate("/planner")}
            className="flex items-center gap-2 bg-white text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-100 transition font-semibold"
          >
            <FaArrowLeft size={18} />
            Back to Planner
          </button>
          <div>
            <h1 className="text-3xl font-bold">{trip.destination} - Analytics</h1>
            <p className="text-slate-300">Detailed insights and statistics</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <Analytics />

        {/* Advanced Insights */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Advanced Insights</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Most Expensive Day */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
              <p className="text-sm font-semibold text-slate-700 mb-2">Most Expensive Day</p>
              <p className="text-3xl font-bold text-red-600">Day {mostExpensiveDay}</p>
              <p className="text-sm text-slate-600 mt-1">${maxDayCost.toFixed(2)}</p>
            </div>

            {/* Cheapest Day */}
            {cheapestDay && (
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                <p className="text-sm font-semibold text-slate-700 mb-2">Cheapest Day</p>
                <p className="text-3xl font-bold text-green-600">Day {cheapestDay}</p>
                <p className="text-sm text-slate-600 mt-1">${minDayCost.toFixed(2)}</p>
              </div>
            )}

            {/* Most Activities Day */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-slate-700 mb-2">Avg Activities/Day</p>
              <p className="text-3xl font-bold text-blue-600">
                {totalActivities > 0 ? (totalActivities / totalDays).toFixed(1) : 0}
              </p>
              <p className="text-sm text-slate-600 mt-1">per day</p>
            </div>

            {/* Most Expensive Category */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
              <p className="text-sm font-semibold text-slate-700 mb-2">Top Category</p>
              <p className="text-xl font-bold text-purple-600 truncate">{mostExpensiveCategory.category}</p>
              <p className="text-sm text-slate-600 mt-1">${mostExpensiveCategory.cost.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Daily Cost Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Daily Cost Distribution</h2>

          <div className="space-y-3">
            {trip.days.map((day, index) => {
              const cost = dayTotals[index];
              const percentage = tripTotal > 0 ? (cost / tripTotal * 100).toFixed(1) : 0;
              
              return (
                <div key={day.day} className="flex items-center gap-4">
                  <div className="w-16">
                    <p className="font-bold text-slate-800">Day {day.day}</p>
                  </div>
                  <div className="flex-1 bg-slate-200 rounded-full h-8 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-full flex items-center justify-end pr-2 transition-all"
                      style={{ width: `${percentage}%` }}
                    >
                      {percentage > 5 && (
                        <span className="text-white text-sm font-bold">{percentage}%</span>
                      )}
                    </div>
                  </div>
                  <div className="w-24 text-right">
                    <p className="font-bold text-slate-800">${cost.toFixed(2)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Trip Summary</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-slate-300 mb-2">Trip Duration</p>
              <p className="text-4xl font-bold">{totalDays}</p>
              <p className="text-slate-400 mt-1">days</p>
            </div>

            <div>
              <p className="text-slate-300 mb-2">Total Planned Activities</p>
              <p className="text-4xl font-bold">{totalActivities}</p>
              <p className="text-slate-400 mt-1">activities</p>
            </div>

            <div>
              <p className="text-slate-300 mb-2">Overall Budget</p>
              <p className="text-4xl font-bold">${tripTotal.toFixed(2)}</p>
              <p className="text-slate-400 mt-1">total</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;

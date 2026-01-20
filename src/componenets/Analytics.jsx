import React, { useContext } from "react";
import { TripContext } from "../context/TripContext";
import { FaChartBar, FaBoxes, FaDollarSign, FaCalendarAlt } from "react-icons/fa";

const Analytics = () => {
  const { trip } = useContext(TripContext);

  if (!trip) return null;

  // Calculate analytics
  const dayTotals = trip.days.map(day =>
    day.activities.reduce((sum, a) => sum + (a.cost || 0), 0)
  );

  const tripActivitiesTotal = dayTotals.reduce((sum, daySum) => sum + daySum, 0);
  const accommodationCost = trip.accommodation?.cost || 0;
  const transportationCost = (trip.transportation || []).reduce((sum, t) => sum + (t.cost || 0), 0);
  const tripTotal = tripActivitiesTotal + accommodationCost + transportationCost;

  const totalActivities = trip.days.reduce((sum, day) => sum + day.activities.length, 0);
  const totalDays = trip.days.length;
  const averageDailyCost = totalDays > 0 ? (tripTotal / totalDays).toFixed(2) : 0;

  // Category breakdown
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

  // Packing progress
  const packingList = trip.packingList || [];
  const packedCount = packingList.filter(p => p.packed).length;
  const packingProgress = packingList.length > 0 ? ((packedCount / packingList.length) * 100).toFixed(0) : 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-slate-700">
      <div className="flex items-center gap-2 mb-6">
        <FaChartBar size={28} className="text-slate-700" />
        <h2 className="text-2xl font-bold text-slate-800">Trip Analytics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Total Activities */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <FaBoxes size={20} className="text-blue-600" />
            <p className="text-sm font-semibold text-slate-700">Total Activities</p>
          </div>
          <p className="text-3xl font-bold text-blue-600">{totalActivities}</p>
          <p className="text-xs text-slate-600 mt-1">Across {totalDays} days</p>
        </div>

        {/* Average Daily Cost */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <FaDollarSign size={20} className="text-green-600" />
            <p className="text-sm font-semibold text-slate-700">Avg Daily Cost</p>
          </div>
          <p className="text-3xl font-bold text-green-600">${averageDailyCost}</p>
          <p className="text-xs text-slate-600 mt-1">Per day budget</p>
        </div>

        {/* Total Trip Cost */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center gap-2 mb-2">
            <FaDollarSign size={20} className="text-orange-600" />
            <p className="text-sm font-semibold text-slate-700">Total Cost</p>
          </div>
          <p className="text-3xl font-bold text-orange-600">${tripTotal.toFixed(2)}</p>
          <p className="text-xs text-slate-600 mt-1">Full trip expense</p>
        </div>

        {/* Packing Progress */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <FaCalendarAlt size={20} className="text-purple-600" />
            <p className="text-sm font-semibold text-slate-700">Packing Status</p>
          </div>
          <p className="text-3xl font-bold text-purple-600">{packingProgress}%</p>
          <p className="text-xs text-slate-600 mt-1">{packedCount} of {packingList.length} items</p>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-4">Budget Breakdown</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-700">Activities:</span>
              <span className="font-bold text-blue-600">${tripActivitiesTotal.toFixed(2)}</span>
            </div>
            {accommodationCost > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-700">Accommodation:</span>
                <span className="font-bold text-indigo-600">${accommodationCost.toFixed(2)}</span>
              </div>
            )}
            {transportationCost > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-700">Transportation:</span>
                <span className="font-bold text-orange-600">${transportationCost.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-slate-300 pt-3 flex justify-between">
              <span className="font-bold text-slate-800">Total:</span>
              <span className="font-bold text-slate-900">${tripTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Activity Category Breakdown */}
        {Object.keys(categoryBreakdown).length > 0 && (
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4">Activities by Category</h3>
            <div className="space-y-2">
              {Object.entries(categoryBreakdown)
                .sort((a, b) => b[1].count - a[1].count)
                .map(([category, data]) => (
                  <div key={category} className="flex justify-between items-center">
                    <div>
                      <p className="text-slate-700 font-semibold">{category}</p>
                      <p className="text-xs text-slate-600">${data.cost.toFixed(2)}</p>
                    </div>
                    <div className="bg-slate-700 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {data.count}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;

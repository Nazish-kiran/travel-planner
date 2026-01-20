import React, { useContext } from "react";
import { TripContext } from "../context/TripContext";
import { FaCalendarAlt, FaUsers, FaMapMarkerAlt, FaDollarSign } from "react-icons/fa";

const TripStats = () => {
  const { trip } = useContext(TripContext);

  if (!trip || !trip.days) return null;

  const startDate = new Date(trip.startDate);
  const endDate = new Date(trip.endDate);
  const tripDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

  const totalActivitiesCost = (trip.days || []).reduce((sum, day) => {
    return sum + (day.activities || []).reduce((daySum, activity) => daySum + (activity.cost || 0), 0);
  }, 0);

  const accommodationCost = trip.accommodation?.cost || 0;
  const transportationCost = (trip.transportation || []).reduce((sum, t) => sum + (t.cost || 0), 0);
  const totalCost = totalActivitiesCost + accommodationCost + transportationCost;

  const totalActivities = (trip.days || []).reduce((sum, day) => sum + (day.activities || []).length, 0);

  const packedItems = (trip.packingList || []).filter(item => item.packed).length;
  const totalPackingItems = (trip.packingList || []).length;
  const packingPercentage = totalPackingItems > 0 ? Math.round((packedItems / totalPackingItems) * 100) : 0;

  const stats = [
    {
      icon: FaCalendarAlt,
      label: "Trip Duration",
      value: `${tripDays} Days`,
      color: "bg-blue-100 text-blue-700",
    },
    {
      icon: FaUsers,
      label: "Travelers",
      value: trip.travelers,
      color: "bg-green-100 text-green-700",
    },
    {
      icon: FaMapMarkerAlt,
      label: "Destination",
      value: trip.destination,
      color: "bg-purple-100 text-purple-700",
    },
    {
      icon: FaDollarSign,
      label: "Total Budget",
      value: `$${totalCost.toFixed(2)}`,
      color: "bg-orange-100 text-orange-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className={`${stat.color} p-4 rounded-lg shadow-md border-l-4 border-current`}>
            <div className="flex items-center gap-3 mb-2">
              <Icon size={24} />
              <p className="text-sm font-semibold opacity-75">{stat.label}</p>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        );
      })}

      {/* Additional Info Row */}
      <div className="col-span-1 md:col-span-2 lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg shadow-md border-l-4 border-current">
          <p className="text-sm font-semibold opacity-75 mb-2">Activities Planned</p>
          <p className="text-2xl font-bold">{totalActivities}</p>
        </div>

        <div className="bg-indigo-100 text-indigo-700 p-4 rounded-lg shadow-md border-l-4 border-current">
          <p className="text-sm font-semibold opacity-75 mb-2">Packing Progress</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold">{packingPercentage}%</p>
            <div className="flex-1 bg-indigo-200 rounded-full h-3">
              <div 
                className="bg-indigo-700 h-3 rounded-full transition-all duration-300"
                style={{ width: `${packingPercentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-red-100 text-red-700 p-4 rounded-lg shadow-md border-l-4 border-current">
          <p className="text-sm font-semibold opacity-75 mb-2">Daily Average</p>
          <p className="text-2xl font-bold">${(totalCost / tripDays).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default TripStats;

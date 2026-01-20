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

  const stats = [
    {
      icon: FaMapMarkerAlt,
      label: "Destination",
      value: trip.destination,
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: FaCalendarAlt,
      label: "Duration",
      value: `${tripDays} Days`,
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: FaDollarSign,
      label: "Budget",
      value: `$${totalCost.toFixed(2)}`,
      color: "from-green-500 to-green-600",
    },
    {
      icon: FaUsers,
      label: "Travelers",
      value: trip.travelers,
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`bg-gradient-to-br ${stat.color} text-white p-5 md:p-6 rounded-lg shadow-md hover:shadow-lg transition`}
          >
            <div className="flex items-center gap-3 mb-3">
              <Icon size={24} />
              <p className="text-sm font-semibold opacity-90">{stat.label}</p>
            </div>
            <p className="text-lg md:text-xl font-bold">{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TripStats;

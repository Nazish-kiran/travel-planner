// src/pages/Planner.jsx
import React, { useContext, useState } from "react";
import { TripContext } from "../context/TripContext";
import Header from "../componenets/Header";
import TripStats from "../componenets/TripStats";
import BudgetAlert from "../componenets/BudgetAlert";
import AccommodationForm from "../componenets/AccommodationForm";
import TransportationForm from "../componenets/TransportationForm";
import PackingList from "../componenets/PackingList";
import DayPlanner from "../componenets/DayPlanner";
import BudgetSummary from "../componenets/BudgetSummary";
import ItineraryExport from "../componenets/ItineraryExport";
import Weather from "../componenets/Weather";
import TimezoneWidget from "../componenets/TimezoneWidget";
import CurrencyWidget from "../componenets/CurrencyWidget";
import DestinationInfoWidget from "../componenets/DestinationInfoWidget";
import EmergencyContactsWidget from "../componenets/EmergencyContactsWidget";
import PrayerTimesWidget from "../componenets/PrayerTimesWidget";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Planner = () => {
  const { trip } = useContext(TripContext);
  const [expandedDays, setExpandedDays] = useState(trip ? [trip.days[0]?.day] : []);

  if (!trip) {
    return null;
  }

  const toggleDayExpand = (dayNumber) => {
    setExpandedDays(prev => 
      prev.includes(dayNumber) 
        ? prev.filter(d => d !== dayNumber)
        : [...prev, dayNumber]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="max-w-6xl mx-auto p-3 md:p-6 space-y-4 md:space-y-6">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Left Side - Main Content */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Trip Overview Statistics */}
            <TripStats />

            {/* Budget Alert */}
            <BudgetAlert />

            {/* Planning Sections */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6">
              <AccommodationForm />
              <TransportationForm />
            </div>
            
            <PackingList />

            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 md:mb-6">Daily Schedule</h2>
              {trip.days && trip.days.length > 0 ? (
                trip.days.map((day) => {
                  const dayDate = new Date(trip.startDate);
                  dayDate.setDate(dayDate.getDate() + day.day - 1);
                  const isExpanded = expandedDays.includes(day.day);

                  return (
                    <div key={day.day} className="mb-2 md:mb-3 border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                      <button
                        onClick={() => toggleDayExpand(day.day)}
                        className="w-full bg-gradient-to-r from-slate-700 to-slate-900 text-white px-3 md:px-6 py-3 md:py-4 flex items-center justify-between hover:from-slate-800 hover:to-black transition font-semibold text-sm md:text-base"
                      >
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="bg-white text-slate-700 px-2 md:px-3 py-1 rounded font-bold text-xs md:text-sm">
                            Day {day.day}
                          </div>
                          <p className="text-sm md:text-lg">{dayDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                        </div>
                        {isExpanded ? (
                          <FaChevronUp size={16} className="md:w-5 md:h-5" />
                        ) : (
                          <FaChevronDown size={16} className="md:w-5 md:h-5" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="p-4 md:p-6 border-t border-slate-200">
                          <DayPlanner day={day} />
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-slate-500">No days in trip</p>
              )}
            </div>

            <BudgetSummary />

            {/* Export Itinerary */}
            <ItineraryExport />
          </div>

          {/* Right Sidebar - Widgets */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4 md:space-y-6 overflow-y-auto max-h-[calc(100vh-100px)]">
              <Weather destination={trip.destination} />
              <TimezoneWidget destination={trip.destination} />
              <CurrencyWidget destination={trip.destination} />
              <DestinationInfoWidget destination={trip.destination} />
              <EmergencyContactsWidget destination={trip.destination} />
              <PrayerTimesWidget destination={trip.destination} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planner;

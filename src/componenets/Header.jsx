import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TripContext } from "../context/TripContext";
import { MdDelete } from "react-icons/md";
import { FaChartBar, FaStickyNote } from "react-icons/fa";

const Header = () => {
  const { trip, setTrip } = useContext(TripContext);
  const navigate = useNavigate();

  const handleNewTrip = () => {
    if (window.confirm("Are you sure you want to delete this trip and create a new one?")) {
      setTrip(null);
      navigate("/");
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      setTrip(null);
    }
  };

  if (!trip) return null;

  return (
    <header className="bg-gradient-to-r from-slate-700 to-slate-900 text-white p-4 md:p-6 shadow-lg">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="w-full md:w-auto">
          <h1 className="text-2xl md:text-4xl font-bold">{trip.destination}</h1>
          <p className="text-slate-300 mt-1 text-sm md:text-base">
            {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
          </p>
          {trip.travelers && (
            <p className="text-slate-300 text-xs md:text-sm">
              {trip.travelers} {trip.travelers === 1 ? "traveler" : "travelers"}
            </p>
          )}
        </div>
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2 md:gap-3">
          <button
            onClick={() => navigate("/notes")}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition flex items-center justify-center md:justify-start gap-2 text-sm md:text-base"
          >
            <FaStickyNote size={16} className="md:w-5 md:h-5" />
            <span className="hidden sm:inline">Notes</span>
          </button>
          <button
            onClick={() => navigate("/analytics")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition flex items-center justify-center md:justify-start gap-2 text-sm md:text-base"
          >
            <FaChartBar size={16} className="md:w-5 md:h-5" />
            <span className="hidden sm:inline">Analytics</span>
          </button>
          <button
            onClick={handleNewTrip}
            className="bg-red-600 hover:bg-red-700 text-white px-3 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition flex items-center justify-center md:justify-start gap-2 text-sm md:text-base"
          >
            <MdDelete size={16} className="md:w-5 md:h-5" />
            <span className="hidden sm:inline">New Trip</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

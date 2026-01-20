import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TripContext } from "../context/TripContext";
import { MdDelete } from "react-icons/md";
import { FaChartBar, FaStickyNote, FaBars, FaTimes, FaFileAlt } from "react-icons/fa";

const Header = () => {
  const { trip, setTrip } = useContext(TripContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNewTrip = () => {
    if (window.confirm("Are you sure you want to delete this trip and create a new one?")) {
      setTrip(null);
      navigate("/");
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  if (!trip) return null;

  return (
    <header className="bg-gradient-to-r from-slate-700 to-slate-900 text-white p-4 md:p-6 shadow-lg">
      <div className="max-w-6xl mx-auto">
        {/* Desktop Header */}
        <div className="hidden md:flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">{trip.destination}</h1>
            <p className="text-slate-300 mt-1 text-base">
              {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
            </p>
            {trip.travelers && (
              <p className="text-slate-300 text-sm">
                {trip.travelers} {trip.travelers === 1 ? "traveler" : "travelers"}
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/notes")}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
            >
              <FaStickyNote size={20} />
              Notes
            </button>
            <button
              onClick={() => navigate("/documents")}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
            >
              <FaFileAlt size={20} />
              Documents
            </button>
            <button
              onClick={() => navigate("/analytics")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
            >
              <FaChartBar size={20} />
              Analytics
            </button>
            <button
              onClick={handleNewTrip}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
            >
              <MdDelete size={20} />
              New Trip
            </button>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{trip.destination}</h1>
              <p className="text-slate-300 mt-1 text-sm">
                {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 hover:bg-slate-600 rounded-lg transition"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="mt-4 space-y-2 pb-4">
              <button
                onClick={() => handleNavigation("/notes")}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 text-sm"
              >
                <FaStickyNote size={18} />
                Notes
              </button>
              <button
                onClick={() => handleNavigation("/documents")}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 text-sm"
              >
                <FaFileAlt size={18} />
                Documents
              </button>
              <button
                onClick={() => handleNavigation("/analytics")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 text-sm"
              >
                <FaChartBar size={18} />
                Analytics
              </button>
              <button
                onClick={() => {
                  handleNewTrip();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 text-sm"
              >
                <MdDelete size={18} />
                New Trip
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TripContext } from "../context/TripContext";
import { FaMapMarkerAlt } from "react-icons/fa";

const DestinationForm = () => {
  const { setTrip } = useContext(TripContext);
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travelers, setTravelers] = useState("1");

  const handleSubmit = (e) => {
    e.preventDefault();

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffDays =
      Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    const days = Array.from({ length: diffDays }, (_, i) => ({
      day: i + 1,
      activities: [],
    }));

    setTrip({
      destination,
      startDate,
      endDate,
      travelers: Number(travelers),
      days,
      accommodation: null,
      transportation: [],
      packingList: [],
    });

    // Redirect to planner after form submission
    navigate("/planner");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-12 p-8 bg-white shadow-2xl rounded-2xl space-y-5"
    >
      <div className="flex items-center justify-center gap-3 mb-6">
        <FaMapMarkerAlt size={32} className="text-slate-700" />
        <h2 className="text-3xl font-bold text-slate-800">
          New Trip
        </h2>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Destination
        </label>
        <input
          type="text"
          placeholder="e.g., Paris, Tokyo, New York"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full border-2 border-slate-300 p-3 rounded-lg focus:border-slate-700 focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Start Date
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full border-2 border-slate-300 p-3 rounded-lg focus:border-slate-700 focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          End Date
        </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full border-2 border-slate-300 p-3 rounded-lg focus:border-slate-700 focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Number of Travelers
        </label>
        <input
          type="number"
          min="1"
          value={travelers}
          onChange={(e) => setTravelers(e.target.value)}
          className="w-full border-2 border-slate-300 p-3 rounded-lg focus:border-slate-700 focus:outline-none"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-slate-700 to-slate-900 text-white py-3 rounded-lg hover:from-slate-800 hover:to-black font-bold text-lg transition duration-200"
      >
        Create Trip
      </button>
    </form>
  );
};

export default DestinationForm;

import React, { useContext, useState } from "react";
import { TripContext } from "../context/TripContext";
import { FaPlane } from "react-icons/fa";
import { MdAdd, MdDelete } from "react-icons/md";

const TransportationForm = () => {
  const { trip, setTrip } = useContext(TripContext);
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("");
  const [details, setDetails] = useState("");
  const [cost, setCost] = useState("");

  const addTransport = (e) => {
    e.preventDefault();
    if (!type || !details) return;

    const transports = trip.transportation || [];
    setTrip({
      ...trip,
      transportation: [
        ...transports,
        { id: Date.now(), type, details, cost: cost ? Number(cost) : 0 },
      ],
    });
    setType("");
    setDetails("");
    setCost("");
  };

  const removeTransport = (id) => {
    const updated = trip.transportation.filter(t => t.id !== id);
    setTrip({ ...trip, transportation: updated });
  };

  if (!trip) return null;

  const transports = trip.transportation || [];
  const transportCost = transports.reduce((sum, t) => sum + (t.cost || 0), 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-600">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <FaPlane size={24} className="text-orange-600" />
          <h2 className="text-xl font-bold text-slate-800">Transportation</h2>
          <span className="text-lg font-semibold text-orange-600">${transportCost.toFixed(2)}</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center gap-2 transition"
        >
          <MdAdd size={18} />
          {isOpen ? "Cancel" : "Add"}
        </button>
      </div>

      {isOpen && (
        <form onSubmit={addTransport} className="mb-4 space-y-3 bg-orange-50 p-4 rounded-lg border border-orange-200">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-slate-300 p-3 rounded-lg focus:border-orange-600 focus:outline-none"
            required
          >
            <option value="">Select Transport Type</option>
            <option value="Flight">Flight</option>
            <option value="Train">Train</option>
            <option value="Car Rental">Car Rental</option>
            <option value="Bus">Bus</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            placeholder="Details (e.g., Flight number, Route)"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full border border-slate-300 p-3 rounded-lg focus:border-orange-600 focus:outline-none"
            required
          />
          <input
            type="number"
            placeholder="Cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="w-full border border-slate-300 p-3 rounded-lg focus:border-orange-600 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 font-semibold transition"
          >
            Add Transport
          </button>
        </form>
      )}

      <div className="space-y-3">
        {transports.map(t => (
          <div key={t.id} className="bg-orange-50 p-4 rounded-lg border border-orange-200 flex justify-between items-start">
            <div className="flex-1">
              <p className="font-bold text-slate-800">{t.type}</p>
              <p className="text-sm text-slate-600 mt-1">{t.details}</p>
              <p className="text-sm font-semibold text-orange-700 mt-2">Cost: ${t.cost.toFixed(2)}</p>
            </div>
            <button
              onClick={() => removeTransport(t.id)}
              className="text-red-600 hover:text-red-800 ml-4"
            >
              <MdDelete size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransportationForm;

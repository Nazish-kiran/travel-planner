import React, { useContext, useState } from "react";
import { TripContext } from "../context/TripContext";
import { FaHotel } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const AccommodationForm = () => {
  const { trip, setTrip } = useContext(TripContext);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(trip?.accommodation?.name || "");
  const [address, setAddress] = useState(trip?.accommodation?.address || "");
  const [checkIn, setCheckIn] = useState(trip?.accommodation?.checkIn || "");
  const [checkOut, setCheckOut] = useState(trip?.accommodation?.checkOut || "");
  const [cost, setCost] = useState(trip?.accommodation?.cost || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    setTrip({
      ...trip,
      accommodation: {
        name,
        address,
        checkIn,
        checkOut,
        cost: cost ? Number(cost) : 0,
      },
    });
    setIsOpen(false);
  };

  if (!trip) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-600">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <FaHotel size={24} className="text-indigo-600" />
          <h2 className="text-xl font-bold text-slate-800">Accommodation</h2>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition"
        >
          <MdEdit size={18} />
          {isOpen ? "Cancel" : "Edit"}
        </button>
      </div>

      {trip.accommodation && !isOpen && (
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
          <p className="font-bold text-slate-800">{trip.accommodation.name}</p>
          <p className="text-sm text-slate-600 mt-1">{trip.accommodation.address}</p>
          <p className="text-sm text-slate-600 mt-2">
            Check-in: {trip.accommodation.checkIn} • Check-out: {trip.accommodation.checkOut}
          </p>
          <p className="text-sm font-semibold text-indigo-700 mt-2">
            Cost: ${trip.accommodation.cost}
          </p>
        </div>
      )}

      {isOpen && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <input
            type="text"
            placeholder="Hotel/Accommodation Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-slate-300 p-3 rounded-lg focus:border-indigo-600 focus:outline-none"
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-slate-300 p-3 rounded-lg focus:border-indigo-600 focus:outline-none"
          />
          <input
            type="time"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full border border-slate-300 p-3 rounded-lg focus:border-indigo-600 focus:outline-none"
          />
          <input
            type="time"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full border border-slate-300 p-3 rounded-lg focus:border-indigo-600 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Total Cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="w-full border border-slate-300 p-3 rounded-lg focus:border-indigo-600 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold transition"
          >
            Save Accommodation
          </button>
        </form>
      )}
    </div>
  );
};

export default AccommodationForm;

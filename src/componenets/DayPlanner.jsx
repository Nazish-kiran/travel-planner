// src/components/DayPlanner.jsx
import React, { useState, useContext } from "react";
import ActivityCard from "./ActivityCard";
import { TripContext } from "../context/TripContext";
import { FaCalendarAlt } from "react-icons/fa";

const DayPlanner = ({ day }) => {
  const { trip, setTrip } = useContext(TripContext);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("Sightseeing");
  const [cost, setCost] = useState("");
  const [notes, setNotes] = useState("");

  const addActivity = (e) => {
    e.preventDefault();
    if (!title) return;

    const newActivity = {
      id: Date.now(),
      title,
      time,
      category,
      cost: cost ? Number(cost) : 0,
      notes,
    };

    const updatedDays = trip.days.map(d =>
      d.day === day.day
        ? { ...d, activities: [...d.activities, newActivity] }
        : d
    );

    setTrip({ ...trip, days: updatedDays });

    // Clear inputs
    setTitle("");
    setTime("");
    setCategory("Sightseeing");
    setCost("");
    setNotes("");
  };

  const deleteActivity = (id) => {
    const updatedDays = trip.days.map(d =>
      d.day === day.day
        ? { ...d, activities: d.activities.filter(a => a.id !== id) }
        : d
    );
    setTrip({ ...trip, days: updatedDays });
  };

  const dayTotal = day.activities.reduce((sum, a) => sum + (a.cost || 0), 0);

  return (
    <div className="bg-slate-50 p-6 rounded-lg shadow-md mb-6 border-l-4 border-slate-700">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <FaCalendarAlt size={24} className="text-slate-700" />
          <h2 className="text-2xl font-bold text-slate-800">Day {day.day}</h2>
        </div>
        <span className="text-xl font-bold text-green-600">${dayTotal.toFixed(2)}</span>
      </div>

      {/* Activity Form */}
      <form onSubmit={addActivity} className="bg-white p-5 rounded-lg mb-5 space-y-4 border border-slate-200">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Activity title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="col-span-2 border border-slate-300 p-3 rounded-lg focus:border-slate-700 focus:outline-none"
            required
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border border-slate-300 p-3 rounded-lg focus:border-slate-700 focus:outline-none"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-slate-300 p-3 rounded-lg focus:border-slate-700 focus:outline-none"
          >
            <option>Sightseeing</option>
            <option>Dining</option>
            <option>Shopping</option>
            <option>Adventure</option>
            <option>Relaxation</option>
            <option>Culture</option>
            <option>Other</option>
          </select>
        </div>
        <textarea
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border border-slate-300 p-3 rounded-lg text-sm focus:border-slate-700 focus:outline-none"
          rows="2"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="border border-slate-300 p-3 rounded-lg focus:border-slate-700 focus:outline-none"
          />
          <button type="submit" className="bg-slate-700 text-white py-3 rounded-lg hover:bg-slate-800 font-semibold transition">
            Add Activity
          </button>
        </div>
      </form>

      {/* Activity List */}
      <div>
        {day.activities.length === 0 ? (
          <p className="text-center text-slate-500 py-6 text-sm">No activities yet. Add one above!</p>
        ) : (
          day.activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onDelete={deleteActivity}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DayPlanner;

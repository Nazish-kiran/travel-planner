import React, { useContext, useState } from "react";
import { TripContext } from "../context/TripContext";
import { FaStickyNote } from "react-icons/fa";
import { MdEdit, MdSave, MdCancel } from "react-icons/md";

const TripNotes = () => {
  const { trip, setTrip } = useContext(TripContext);
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(trip?.notes || "");

  const handleSaveNotes = () => {
    setTrip({
      ...trip,
      notes: notes,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNotes(trip?.notes || "");
    setIsEditing(false);
  };

  if (!trip) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-600">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FaStickyNote size={24} className="text-yellow-600" />
          <h2 className="text-xl font-bold text-slate-800">Trip Notes</h2>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 flex items-center gap-2 transition font-semibold"
          >
            <MdEdit size={18} />
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add important notes about your trip (visa requirements, travel tips, important contacts, etc.)"
            className="w-full border border-slate-300 p-4 rounded-lg focus:border-yellow-600 focus:outline-none h-32 resize-none"
          />
          <div className="flex gap-3">
            <button
              onClick={handleSaveNotes}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 transition font-semibold"
            >
              <MdSave size={18} />
              Save Notes
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-slate-400 text-white py-3 rounded-lg hover:bg-slate-500 flex items-center justify-center gap-2 transition font-semibold"
            >
              <MdCancel size={18} />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 min-h-[120px]">
          {notes ? (
            <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{notes}</p>
          ) : (
            <p className="text-slate-500 italic">No notes yet. Click 'Edit' to add important trip information.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TripNotes;

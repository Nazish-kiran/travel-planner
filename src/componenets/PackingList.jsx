import React, { useContext, useState } from "react";
import { TripContext } from "../context/TripContext";
import { MdBackpack } from "react-icons/md";
import { MdAdd, MdDelete } from "react-icons/md";

const PackingList = () => {
  const { trip, setTrip } = useContext(TripContext);
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState("");

  const addItem = (e) => {
    e.preventDefault();
    if (!item.trim()) return;

    const packingList = trip.packingList || [];
    setTrip({
      ...trip,
      packingList: [...packingList, { id: Date.now(), text: item, packed: false }],
    });
    setItem("");
  };

  const togglePacked = (id) => {
    const updated = trip.packingList.map(p =>
      p.id === id ? { ...p, packed: !p.packed } : p
    );
    setTrip({ ...trip, packingList: updated });
  };

  const removeItem = (id) => {
    const updated = trip.packingList.filter(p => p.id !== id);
    setTrip({ ...trip, packingList: updated });
  };

  if (!trip) return null;

  const packingList = trip.packingList || [];
  const packedCount = packingList.filter(p => p.packed).length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-600">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <MdBackpack size={24} className="text-purple-600" />
          <h2 className="text-xl font-bold text-slate-800">
            Packing List <span className="text-purple-600">({packedCount}/{packingList.length})</span>
          </h2>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2 transition"
        >
          <MdAdd size={18} />
          {isOpen ? "Done" : "Add Items"}
        </button>
      </div>

      {isOpen && (
        <form onSubmit={addItem} className="mb-4 flex gap-2 bg-purple-50 p-4 rounded-lg border border-purple-200">
          <input
            type="text"
            placeholder="Add item to pack..."
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="flex-1 border border-slate-300 p-3 rounded-lg focus:border-purple-600 focus:outline-none"
          />
          <button type="submit" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-semibold transition">
            Add
          </button>
        </form>
      )}

      <div className="space-y-2">
        {packingList.length === 0 ? (
          <p className="text-center text-slate-500 py-4">No items yet. Start adding items!</p>
        ) : (
          packingList.map(p => (
            <div key={p.id} className="flex items-center justify-between bg-purple-50 p-3 rounded-lg border border-purple-200">
              <label className="flex items-center gap-3 flex-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={p.packed}
                  onChange={() => togglePacked(p.id)}
                  className="w-5 h-5 accent-purple-600"
                />
                <span className={p.packed ? "line-through text-slate-500" : "text-slate-700"}>
                  {p.text}
                </span>
              </label>
              <button
                onClick={() => removeItem(p.id)}
                className="text-red-600 hover:text-red-800 ml-2"
              >
                <MdDelete size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PackingList;

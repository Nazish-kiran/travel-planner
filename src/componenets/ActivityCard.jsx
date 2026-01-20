// src/components/ActivityCard.jsx
import React from "react";
import { MdDelete } from "react-icons/md";
import { FaClock, FaUtensils, FaShoppingBag, FaAward, FaSpa, FaTheaterMasks } from "react-icons/fa";

const ActivityCard = ({ activity, onDelete }) => {
  const getCategoryIcon = (category) => {
    const icons = {
      "Sightseeing": <FaAward className="text-slate-600" />,
      "Dining": <FaUtensils className="text-slate-600" />,
      "Shopping": <FaShoppingBag className="text-slate-600" />,
      "Adventure": <FaAward className="text-slate-600" />,
      "Relaxation": <FaSpa className="text-slate-600" />,
      "Culture": <FaTheaterMasks className="text-slate-600" />,
      "Other": <FaAward className="text-slate-600" />
    };
    return icons[category] || <FaAward className="text-slate-600" />;
  };

  return (
    <div className="flex justify-between items-start bg-white p-5 rounded-lg shadow-sm mb-3 border border-slate-200 hover:shadow-md transition">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{getCategoryIcon(activity.category)}</span>
          <h3 className="font-bold text-lg text-slate-800">{activity.title}</h3>
        </div>
        {activity.time && (
          <div className="flex items-center gap-2 text-slate-600 font-semibold mb-1">
            <FaClock size={14} />
            <span className="text-sm">{activity.time}</span>
          </div>
        )}
        {activity.category && (
          <p className="text-sm text-slate-600 mb-2">{activity.category}</p>
        )}
        {activity.notes && (
          <p className="text-sm text-slate-600 mt-2 italic bg-slate-50 p-2 rounded">
            {activity.notes}
          </p>
        )}
        {activity.cost > 0 && (
          <p className="text-sm font-bold text-green-600 mt-2">${activity.cost.toFixed(2)}</p>
        )}
      </div>
      <button
        onClick={() => onDelete(activity.id)}
        className="ml-4 text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-2 rounded transition"
        title="Delete activity"
      >
        <MdDelete size={20} />
      </button>
    </div>
  );
};

export default ActivityCard;

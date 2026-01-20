import React, { useContext, useState } from "react";
import { TripContext } from "../context/TripContext";
import Header from "../componenets/Header";
import { FaCheckCircle, FaCircle, FaPlus, FaTrash, FaFileAlt, FaPassport, FaShieldAlt, FaSyringe, FaMoneyBill } from "react-icons/fa";

const Documents = () => {
  const { trip, updateTrip } = useContext(TripContext);
  const [newDoc, setNewDoc] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("passport");

  if (!trip) {
    return null;
  }

  const docCategories = [
    { id: "passport", label: "Passport", icon: FaPassport, color: "blue" },
    { id: "visa", label: "Visa", icon: FaFileAlt, color: "green" },
    { id: "insurance", label: "Travel Insurance", icon: FaShieldAlt, color: "red" },
    { id: "vaccination", label: "Vaccination Records", icon: FaSyringe, color: "purple" },
    { id: "financial", label: "Financial Documents", icon: FaMoneyBill, color: "yellow" },
    { id: "other", label: "Other", icon: FaFileAlt, color: "slate" },
  ];

  // Initialize documents if not exists
  const documents = trip.documents || {};

  const addDocument = () => {
    if (!newDoc.trim()) return;

    const updated = { ...trip };
    if (!updated.documents) updated.documents = {};
    if (!updated.documents[selectedCategory]) updated.documents[selectedCategory] = [];

    updated.documents[selectedCategory] = [
      ...updated.documents[selectedCategory],
      { id: Date.now(), text: newDoc, completed: false },
    ];

    updateTrip(updated);
    setNewDoc("");
  };

  const toggleDocument = (category, docId) => {
    const updated = { ...trip };
    const doc = updated.documents[category].find((d) => d.id === docId);
    if (doc) doc.completed = !doc.completed;
    updateTrip(updated);
  };

  const deleteDocument = (category, docId) => {
    const updated = { ...trip };
    updated.documents[category] = updated.documents[category].filter((d) => d.id !== docId);
    updateTrip(updated);
  };

  const getCategoryIcon = (catId) => {
    const cat = docCategories.find((c) => c.id === catId);
    return cat ? cat.icon : FaFileAlt;
  };

  const getCategoryColor = (catId) => {
    const cat = docCategories.find((c) => c.id === catId);
    return cat ? cat.color : "slate";
  };

  const completedCount = Object.values(documents).flat().filter((d) => d.completed).length;
  const totalCount = Object.values(documents).flat().length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="max-w-4xl mx-auto p-3 md:p-6 space-y-6">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Documents & Prep</h1>
          <p className="text-blue-100">Track important documents and preparation for your trip</p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-slate-800">Preparation Progress</h3>
            <span className="text-2xl font-bold text-blue-600">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div
              className="bg-linear-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-slate-600 mt-2">
            {completedCount} of {totalCount} items completed
          </p>
        </div>

        {/* Add Document Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Add Document</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {docCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter document name..."
                value={newDoc}
                onChange={(e) => setNewDoc(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addDocument()}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={addDocument}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition"
              >
                <FaPlus size={16} /> Add
              </button>
            </div>
          </div>
        </div>

        {/* Documents by Category */}
        <div className="space-y-4">
          {docCategories.map((category) => {
            const categoryDocs = documents[category.id] || [];
            const Icon = category.icon;
            const colorClass = {
              blue: "border-blue-200 bg-blue-50",
              green: "border-green-200 bg-green-50",
              red: "border-red-200 bg-red-50",
              purple: "border-purple-200 bg-purple-50",
              yellow: "border-yellow-200 bg-yellow-50",
              slate: "border-slate-200 bg-slate-50",
            }[category.color];

            const iconColor = {
              blue: "text-blue-600",
              green: "text-green-600",
              red: "text-red-600",
              purple: "text-purple-600",
              yellow: "text-yellow-600",
              slate: "text-slate-600",
            }[category.color];

            return (
              <div key={category.id} className={`border-l-4 ${colorClass} p-6 rounded-lg shadow-md`}>
                <div className="flex items-center gap-2 mb-4">
                  <Icon className={iconColor} size={24} />
                  <h3 className="text-xl font-bold text-slate-800">{category.label}</h3>
                  <span className="ml-auto text-sm font-semibold text-slate-600 bg-white px-3 py-1 rounded-full">
                    {categoryDocs.filter((d) => d.completed).length}/{categoryDocs.length}
                  </span>
                </div>

                {categoryDocs.length === 0 ? (
                  <p className="text-slate-500 text-sm italic">No documents added yet</p>
                ) : (
                  <div className="space-y-2">
                    {categoryDocs.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition"
                      >
                        <button
                          onClick={() => toggleDocument(category.id, doc.id)}
                          className="flex-shrink-0 text-lg transition hover:scale-110"
                        >
                          {doc.completed ? (
                            <FaCheckCircle className="text-green-500" />
                          ) : (
                            <FaCircle className="text-slate-400 hover:text-blue-500" />
                          )}
                        </button>
                        <span
                          className={`flex-1 ${
                            doc.completed
                              ? "line-through text-slate-400"
                              : "text-slate-800 font-medium"
                          }`}
                        >
                          {doc.text}
                        </span>
                        <button
                          onClick={() => deleteDocument(category.id, doc.id)}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-l-4 border-amber-500 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-amber-900 mb-3">📋 Preparation Tips</h3>
          <ul className="space-y-2 text-sm text-amber-900">
            <li>✓ Check passport expiry date (usually valid for 6+ months after travel)</li>
            <li>✓ Apply for visa at least 2-3 weeks in advance</li>
            <li>✓ Get travel insurance before departure</li>
            <li>✓ Check vaccination requirements for your destination</li>
            <li>✓ Make copies of important documents and store separately</li>
            <li>✓ Inform your bank of travel dates</li>
            <li>✓ Register with your embassy if traveling to high-risk areas</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Documents;

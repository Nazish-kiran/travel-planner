import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TripContext } from "../context/TripContext";
import { FaArrowLeft, FaStickyNote, FaPlus, FaTrash } from "react-icons/fa";
import { MdEdit, MdSave, MdCancel } from "react-icons/md";

const NotesPage = () => {
  const { trip, setTrip } = useContext(TripContext);
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [newCategory, setNewCategory] = useState("general");
  const [newContent, setNewContent] = useState("");
  const [showForm, setShowForm] = useState(false);

  if (!trip) {
    return null;
  }

  const notes = trip.notes || [];

  const categories = [
    { id: "general", label: "General", color: "bg-yellow-100", borderColor: "border-yellow-400", textColor: "text-yellow-700" },
    { id: "visa", label: "Visa & Documents", color: "bg-red-100", borderColor: "border-red-400", textColor: "text-red-700" },
    { id: "tips", label: "Travel Tips", color: "bg-blue-100", borderColor: "border-blue-400", textColor: "text-blue-700" },
    { id: "contacts", label: "Important Contacts", color: "bg-green-100", borderColor: "border-green-400", textColor: "text-green-700" },
    { id: "weather", label: "Weather & Climate", color: "bg-purple-100", borderColor: "border-purple-400", textColor: "text-purple-700" },
    { id: "local", label: "Local Info", color: "bg-indigo-100", borderColor: "border-indigo-400", textColor: "text-indigo-700" },
  ];

  const getCategoryInfo = (categoryId) => {
    return categories.find(cat => cat.id === categoryId) || categories[0];
  };

  const addNote = () => {
    if (!newContent.trim()) return;

    const updatedNotes = [...notes, {
      id: Date.now(),
      category: newCategory,
      content: newContent,
      createdAt: new Date().toLocaleDateString()
    }];

    setTrip({
      ...trip,
      notes: updatedNotes,
    });

    setNewContent("");
    setNewCategory("general");
    setShowForm(false);
  };

  const updateNote = (id, newText) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, content: newText } : note
    );

    setTrip({
      ...trip,
      notes: updatedNotes,
    });

    setEditingId(null);
    setEditContent("");
  };

  const deleteNote = (id) => {
    if (window.confirm("Delete this note?")) {
      const updatedNotes = notes.filter(note => note.id !== id);
      setTrip({
        ...trip,
        notes: updatedNotes,
      });
    }
  };

  const groupedNotes = categories.reduce((acc, category) => {
    acc[category.id] = notes.filter(note => note.category === category.id);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-700 to-slate-900 text-white p-6 shadow-lg sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate("/planner")}
            className="flex items-center gap-2 bg-white text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-100 transition font-semibold"
          >
            <FaArrowLeft size={18} />
            Back to Planner
          </button>
          <div>
            <h1 className="text-3xl font-bold">{trip.destination} - Trip Notes</h1>
            <p className="text-slate-300">Organized notes for your journey</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Add Note Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="w-full bg-gradient-to-r from-slate-700 to-slate-900 text-white py-4 rounded-lg hover:from-slate-800 hover:to-black transition font-bold flex items-center justify-center gap-2"
            >
              <FaPlus size={20} />
              Add New Note
            </button>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Create New Note</h2>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full border border-slate-300 p-3 rounded-lg focus:border-slate-700 focus:outline-none"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Note Content</label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Write your note here..."
                  className="w-full border border-slate-300 p-4 rounded-lg focus:border-slate-700 focus:outline-none h-32 resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={addNote}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 transition font-semibold"
                >
                  <FaPlus size={18} />
                  Add Note
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-slate-400 text-white py-3 rounded-lg hover:bg-slate-500 flex items-center justify-center gap-2 transition font-semibold"
                >
                  <MdCancel size={18} />
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Notes by Category */}
        {categories.map(category => {
          const categoryNotes = groupedNotes[category.id];
          
          return (
            <div key={category.id}>
              {categoryNotes.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className={`text-2xl font-bold ${category.textColor}`}>{category.label}</h2>
                    <span className="bg-slate-700 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {categoryNotes.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {categoryNotes.map(note => (
                      <div
                        key={note.id}
                        className={`${category.color} border-l-4 ${category.borderColor} p-5 rounded-lg shadow-md`}
                      >
                        {editingId === note.id ? (
                          <div className="space-y-3">
                            <textarea
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                              className="w-full border border-slate-300 p-3 rounded-lg focus:outline-none h-24 resize-none"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => updateNote(note.id, editContent)}
                                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 transition font-semibold"
                              >
                                <MdSave size={16} />
                                Save
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="flex-1 bg-slate-400 text-white py-2 rounded-lg hover:bg-slate-500 flex items-center justify-center gap-2 transition font-semibold"
                              >
                                <MdCancel size={16} />
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <p className="text-slate-700 whitespace-pre-wrap flex-1">{note.content}</p>
                              <div className="flex gap-2 ml-4">
                                <button
                                  onClick={() => {
                                    setEditingId(note.id);
                                    setEditContent(note.content);
                                  }}
                                  className="text-blue-600 hover:text-blue-800 transition"
                                >
                                  <MdEdit size={18} />
                                </button>
                                <button
                                  onClick={() => deleteNote(note.id)}
                                  className="text-red-600 hover:text-red-800 transition"
                                >
                                  <FaTrash size={16} />
                                </button>
                              </div>
                            </div>
                            <p className="text-xs text-slate-600 mt-2">Created: {note.createdAt}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Empty State */}
        {notes.length === 0 && (
          <div className="bg-white p-12 rounded-lg shadow-md text-center">
            <FaStickyNote size={48} className="mx-auto text-slate-400 mb-4" />
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No Notes Yet</h3>
            <p className="text-slate-600">Start adding notes to keep track of important information about your trip.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesPage;

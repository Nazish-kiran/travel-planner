import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Planner from "./pages/Planner";
import Analytics from "./pages/Analytics";
import Notes from "./pages/Notes";
import Documents from "./pages/Documents";
import DestinationForm from "./componenets/DestinationForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DestinationForm/>} />
         <Route path="/home" element={<Home />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/documents" element={<Documents />} />
      </Routes>
    </Router>
  );
}

export default App;

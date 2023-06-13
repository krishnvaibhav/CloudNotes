import React from "react";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Login from "./components/login";
import Signup from "./components/signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";

export default function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </NoteState>
  );
}

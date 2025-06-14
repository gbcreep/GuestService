import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NewRequestPopup from "./NewRequestPopup";
import FollowUp from "./FollowUp";
import Archivio from "./Archivio";
import Statistiche from "./Statistiche";
import logo from "../assets/sbbw.webp";
import "./Home.css";

export default function Home() {
  // Legge subito l'utente salvato in login
  const user = localStorage.getItem("guest_service_operator") || "";
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const handleClose = () => setShowNewRequest(false);

  const handleSave = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
    setShowNewRequest(false);
  };

  return (
    <div className="home-container">
      <div className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <p className="username">{user}</p>
        </div>
        <button className="menu-button" onClick={() => setShowNewRequest(true)}>
          Nuova Richiesta
        </button>
        <button className="menu-button" onClick={() => navigate("/archivio")}>
          Archivio
        </button>
        <button className="menu2-button" onClick={() => navigate("/statistiche")}>
          Stats
        </button>
        <button
          className="menu-button logout-button"
          onClick={() => {
            localStorage.removeItem("guest_service_operator");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
      <div className="main-content">
        <FollowUp tasks={tasks} username={user} />
      </div>
      {showNewRequest && (
        <NewRequestPopup
          currentUser={user}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

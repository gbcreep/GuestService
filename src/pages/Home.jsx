import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NewRequestPopup from "./NewRequestPopup";
import FollowUp from "./FollowUp";
import Archivio from "./Archivio";
import Stats from "./Statistiche";
import logo from "../assets/sbbw.webp";
import "./Home.css";

export default function Home() {
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [tasks, setTasks] = useState([]);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  
  // Chiudi la finestra popup
  const handleClose = () => {
    setShowNewRequest(false);
  };

  // Salva la nuova richiesta
  const handleSave = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setShowNewRequest(false);
  };

  return (
    <div className="home-container">
      <div className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <p className="username">{username}</p>
        </div>
        <button onClick={() => setShowNewRequest(true)} className="menu-button">
          Nuova Richiesta
        </button>
        
        <button
          onClick={() => navigate("/archivio")}
          className="menu-button"
        >
          Archivio
        </button>
        
        <button
          onClick={() => navigate("/statistiche")}
          className="menu2-button"
        >
          Stats
        </button>

        <button
          onClick={() => (window.location.href = "/")}
          className="menu-button logout-button"
        >
          Logout
        </button>
      </div>

      <div className="main-content">
        <FollowUp tasks={tasks} username={username} />
      </div>

      {showNewRequest && (
        <NewRequestPopup
          currentUser={username}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Logo from "../assets/sbbw.webp";

export default function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      // Salva l'username in localStorage
      localStorage.setItem("username", username);
      navigate("/home");
    } else {
      alert("Per favore inserisci il tuo nome");
    }
  };

  return (
    <div className="login-container">
      <img src={Logo} alt="Smart Butler Logo" className="login-logo" />
      <h1 className="login-title">🔑 LOGIN</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          className="login-input"
          placeholder="Inserisci il tuo nome"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" className="login-button">Accedi</button>
      </form>
    </div>
  );
}

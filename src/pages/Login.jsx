import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Logo from "../assets/sbbw.webp";

export default function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log("→ Tentativo di login:", username);
    if (username.trim()) {
      localStorage.setItem("guest_service_operator", username);
      console.log("✔️ Salvato in localStorage:", username);
  
      console.log("↪️ Cambio hash a #/home");
      window.location.href = `${window.location.origin}/#/home`;
  
    } else {
      console.log("⚠️ Username vuoto");
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

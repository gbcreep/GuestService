// src/pages/Statistiche.jsx
import React, { useState, useEffect } from "react";
import "./Statistiche.css";

export default function Statistiche() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/statistiche", { method: "POST" });
      const text = await res.text();
      if (!res.ok) 
        throw new Error(`Risposta non JSON: ${text}`);

      setStats(json.stats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="statistiche-container">
      <h1>📊 Statistiche Richieste</h1>
      {loading && <p>Caricamento in corso…</p>}
      {error && <p className="error">{error}</p>}
      {stats && (
        <ul className="stats-list">
          {Object.entries(stats).map(([item, count]) => (
            <li key={item}>
              <span className="item">{item}</span>: <span className="count">{count}</span>
            </li>
          ))}
        </ul>
      )}
      <button className="refresh-btn" onClick={fetchStats}>
        ↻ Aggiorna
      </button>
    </div>
  );
}

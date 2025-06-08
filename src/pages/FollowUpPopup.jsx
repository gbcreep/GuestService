import React, { useState } from "react";
import "./FollowUpPopup.css";

const FollowUpPopup = ({ task, onClose, onSave, username }) => {
  const [note, setNote] = useState("");

  const handleSave = async () => {
    if (note.trim() !== "") {
      // aspetta che onSave completi l'archiviazione
      await onSave(task.id, note);
      // poi chiude il popup
      onClose();
    }
  };

  const followUpTime = new Date().toLocaleString("it-IT", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit"
  });

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>
          Follow-up per la richiesta “{task.richiesta}” nella camera {task.numeroCamera}
        </h3>
        <p><strong>Operatore:</strong> {username}</p>
        <p><strong>Orario:</strong> {followUpTime}</p>
        <textarea
          placeholder="Inserisci la nota di follow up"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <div className="popup-buttons">
          <button className="save-btn" onClick={handleSave}>Salva</button>
          <button className="cancel-btn" onClick={onClose}>Annulla</button>
        </div>
      </div>
    </div>
  );
};

export default FollowUpPopup;

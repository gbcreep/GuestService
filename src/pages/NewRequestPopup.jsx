import React, { useState, useEffect } from "react";
import './NewRequestPopup.css';
import supabase from "../supabaseClient";

export default function NewRequestPopup({ onClose, currentUser }) {
  const [numeroCamera, setNumeroCamera] = useState("");
  const [richiesta, setRichiesta] = useState("");
  const [operatoreTask, setOperatoreTask] = useState("");
  const [reparto, setReparto] = useState("");
  const [tempistica, setTempistica] = useState(15);
  const [data, setData] = useState(() => new Date().toISOString().split("T")[0]);
  const [ora, setOra] = useState(() => {
    const now = new Date();
    return now.toTimeString().substring(0, 5);
  });
  const [reparti, setReparti] = useState([]);

  // Carica i reparti dal DB all'avvio
  useEffect(() => {
    const fetchReparti = async () => {
      const { data, error } = await supabase.from("reparti").select("nome");

      if (error) {
        console.error("Errore nel recupero reparti:", error.message);
      } else {
        setReparti(data || []);
      }
    };

    fetchReparti();
  }, []);

  const handleSave = async () => {
    if (!numeroCamera || !richiesta || !operatoreTask || !reparto) {
      alert("Tutti i campi devono essere compilati!");
      return;
    }

    const { error } = await supabase.from("richieste").insert([
      {
        numeroCamera,
        richiesta,
        operatoreTask,
        reparto,
        tempistica,
        data,
        ora,
        operatoreguestservice: currentUser,
        stato: "in attesa",
      },
    ]);

    if (error) {
      console.error("Errore durante l'inserimento:", error);
      alert("Errore durante l'inserimento della richiesta.");
    } else {
      onClose();
      // Reset campi
      setNumeroCamera("");
      setRichiesta("");
      setOperatoreTask("");
      setReparto("");
      setTempistica(15);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Nuova Richiesta</h2>
        <div className="form-group">
          <label>Numero Camera</label>
          <input
            type="text"
            value={numeroCamera}
            onChange={(e) => setNumeroCamera(e.target.value)}
            placeholder="Inserisci numero camera"
          />
        </div>
        <div className="form-group">
          <label>Richiesta</label>
          <input
            type="text"
            value={richiesta}
            onChange={(e) => setRichiesta(e.target.value)}
            placeholder="Descrizione richiesta"
          />
        </div>
        <div className="form-group">
          <label>Operatore Task</label>
          <input
            type="text"
            value={operatoreTask}
            onChange={(e) => setOperatoreTask(e.target.value)}
            placeholder="Nome operatore incaricato"
          />
        </div>
        <div className="form-group">
          <label>Reparto</label>
          <select value={reparto} onChange={(e) => setReparto(e.target.value)}>
            <option value="">Seleziona Reparto</option>
            {reparti.map((r) => (
              <option key={r.nome} value={r.nome}>
                {r.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Tempistica (minuti)</label>
          <input
            type="number"
            value={tempistica}
            onChange={(e) => setTempistica(parseInt(e.target.value) || 0)}
          />
        </div>
        <div className="form-group">
          <label>Data</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Ora</label>
          <input
            type="time"
            value={ora}
            onChange={(e) => setOra(e.target.value)}
          />
        </div>

        <div className="popup-footer">
          <p className="operator-info">
            Guest Service: <strong>{currentUser}</strong> 
          </p>
          <div className="buttons">
            <button className="save-btn" onClick={handleSave}>
              Salva
            </button>
            <button className="cancel-btn" onClick={onClose}>
              Annulla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

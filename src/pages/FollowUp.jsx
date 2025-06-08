import React, { useState, useEffect } from "react";
import supabase from "../supabaseClient";
import "./FollowUp.css";
import FollowUpPopup from "./FollowUpPopup";

export default function FollowUp({ username }) {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  // Load tasks and refresh every 10s
  useEffect(() => {
    fetchTasks();
    const iv = setInterval(fetchTasks, 10000);
    return () => clearInterval(iv);
  }, []);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("richieste")
      .select("*")
      .eq("stato", "in attesa")
      .order("data", { ascending: true });
    if (!error) setTasks(data || []);
  };

  // expired if now past (data+ora + tempistica minutes)
  const isExpired = (t) => {
    const start = new Date(`${t.data}T${t.ora}`).getTime();
    return Date.now() >= start + t.tempistica * 60000;
  };

  const handlePostpone = async (id) => {
    const { data, error } = await supabase
      .from("richieste")
      .select("tempistica")
      .eq("id", id)
      .single();
    if (data && !error) {
      await supabase
        .from("richieste")
        .update({ tempistica: data.tempistica + 5 })
        .eq("id", id);
      fetchTasks();
    }
  };

  const handleFollowUpClick = (task) => {
    setSelectedTask(task);
  };

  const handleSaveFollowUp = async (taskId, note) => {
    // aggiorna Supabase
    await supabase
      .from("richieste")
      .update({
        follow_up: note,
        follow_up_operator: username,
        follow_up_time: new Date().toISOString(),
        stato: "archiviato"
      })
      .eq("id", taskId);
  
    // ricarica la lista
    await fetchTasks();
  };

  return (
    <div className="followup-container">
      <h2>☎️ Follow-Up Call</h2>
      {tasks.map((t) => (
        <div
          key={t.id}
          className={`task ${isExpired(t) ? "expired" : ""}`}
        >
          <p><strong>Camera:</strong> {t.numeroCamera}</p>
          <p><strong>Richiesta:</strong> {t.richiesta}</p>
          <p><strong>Reparto:</strong> {t.reparto}</p>
          <p><strong>Operatore:</strong> {t.operatoreguestservice}</p>
          <p>
            <strong>Scadenza:</strong>{" "}
            {Math.max(
              0,
              Math.ceil(
                (new Date(`${t.data}T${t.ora}`).getTime() +
                  t.tempistica * 60000 -
                  Date.now()) /
                  60000
              )
            )}{" "}
            min
          </p>
          <div className="actions">
            <button classname="postpone" onClick={() => handlePostpone(t.id)}>Postponi</button>
            <button classname="followup" onClick={() => handleFollowUpClick(t)}>Follow Up</button>
          </div>
        </div>
      ))}

      {selectedTask && (
        <FollowUpPopup
          task={selectedTask}
          username={username}
          onClose={() => setSelectedTask(null)}
          onSave={handleSaveFollowUp}
        />
      )}
    </div>
  );
}

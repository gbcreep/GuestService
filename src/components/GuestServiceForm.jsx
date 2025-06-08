
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function GuestServiceForm() {
  const [form, setForm] = useState({
    data: new Date().toISOString().slice(0, 10),
    ora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    richiesta: '',
    reparto_id: '',
    operatore: '',
    tempistica: 15
  });

  const [reparti, setReparti] = useState([]);

  useEffect(() => {
    const fetchReparti = async () => {
      const { data, error } = await supabase.from('reparti').select('*').order('nome');
      if (!error) setReparti(data);
    };
    fetchReparti();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('richieste').insert([form]);
    if (error) {
      alert('Errore salvataggio');
      console.error(error);
    } else {
      alert('Richiesta salvata');
      setForm({
        data: new Date().toISOString().slice(0, 10),
        ora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        richiesta: '',
        reparto_id: '',
        operatore: '',
        tempistica: 15
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-xl">
      <h2 className="text-xl font-bold text-blue-800 mb-4 text-center">📋 Nuova Richiesta Ospite</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Data</label>
            <input type="date" name="data" value={form.data} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Ora</label>
            <input type="time" name="ora" value={form.ora} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Richiesta</label>
          <textarea name="richiesta" value={form.richiesta} onChange={handleChange} className="w-full border rounded px-2 py-1"></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium">Reparto</label>
          <select name="reparto_id" value={form.reparto_id} onChange={handleChange} className="w-full border rounded px-2 py-1">
            <option value="">Seleziona</option>
            {reparti.map((rep) => (
              <option key={rep.id} value={rep.id}>{rep.nome}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Operatore</label>
          <input type="text" name="operatore" value={form.operatore} onChange={handleChange} className="w-full border rounded px-2 py-1" />
        </div>

        <div>
          <label className="block text-sm font-medium">Tempistica (minuti)</label>
          <input type="number" name="tempistica" value={form.tempistica} onChange={handleChange} className="w-full border rounded px-2 py-1" />
        </div>

        <button type="submit" className="w-full bg-blue-700 text-white rounded py-2 hover:bg-blue-900">Salva Richiesta</button>
      </form>
    </div>
  );
}

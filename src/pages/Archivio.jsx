import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';
import './Archivio.css';

export default function Archivio() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ dataDa: '', dataA: '', repartoId: '' });
  const [reparti, setReparti] = useState([]);
  const [richieste, setRichieste] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Carica lista reparti
  useEffect(() => {
    supabase.from('reparti')
      .select('*')
      .order('nome')
      .then(({ data, error }) => { if (!error) setReparti(data); });
  }, []);

  // Fetch con filtri di data e reparto
  const fetchRichieste = async () => {
    let query = supabase
      .from('richieste')
      .select('id,data,ora,numeroCamera,reparto,operatoreTask,richiesta,operatoreguestservice,follow_up,follow_up_operator,follow_up_time');
    if (filters.dataDa)    query = query.gte('data', filters.dataDa);
    if (filters.dataA)     query = query.lte('data', filters.dataA);
    if (filters.repartoId) query = query.eq('reparto', filters.repartoId);
    const { data, error } = await query.order('data', { ascending: false });
    if (!error) setRichieste(data);
  };

  const handleChangeFilter = (e) => {
    const { name, value } = e.target;
    setFilters(f => ({ ...f, [name]: value }));
  };

  const handleGoHome = () => navigate('/home');
  const handlePrint  = () => window.print();
  const handleExport = () => {
    if (!richieste.length) return;
    const header = Object.keys(richieste[0]).join(';') + '\n';
    const body = richieste
      .map(r => Object.values(r).map(v => `"${v}"`).join(';'))
      .join('\n');
    const blob = new Blob([header + body], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `archivio_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filtraggio client-side per ricerca su tutti i campi
  const filteredRichieste = richieste.filter(r => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return Object.values(r).some(val => val && String(val).toLowerCase().includes(term));
  });

  // Modal handlers
  const handleEdit = (req) => {
    setSelectedRequest({ ...req });
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRequest(null);
  };
  const handleChangeSelected = (e) => {
    const { name, value } = e.target;
    setSelectedRequest(prev => ({ ...prev, [name]: value }));
  };
  const handleSaveEdit = async () => {
    if (!selectedRequest) return;
    const { id, ...updates } = selectedRequest;
    const { error } = await supabase.from('richieste').update(updates).eq('id', id);
    if (!error) {
      handleCloseModal();
      fetchRichieste();
    } else {
      console.error('Errore salvataggio:', error);
    }
  };

  return (
    <div className="archivio-container">
      <h1>Archivio Guest Service</h1>

      <div className="top-actions">
        <button onClick={handleGoHome} className="btn btn-secondary">Home</button>
        <button onClick={handlePrint}  className="btn btn-primary">Stampa</button>
        <button onClick={handleExport} className="btn btn-primary">Esporta</button>
      </div>

      <div className="filters">
        <input type="date" name="dataDa" value={filters.dataDa} onChange={handleChangeFilter} placeholder="Data da" />
        <input type="date" name="dataA" value={filters.dataA} onChange={handleChangeFilter} placeholder="Data a" />
        <select name="repartoId" value={filters.repartoId} onChange={handleChangeFilter}>
          <option value="">Tutti i reparti</option>
          {reparti.map(r => <option key={r.id} value={r.nome}>{r.nome}</option>)}
        </select>
        <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="🔍 Cerca..." className="search-input" />
        <button onClick={fetchRichieste} className="btn btn-accent">Applica</button>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Ora</th>
              <th>Camera</th>
              <th>Reparto</th>
              <th>Operatore</th>
              <th>Richiesta</th>
              <th>Guest Service Agent</th>
              <th>Follow up Note</th>
              <th>Follow up GSA</th>
              <th>Follow up Time</th>
              <th>Modifica</th>
            </tr>
          </thead>
          <tbody>
            {filteredRichieste.map((r) => (
              <tr key={r.id}>
                <td>{r.data}</td>
                <td>{r.ora}</td>
                <td>{r.numeroCamera}</td>
                <td>{r.reparto}</td>
                <td>{r.operatoreTask}</td>
                <td>{r.richiesta}</td>
                <td>{r.operatoreguestservice}</td>
                <td>{r.follow_up || '-'}</td>
                <td>{r.follow_up_operator || '-'}</td>
                <td>{r.follow_up_time ? new Date(r.follow_up_time).toLocaleString() : '-'}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(r)}>✏️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedRequest && (
  <div className="popup-overlay">
    <div className="popup">
      <h2>Modifica Richiesta</h2>
      {['data','ora','numeroCamera','reparto','operatoreTask','richiesta','operatoreguestservice','follow_up','follow_up_operator','follow_up_time'].map(key => (
        <div className="form-group" key={key}>
          <label>{key}</label>
          <input
            type="text"
            name={key}
            value={selectedRequest[key] || ''}
            onChange={handleChangeSelected}
          />
        </div>
      ))}
      <div className="buttons">
        <button className="cancel-btn" onClick={handleCloseModal}>Annulla</button>
        <button className="save-btn"   onClick={handleSaveEdit}>Salva</button>
      </div>
    </div>
  </div>
)}   </div>
  );
}

export default function EsempioStile() {
    return (
      <div className="p-6 bg-[var(--hilton-light)] min-h-screen">
        <h1 className="text-3xl font-bold heading-hilton animate-fade-in mb-4">🌟 Esempio Stile Hilton</h1>
  
        <div className="card animate-fade-in">
          <h2 className="text-xl font-semibold mb-2">👋 Benvenuto</h2>
          <p>Questa è una card di esempio con la nuova grafica e animazione. Prova a passare il mouse sopra per vedere l’effetto!</p>
        </div>
  
        <div className="flex gap-4 mt-6">
          <button className="btn-primary">Pulsante Primario</button>
          <button className="btn-accent">Pulsante Accento</button>
        </div>
  
        <div className="mt-6 card animate-fade-in">
          <label className="block text-sm font-medium mb-1">Campo di Testo</label>
          <input type="text" placeholder="Inserisci qualcosa..." />
        </div>
      </div>
    );
  }
  
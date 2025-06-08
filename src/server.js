// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const { Configuration, OpenAIApi } = require('openai');

// Configura Supabase e OpenAI dai tuoi .env
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_KEY })
);

const app = express();
app.use(cors());
app.use(express.json());

// Qui importi (o copi) il tuo handler di statistiche:
app.post('/api/statistiche', async (req, res) => {
  try {
    // ...stessa logica che avevi in /api/statistiche.js...
    // 1) Preleva tutte le richieste da Supabase
    // 2) Costruisci il prompt, chiama OpenAI, ecc.
    // 3) Parsifica il JSON
    // 4) Rispondi con res.status(200).json({ stats })
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API in ascolto su http://localhost:${PORT}`);
});

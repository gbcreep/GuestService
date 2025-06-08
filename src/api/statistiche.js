// /api/statistiche.js
import { createClient } from "@supabase/supabase-js";
import { Configuration, OpenAIApi } from "openai";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_KEY })
);

export default async function handler(req, res) {
  try {
    // 1) Preleva tutte le richieste da supabase
    const { data: richieste, error } = await supabase
      .from("richieste")
      .select("richiesta");

    if (error) return res.status(500).json({ error: error.message });

    // 2) Costruisci prompt per OpenAI
    const prompt = `
Dati questi oggetti, raggruppali per tipo e conta quante volte appaiono. Restituisci un JSON:
${JSON.stringify(richieste.map((r) => r.richiesta))}
`;

    // 3) Chiama OpenAI
    const aiRes = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 300,
    });

    // 4) Parsifica output (ci si aspetta un JSON)
    const text = aiRes.data.choices[0].message.content;
    let stats;
    try {
      stats = JSON.parse(text);
    } catch {
      return res.status(500).json({ error: "Non ho ricevuto JSON valido da OpenAI" });
    }

    return res.status(200).json({ stats });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

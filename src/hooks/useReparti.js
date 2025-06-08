import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function useReparti() {
  const [reparti, setReparti] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReparti = async () => {
      const { data, error } = await supabase.from('reparti').select('*').order('nome', { ascending: true });
      if (!error) setReparti(data);
      setLoading(false);
    };
    fetchReparti();
  }, []);

  return { reparti, loading };
}

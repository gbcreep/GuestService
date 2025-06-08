import { useEffect } from 'react';
import supabase from "../supabaseClient";

export default function Notificatore() {
  const playBeep = () => {
    const audio = new Audio('/alert.mp3');
    audio.play();
  };

  const checkFollowUp = async () => {
    const { data, error } = await supabase
      .from('richieste')
      .select('id, data, ora, tempistica, follow_up');

    if (!error && data) {
      const now = new Date();
      const pending = data.filter((item) => {
        const datetime = new Date(item.data + 'T' + item.ora);
        datetime.setMinutes(datetime.getMinutes() + item.tempistica);
        return !item.follow_up && datetime <= now && !localStorage.getItem(`silenced_${item.id}`);
      });

      if (pending.length > 0) {
        playBeep();
      }
    }
  };

  useEffect(() => {
    checkFollowUp();
    const interval = setInterval(checkFollowUp, 30000);
    return () => clearInterval(interval);
  }, []);

  return null;
}

import { useState, useEffect } from 'react';
import { getAnnouncements, supabase } from '../services/supabase';

export const useAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const result = await getAnnouncements();
      if (result.success) {
        setAnnouncements(result.data || []);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();

    const subscription = supabase
      .on('postgres_changes', { event: '*', schema: 'public', table: 'anuncios' }, (payload) => {
        fetchAnnouncements();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { announcements, loading, error, refetch: fetchAnnouncements };
};

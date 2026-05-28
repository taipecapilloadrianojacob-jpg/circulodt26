import { useState, useEffect } from 'react';
import { getMembers, supabase } from '../services/supabase';

export const useMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const result = await getMembers();
      if (result.success) {
        setMembers(result.data || []);
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
    fetchMembers();

    const subscription = supabase
      .on('postgres_changes', { event: '*', schema: 'public', table: 'integrantes' }, (payload) => {
        fetchMembers();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { members, loading, error, refetch: fetchMembers };
};

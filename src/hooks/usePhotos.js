import { useState, useEffect } from 'react';
import { getPhotos, supabase } from '../services/supabase';

export const usePhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const result = await getPhotos();
      if (result.success) {
        setPhotos(result.data || []);
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
    fetchPhotos();

    // Subscribe to changes
    const subscription = supabase
      .on('postgres_changes', { event: '*', schema: 'public', table: 'fotos' }, (payload) => {
        fetchPhotos();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { photos, loading, error, refetch: fetchPhotos };
};

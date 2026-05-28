import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getAnnouncements, supabase } from '../services/supabase';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const Anuncios = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();

    const subscription = supabase
      .on('postgres_changes', { event: '*', schema: 'public', table: 'anuncios' }, () => {
        fetchAnnouncements();
      })
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from('anuncios')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) {
        setAnnouncements(data || []);
      }
    } catch (err) {
      console.error('Error fetching announcements:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      id="anuncios"
      className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-dark-card"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl lg:text-5xl font-bold text-white text-center mb-16"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Anuncios y <span className="text-primary-green">Avisos</span>
        </motion.h2>

        {loading ? (
          <div className="text-center text-gray-400">Cargando anuncios...</div>
        ) : announcements.length === 0 ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-xl text-gray-400">AÚN NO HAY ANUNCIOS PUBLICADOS.</p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {announcements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                className="bg-dark-bg rounded-xl p-6 lg:p-8 border border-primary-green/20 hover:border-primary-green/50 transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {announcement.image && (
                    <img
                      src={announcement.image}
                      alt={announcement.title}
                      className="w-full lg:w-48 h-48 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-bold text-white">{announcement.title}</h3>
                      {announcement.pinned && (
                        <span className="px-3 py-1 bg-primary-red text-white text-sm rounded-full">Fijado</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mb-4">
                      {format(new Date(announcement.created_at), 'd MMMM yyyy', { locale: es })}
                    </p>
                    <p className="text-gray-300 mb-4">{announcement.description}</p>
                    {announcement.category && (
                      <span className="inline-block px-3 py-1 bg-primary-green/20 text-primary-green text-sm rounded-full">
                        {announcement.category}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default Anuncios;

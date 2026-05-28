import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAnnouncements } from '../services/supabase';

const Anuncios = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setLoading(true);
    const result = await getAnnouncements();
    if (result.success) {
      setAnnouncements(result.data || []);
    }
    setLoading(false);
  };

  return (
    <section className="py-20 px-4 bg-dark-bg">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            ANUNCIOS Y AVISOS
          </h2>

          {announcements.length === 0 ? (
            <div className="text-center py-16 bg-dark-card rounded-2xl">
              <p className="text-gray-400 text-xl">AÚN NO HAY ANUNCIOS PUBLICADOS.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {announcements.map((announcement, idx) => (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-dark-card p-6 rounded-2xl shadow-lg hover:shadow-glow transition-all border-l-4 border-primary-green"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="inline-block px-3 py-1 bg-primary-green text-dark-bg text-xs font-bold rounded-full mb-3">
                        {announcement.categoria || 'General'}
                      </span>
                      <h3 className="text-2xl font-bold text-white">{announcement.titulo}</h3>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(announcement.created_at).toLocaleDateString('es-ES')}
                    </span>
                  </div>

                  {announcement.imagen && (
                    <img
                      src={announcement.imagen}
                      alt={announcement.titulo}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}

                  <p className="text-gray-300 leading-relaxed mb-4">{announcement.descripcion}</p>

                  <p className="text-sm text-gray-500">Por: {announcement.autor}</p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Anuncios;

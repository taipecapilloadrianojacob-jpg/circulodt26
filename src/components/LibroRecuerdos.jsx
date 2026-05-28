import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { addMemory, getMemories, deleteMemory, supabase } from '../services/supabase';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { FaTrash } from 'react-icons/fa';

const LibroRecuerdos = () => {
  const [memories, setMemories] = useState([]);
  const [message, setMessage] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setIsAdmin(localStorage.getItem('adminToken') === 'authenticated');
    fetchMemories();

    const subscription = supabase
      .on('postgres_changes', { event: '*', schema: 'public', table: 'libro_recuerdos' }, () => {
        fetchMemories();
      })
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  const fetchMemories = async () => {
    try {
      const { data, error } = await supabase
        .from('libro_recuerdos')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) {
        setMemories(data || []);
      }
    } catch (err) {
      console.error('Error fetching memories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || !author.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('libro_recuerdos')
        .insert([{
          message: message.trim(),
          author: author.trim(),
          created_at: new Date()
        }]);

      if (!error) {
        setMessage('');
        setAuthor('');
        fetchMemories();
      }
    } catch (err) {
      console.error('Error adding memory:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteMemory = async (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar este mensaje?')) {
      await deleteMemory(id);
      fetchMemories();
    }
  };

  return (
    <motion.section
      id="recuerdos"
      className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-dark-bg"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl lg:text-5xl font-bold text-white text-center mb-16"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Libro de <span className="text-primary-green">Recuerdos</span>
        </motion.h2>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-dark-card rounded-xl p-8 mb-12 border border-primary-green/20"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="mb-4">
            <input
              type="text"
              placeholder="Tu nombre"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-3 bg-dark-bg border border-primary-green/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-green transition mb-4"
              required
            />
            <textarea
              placeholder="Escribe tu mensaje..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              className="w-full px-4 py-3 bg-dark-bg border border-primary-green/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-green transition resize-none"
              required
            />
          </div>
          <motion.button
            type="submit"
            disabled={submitting}
            className="w-full px-6 py-3 bg-gradient-to-r from-primary-green to-primary-red hover:shadow-glow text-white font-bold rounded-lg transition disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {submitting ? 'Enviando...' : 'ENVIAR MENSAJE'}
          </motion.button>
        </motion.form>

        {/* Messages */}
        {loading ? (
          <div className="text-center text-gray-400">Cargando mensajes...</div>
        ) : memories.length === 0 ? (
          <div className="text-center text-gray-400">
            Aún no hay mensajes. ¡Sé el primero en dejar un recuerdo!
          </div>
        ) : (
          <div className="space-y-4">
            {memories.map((memory, index) => (
              <motion.div
                key={memory.id}
                className="bg-dark-card rounded-lg p-6 border border-primary-green/20 hover:border-primary-green/50 transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-bold text-primary-green">{memory.author}</h4>
                  {isAdmin && (
                    <button
                      onClick={() => handleDeleteMemory(memory.id)}
                      className="text-gray-400 hover:text-primary-red transition"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-400 mb-3">
                  {format(new Date(memory.created_at), 'd MMMM yyyy HH:mm', { locale: es })}
                </p>
                <p className="text-gray-300">{memory.message}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default LibroRecuerdos;

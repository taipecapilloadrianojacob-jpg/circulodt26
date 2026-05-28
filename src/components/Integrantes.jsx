import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getMembers, supabase } from '../services/supabase';

const Integrantes = () => {
  const [members, setMembers] = useState([
    { id: 1, nombre: 'Mateo', fecha_nacimiento: '23/07/2012', foto: 'https://via.placeholder.com/200' },
    { id: 2, nombre: 'Adriano', fecha_nacimiento: '30/11/2012', foto: 'https://via.placeholder.com/200' },
    { id: 3, nombre: 'Luhan', fecha_nacimiento: '07/11/2012', foto: 'https://via.placeholder.com/200' },
    { id: 4, nombre: 'Alizee', fecha_nacimiento: '20/03/2013', foto: 'https://via.placeholder.com/200' },
    { id: 5, nombre: 'Valentino', fecha_nacimiento: '09/10/2012', foto: 'https://via.placeholder.com/200' },
    { id: 6, nombre: 'Benjamin', fecha_nacimiento: '24/01/2013', foto: 'https://via.placeholder.com/200' },
    { id: 7, nombre: 'Mathias', fecha_nacimiento: '13/12/2012', foto: 'https://via.placeholder.com/200' },
    { id: 8, nombre: 'Joaquín Vásquez', fecha_nacimiento: '30/09/2012', foto: 'https://via.placeholder.com/200' },
    { id: 9, nombre: 'Priya', fecha_nacimiento: '16/01/2013', foto: 'https://via.placeholder.com/200' },
    { id: 10, nombre: 'Carlos Huamanciza', fecha_nacimiento: '20/09/2012', foto: 'https://via.placeholder.com/200' },
    { id: 11, nombre: 'Joaquín Cotera', fecha_nacimiento: '18/05/2012', foto: 'https://via.placeholder.com/200' },
    { id: 12, nombre: 'Jimena', fecha_nacimiento: '21/03/2013', foto: 'https://via.placeholder.com/200' },
    { id: 13, nombre: 'Roberto', fecha_nacimiento: '08/09/2012', foto: 'https://via.placeholder.com/200' },
    { id: 14, nombre: 'Marco', fecha_nacimiento: '20/10/2012', foto: 'https://via.placeholder.com/200' },
    { id: 15, nombre: 'Gabriela', fecha_nacimiento: '07/12/2012', foto: 'https://via.placeholder.com/200' },
    { id: 16, nombre: 'Olenka', fecha_nacimiento: '04/07/2012', foto: 'https://via.placeholder.com/200' },
    { id: 17, nombre: 'Rafael', fecha_nacimiento: '24/05/2013', foto: 'https://via.placeholder.com/200' },
    { id: 18, nombre: 'Gianfranco', fecha_nacimiento: '25/09/2013', foto: 'https://via.placeholder.com/200' },
    { id: 19, nombre: 'Dominick', fecha_nacimiento: '10/04/2013', foto: 'https://via.placeholder.com/200' },
    { id: 20, nombre: 'Valentina', fecha_nacimiento: '04/03/2013', foto: 'https://via.placeholder.com/200' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();

    const subscription = supabase
      .on('postgres_changes', { event: '*', schema: 'public', table: 'integrantes' }, () => {
        fetchMembers();
      })
      .subscribe();

    setLoading(false);
    return () => subscription.unsubscribe();
  }, []);

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('integrantes')
        .select('*')
        .order('nombre', { ascending: true });

      if (!error && data && data.length > 0) {
        setMembers(data);
      }
    } catch (err) {
      console.error('Error fetching members:', err);
    }
  };

  const filteredMembers = members.filter(member =>
    member.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.section
      id="integrantes"
      className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-dark-bg"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl lg:text-5xl font-bold text-white text-center mb-12"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Integrantes de <span className="text-primary-green">CÍRCULO DT</span>
        </motion.h2>

        {/* Search Bar */}
        <motion.div
          className="mb-12 max-w-md mx-auto"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <input
            type="text"
            placeholder="Buscar integrante..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-3 bg-dark-card border border-primary-green/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-green transition"
          />
        </motion.div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="bg-dark-card rounded-xl overflow-hidden hover:shadow-glow transition border border-primary-green/10 hover:border-primary-green/50"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <img
                src={member.foto || 'https://via.placeholder.com/200'}
                alt={member.nombre}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-white text-center">{member.nombre}</h3>
                <p className="text-sm text-gray-400 text-center">{member.fecha_nacimiento}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center text-gray-400 mt-8">
            No se encontraron integrantes con ese nombre.
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default Integrantes;

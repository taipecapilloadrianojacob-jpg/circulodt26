import { motion } from 'framer-motion';
import { FaTiktok } from 'react-icons/fa';

const Tutor = ({ image4 }) => {
  return (
    <motion.section
      id="tutor"
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
          Nuestro <span className="text-primary-green">Tutor</span>
        </motion.h2>

        <motion.div
          className="bg-gradient-to-r from-dark-bg to-dark-card rounded-2xl overflow-hidden shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
            {/* Image */}
            <motion.div
              className="flex items-center justify-center"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src={image4}
                alt="José Luis Lozada Trejo"
                className="w-full h-auto rounded-xl shadow-lg object-cover"
              />
            </motion.div>

            {/* Content */}
            <motion.div
              className="flex flex-col justify-center"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                JOSÉ LUIS LOZADA TREJO
              </h3>
              <p className="text-lg text-primary-green font-semibold mb-6">
                Tutor de CÍRCULO DT
              </p>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Nuestro tutor y guía durante nuestra etapa escolar, fomentando el respeto, la responsabilidad y el trabajo en equipo.
              </p>

              {/* Artistic Group Info */}
              <div className="bg-dark-bg/50 rounded-lg p-6 mb-8 border border-primary-green/20">
                <p className="text-white font-semibold mb-2">Agrupación Artística</p>
                <p className="text-gray-300 mb-4">
                  Dedicada al arte, teatro y espectáculos.
                </p>
                <motion.a
                  href="https://www.tiktok.com/@show.arte.teatro?_r=1&_t=ZS-96byRDiNAi9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-green to-primary-red hover:shadow-glow text-white font-bold rounded-lg transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTiktok className="text-xl" />
                  <span>VER TIKTOK</span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Tutor;

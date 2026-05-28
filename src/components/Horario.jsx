import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const Horario = ({ image3 }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image3;
    link.download = 'horario-circulo-dt.jpg';
    link.click();
  };

  return (
    <motion.section
      id="horario"
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
          Horario <span className="text-primary-green">Oficial</span>
        </motion.h2>

        <motion.div
          className="flex flex-col items-center"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="w-full max-w-4xl">
            <Zoom>
              <img
                src={image3}
                alt="Horario Oficial"
                className="w-full h-auto rounded-2xl shadow-2xl cursor-zoom-in"
              />
            </Zoom>
          </div>

          <motion.button
            onClick={handleDownload}
            className="mt-8 px-8 py-4 bg-gradient-to-r from-primary-red to-primary-green hover:shadow-glow text-white font-bold rounded-lg transition flex items-center space-x-2 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaDownload /> <span>DESCARGAR HORARIO</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Horario;

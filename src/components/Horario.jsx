import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiZoomIn } from 'react-icons/fi';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/img.css';

const Horario = ({ image }) => {
  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = image;
    link.download = 'horario-circulo-dt.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            HORARIO OFICIAL
          </h2>

          <div className="relative bg-dark-card p-6 rounded-2xl shadow-2xl">
            <Zoom>
              <img
                src={image}
                alt="Horario Oficial"
                className="w-full h-auto rounded-xl cursor-zoom-in hover:shadow-glow transition-shadow"
              />
            </Zoom>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadImage}
            className="mt-8 mx-auto flex items-center gap-2 px-6 py-3 bg-primary-red text-white font-bold rounded-lg hover:bg-red-600 transition-colors shadow-lg"
          >
            <FiDownload /> DESCARGAR
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Horario;

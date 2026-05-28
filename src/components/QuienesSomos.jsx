import React from 'react';
import { motion } from 'framer-motion';

const QuienesSomos = ({ image }) => {
  return (
    <section className="py-20 px-4 bg-dark-bg">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden md:block"
          >
            <img
              src={image}
              alt="Quiénes Somos"
              className="rounded-2xl shadow-2xl w-full h-auto object-cover"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ¿QUIÉNES SOMOS?
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed">
              CÍRCULO DT es un grupo de estudiantes de 1° y 2° de secundaria que comparte experiencias, actividades, aprendizajes y momentos importantes dentro del colegio.
            </p>

            <p className="text-gray-300 text-lg leading-relaxed">
              Nuestro objetivo es fortalecer la amistad, el respeto y el compañerismo entre todos los integrantes.
            </p>

            <div className="pt-4">
              <div className="w-20 h-1 bg-primary-green rounded-full"></div>
            </div>
          </motion.div>

          {/* Mobile Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:hidden"
          >
            <img
              src={image}
              alt="Quiénes Somos"
              className="rounded-2xl shadow-2xl w-full h-auto object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuienesSomos;

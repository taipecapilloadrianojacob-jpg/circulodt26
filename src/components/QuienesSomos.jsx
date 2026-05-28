import { motion } from 'framer-motion';

const QuienesSomos = ({ image2 }) => {
  return (
    <motion.section
      id="quienes-somos"
      className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-dark-bg"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image - Left */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src={image2}
              alt="¿Quiénes Somos?"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </motion.div>

          {/* Text - Right */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              ¿Quiénes <span className="text-primary-green">Somos?</span>
            </h2>
            <p className="text-lg text-gray-300 mb-4 leading-relaxed">
              CÍRCULO DT es un grupo de estudiantes de 1° y 2° de secundaria que comparte experiencias, actividades, aprendizajes y momentos importantes dentro del colegio.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Nuestro objetivo es fortalecer la amistad, el respeto y el compañerismo entre todos los integrantes.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default QuienesSomos;

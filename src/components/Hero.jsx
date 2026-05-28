import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

const Hero = ({ image1 }) => {
  return (
    <motion.section
      id="inicio"
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${image1})`,
        backgroundAttachment: 'fixed',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          CÍRCULO DT
        </motion.h1>

        <motion.p
          className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          "Un grupo de estudiantes unidos por la amistad, el respeto y los mejores recuerdos."
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Link
            to="quienes-somos"
            spy
            smooth
            offset={-60}
            className="inline-block px-8 py-4 bg-gradient-to-r from-primary-green to-primary-red hover:shadow-glow text-white font-bold rounded-lg transition cursor-pointer transform hover:scale-105"
          >
            CONOCE MÁS
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;

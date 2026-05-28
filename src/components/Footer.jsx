import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      className="bg-dark-bg border-t border-primary-green/20 py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h3
          className="text-2xl font-bold text-white mb-4"
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          CÍRCULO DT
        </motion.h3>
        <motion.p
          className="text-lg text-gray-300"
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          "Los mejores recuerdos se construyen junto a las mejores personas."
        </motion.p>
        <motion.p
          className="text-sm text-gray-500 mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          © 2026 CÍRCULO DT - I.E.P. Diego Thomson. Todos los derechos reservados.
        </motion.p>
      </div>
    </motion.footer>
  );
};

export default Footer;

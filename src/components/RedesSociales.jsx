import { motion } from 'framer-motion';
import { FaTiktok, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const RedesSociales = () => {
  const redes = [
    {
      name: 'TikTok',
      icon: FaTiktok,
      url: 'https://www.tiktok.com/@circulo.dt.2026',
      color: 'from-black to-black',
      bgColor: 'hover:bg-black',
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      url: 'https://www.instagram.com/circulo.dt',
      color: 'from-pink-600 to-yellow-500',
      bgColor: 'hover:bg-pink-600',
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      url: 'https://chat.whatsapp.com/GXVAWsbjnNSDN4v374tLdZ',
      color: 'from-green-500 to-green-600',
      bgColor: 'hover:bg-green-500',
    },
  ];

  return (
    <motion.section
      id="redes"
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
          Redes <span className="text-primary-green">Oficiales</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {redes.map((red, index) => {
            const Icon = red.icon;
            return (
              <motion.a
                key={index}
                href={red.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-gradient-to-r ${red.color} p-8 rounded-xl text-white font-bold text-center hover:shadow-lg transition transform hover:scale-105`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Icon className="text-5xl mx-auto mb-4" />
                <p className="text-xl">{red.name}</p>
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://chat.whatsapp.com/GXVAWsbjnNSDN4v374tLdZ"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaWhatsapp size={32} />
      </motion.a>
    </motion.section>
  );
};

export default RedesSociales;

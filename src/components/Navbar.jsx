import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Inicio', to: 'inicio' },
    { label: '¿Quiénes Somos?', to: 'quienes-somos' },
    { label: 'Horario', to: 'horario' },
    { label: 'Galería', to: 'galeria' },
    { label: 'Anuncios', to: 'anuncios' },
    { label: 'Integrantes', to: 'integrantes' },
    { label: 'Tutor', to: 'tutor' },
    { label: 'Recuerdos', to: 'recuerdos' },
    { label: 'Redes', to: 'redes' },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 bg-dark-bg/80 backdrop-blur-md border-b border-primary-green/20 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="inicio"
            spy
            smooth
            className="cursor-pointer flex items-center space-x-2 text-white font-bold text-xl hover:text-primary-green transition"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-primary-green to-primary-red rounded-lg"></div>
            <span>CÍRCULO DT</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-1">
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                spy
                smooth
                offset={-60}
                className="px-3 py-2 text-sm text-gray-300 hover:text-primary-green transition cursor-pointer"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            className="lg:hidden pb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                spy
                smooth
                offset={-60}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-gray-300 hover:text-primary-green transition cursor-pointer"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;

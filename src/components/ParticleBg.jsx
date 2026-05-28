import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const ParticleBg = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-primary-green rounded-full opacity-20"
          style={{
            top: `${particle.top}%`,
            left: `${particle.left}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4,
            delay: particle.delay,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBg;

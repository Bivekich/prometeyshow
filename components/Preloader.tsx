'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Preloader = () => {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative w-24 h-24"
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-t-4 border-red-500 rounded-full animate-spin" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-t-4 border-orange-500 rounded-full animate-spin-slow" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-t-4 border-yellow-500 rounded-full animate-spin-slower" />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 text-center"
        >
          <h2 className="text-2xl font-bold text-white">Прометей</h2>
          <p className="text-sm text-gray-400 mt-2">Театр огня</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Preloader;

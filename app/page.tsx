'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import VideoBanner from '@/components/sections/VideoBanner';
import CompanyIntro from '@/components/sections/CompanyIntro';
import Services from '@/components/sections/Services';
import Statistics from '@/components/sections/Statistics';
import UpcomingEvents from '@/components/sections/UpcomingEvents';
import ContactForm from '@/components/sections/ContactForm';

// Динамический импорт прелоадера для избежания проблем с SSR
const Preloader = dynamic(() => import('@/components/Preloader'), {
  ssr: false,
});

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  if (!mounted) return null;

  return (
    <Suspense fallback={null}>
      <AnimatePresence>{isLoading && <Preloader />}</AnimatePresence>

      <motion.main
        className="min-h-screen"
        initial="hidden"
        animate={!isLoading ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <VideoBanner />
        </motion.div>

        <motion.div variants={itemVariants}>
          <CompanyIntro />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Services />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Statistics />
        </motion.div>

        <motion.div variants={itemVariants}>
          <UpcomingEvents />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ContactForm />
        </motion.div>
      </motion.main>
    </Suspense>
  );
}

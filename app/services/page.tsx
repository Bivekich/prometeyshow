'use client';

import { motion } from 'framer-motion';
import FireShow from '@/components/sections/services/FireShow';
import PyroShow from '@/components/sections/services/PyroShow';
import SpecialOffers from '@/components/sections/services/SpecialOffers';
import PriceList from '@/components/sections/services/PriceList';

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black pt-20">
      {/* Заголовок страницы */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Наши услуги
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Профессиональные огненные и пиротехнические шоу для любых
              мероприятий
            </p>
          </motion.div>
        </div>
      </section>

      {/* Основные секции */}
      <FireShow />
      <PyroShow />
      <SpecialOffers />
      <PriceList />
    </main>
  );
}

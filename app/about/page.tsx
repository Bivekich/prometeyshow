'use client';

import { motion } from 'framer-motion';
import History from '@/components/sections/about/History';
import Team from '@/components/sections/about/Team';
import Achievements from '@/components/sections/about/Achievements';
import Reviews from '@/components/sections/about/Reviews';
import Gallery from '@/components/sections/about/Gallery';

export default function AboutPage() {
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
              О театре огня &ldquo;Прометей&rdquo;
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Мы создаем незабываемые огненные шоу, которые покоряют сердца
              зрителей и делают каждое мероприятие особенным
            </p>
          </motion.div>
        </div>
      </section>

      {/* Основные секции */}
      <History />
      <Team />
      <Achievements />
      <Reviews />
      <Gallery />
    </main>
  );
}

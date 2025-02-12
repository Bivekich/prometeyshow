'use client';

import { motion } from 'framer-motion';
import ContactForm from '@/components/sections/contacts/ContactForm';
import WorkingCities from '@/components/sections/contacts/WorkingCities';
import ContactInfo from '@/components/sections/contacts/ContactInfo';
import FAQ from '@/components/sections/contacts/FAQ';

export default function ContactsPage() {
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
              Контакты
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Свяжитесь с нами для обсуждения вашего мероприятия или получения
              дополнительной информации
            </p>
          </motion.div>
        </div>
      </section>

      {/* Основные секции */}
      <ContactInfo />
      <WorkingCities />
      <ContactForm />
      <FAQ />
    </main>
  );
}

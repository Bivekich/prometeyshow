'use client';

import { motion } from 'framer-motion';
import { PageHeader as PageHeaderType } from '@/types/schema';

interface PageHeaderProps {
  data?: PageHeaderType;
}

export default function PageHeader({ data }: PageHeaderProps) {
  // Fallback данные на случай если data не передан
  const headerData = data || {
    title: 'Контакты',
    description: 'Свяжитесь с нами для заказа незабываемого шоу'
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {headerData.title}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {headerData.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
} 
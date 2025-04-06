'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReviewsProps {
  vkGroupUrl: string;
}

export default function Reviews({ vkGroupUrl }: ReviewsProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
            Отзывы клиентов
          </h2>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12">
            Ознакомьтесь с отзывами наших клиентов в нашей группе ВКонтакте
          </p>

          <div className="max-w-4xl mx-auto text-center">
            <Button
              variant="default"
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md text-lg inline-flex items-center gap-2"
              onClick={() => window.open(vkGroupUrl, '_blank')}
            >
              <span>Перейти в группу ВКонтакте</span>
              <ExternalLink className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

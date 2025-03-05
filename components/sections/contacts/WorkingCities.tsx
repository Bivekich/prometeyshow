'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { WorkingCity } from '@/types/schema';

interface WorkingCitiesProps {
  cities: WorkingCity[];
}

export default function WorkingCities({ cities }: WorkingCitiesProps) {
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
            Города, где мы работаем
          </h2>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12">
            Организуем выступления по всей России. Готовы к выездным
            мероприятиям в любой город
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map((city, index) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gray-900 border-gray-800 hover:border-red-500/50 transition-colors duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">
                          {city.name}
                        </h3>
                        <p className="text-gray-400 mb-3">{city.description}</p>
                        <p className="text-red-500 font-medium">
                          {city.performances}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400">
              Не нашли свой город? Свяжитесь с нами - мы организуем выступление
              в любой точке России
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

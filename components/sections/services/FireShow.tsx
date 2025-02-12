'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';
import { Flame, Clock, Users, Sparkles } from 'lucide-react';

const features = [
  {
    title: 'Сольные выступления',
    description: 'Впечатляющие номера от профессиональных артистов',
    icon: Flame,
    duration: '5-7 минут',
    performers: '1 артист',
  },
  {
    title: 'Групповые программы',
    description: 'Синхронные выступления команды артистов',
    icon: Users,
    duration: '7-15 минут',
    performers: '2-6 артистов',
  },
  {
    title: 'Интерактивные шоу',
    description: 'Вовлечение зрителей в представление',
    icon: Sparkles,
    duration: '15-20 минут',
    performers: '2-4 артиста',
  },
];

const FireShow = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
            Огненное шоу
          </h2>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12">
            Яркие и безопасные выступления с использованием огня, создающие
            незабываемую атмосферу на вашем мероприятии
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gray-900 border-gray-800 h-full hover:border-red-500/50 transition-colors duration-300">
                  <CardContent className="p-6">
                    <feature.icon className="w-12 h-12 text-red-500 mb-6" />
                    <h3 className="text-xl font-bold text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 mb-6">{feature.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-400">
                        <Clock className="w-5 h-5 mr-2" />
                        <span>{feature.duration}</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Users className="w-5 h-5 mr-2" />
                        <span>{feature.performers}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Галерея изображений */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
            {[1, 2, 3].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
                }
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-video rounded-lg overflow-hidden"
              >
                <img
                  src={`/images/services/fire-show-${index}.jpg`}
                  alt={`Огненное шоу ${index}`}
                  className="object-cover w-full h-full"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FireShow;

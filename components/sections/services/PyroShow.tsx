'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Zap, Target, Star, Clock } from 'lucide-react';

const features = [
  {
    title: 'Высотный фейерверк',
    description: 'Красочные пиротехнические эффекты в небе',
    icon: Sparkles,
    height: 'до 100 метров',
    duration: '3-7 минут',
  },
  {
    title: 'Наземный фейерверк',
    description: 'Эффектные пиротехнические инсталляции',
    icon: Zap,
    height: 'до 30 метров',
    duration: '3-5 минут',
  },
  {
    title: 'Комбинированное шоу',
    description: 'Сочетание высотных и наземных эффектов',
    icon: Star,
    height: 'до 100 метров',
    duration: '5-10 минут',
  },
];

const PyroShow = () => {
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
            Пиротехническое шоу
          </h2>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12">
            Профессиональные фейерверки и пиротехнические инсталляции для ваших
            мероприятий на открытом воздухе
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
                        <Target className="w-5 h-5 mr-2" />
                        <span>{feature.height}</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Clock className="w-5 h-5 mr-2" />
                        <span>{feature.duration}</span>
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
                  src={`/images/services/pyro-show-${index}.jpg`}
                  alt={`Пиротехническое шоу ${index}`}
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

export default PyroShow;

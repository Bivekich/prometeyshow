'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, PartyPopper, Building, Calendar } from 'lucide-react';

const offers = [
  {
    title: 'Свадебное шоу',
    description:
      'Особая программа для вашего торжества с романтическими элементами и специальными эффектами',
    icon: Heart,
    features: [
      'Огненные сердца',
      'Пиротехнические фонтаны',
      'Финальный фейерверк',
    ],
  },
  {
    title: 'Корпоративные мероприятия',
    description:
      'Масштабные шоу-программы для корпоративных праздников и бизнес-событий',
    icon: Building,
    features: [
      'Брендированные элементы',
      'Логотип компании из огня',
      'Комбинированное шоу',
    ],
  },
  {
    title: 'Городские праздники',
    description:
      'Яркие представления для массовых мероприятий и городских фестивалей',
    icon: PartyPopper,
    features: [
      'Массовые представления',
      'Высотные фейерверки',
      'Интерактивные элементы',
    ],
  },
  {
    title: 'Сезонные предложения',
    description:
      'Специальные программы для новогодних, рождественских и других праздников',
    icon: Calendar,
    features: [
      'Тематическое оформление',
      'Сезонные элементы',
      'Праздничные эффекты',
    ],
  },
];

const SpecialOffers = () => {
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
            Специальные предложения
          </h2>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12">
            Уникальные программы для различных мероприятий и праздников
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offers.map((offer, index) => (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gray-900 border-gray-800 h-full hover:border-red-500/50 transition-colors duration-300">
                  <CardHeader>
                    <offer.icon className="w-12 h-12 text-red-500 mb-4" />
                    <CardTitle className="text-xl text-white">
                      {offer.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 mb-6">{offer.description}</p>
                    <ul className="space-y-2">
                      {offer.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center text-gray-400"
                        >
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialOffers;

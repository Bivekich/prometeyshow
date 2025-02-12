'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  TagIcon,
} from '@heroicons/react/24/outline';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: 'public' | 'private';
  typeLabel: string;
}

const upcomingEvents: Event[] = [
  {
    id: 1,
    title: 'Огненное шоу на площади',
    date: '15 марта 2024',
    time: '20:00',
    location: 'Центральная площадь',
    description: 'Грандиозное огненное представление под открытым небом',
    type: 'public',
    typeLabel: 'Городское мероприятие',
  },
  {
    id: 2,
    title: 'Фестиваль света и огня',
    date: '22 марта 2024',
    time: '21:00',
    location: 'Парк культуры',
    description:
      'Масштабное шоу с использованием пиротехники и световых эффектов',
    type: 'public',
    typeLabel: 'Городской фестиваль',
  },
  {
    id: 3,
    title: 'Пиротехническое шоу',
    date: '29 марта 2024',
    time: '22:00',
    location: 'Набережная',
    description: 'Яркое пиротехническое представление у воды',
    type: 'public',
    typeLabel: 'Городское мероприятие',
  },
];

const UpcomingEvents = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ближайшие выступления
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Публичные мероприятия, на которых вы можете увидеть наши
              выступления. Для заказа индивидуального шоу свяжитесь с нами через
              форму ниже.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gray-900 border-gray-800 h-full hover:border-red-500/50 transition-colors duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">
                      {event.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center text-gray-400">
                        <TagIcon className="h-5 w-5 mr-2" />
                        <span className="text-red-400">{event.typeLabel}</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <CalendarIcon className="h-5 w-5 mr-2" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <ClockIcon className="h-5 w-5 mr-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <MapPinIcon className="h-5 w-5 mr-2" />
                        <span>{event.location}</span>
                      </div>
                      <p className="text-gray-400 mt-4">{event.description}</p>
                      {event.type === 'public' && (
                        <p className="text-sm text-gray-500 mt-4 italic">
                          Вход свободный
                        </p>
                      )}
                    </div>
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

export default UpcomingEvents;

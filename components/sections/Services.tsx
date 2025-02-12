'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const services = [
  {
    title: 'Огненное шоу',
    description:
      'Захватывающие выступления с использованием огня и различных огненных инструментов. Профессиональные артисты создадут незабываемое представление',
    image: '/images/fire-show.jpg',
  },
  {
    title: 'Пиротехническое шоу',
    description:
      'Профессиональные фейерверки и пиротехнические инсталляции любой сложности для ваших мероприятий на открытом воздухе',
    image: '/images/pyro-show.jpg',
  },
  {
    title: 'Огненные спецэффекты',
    description:
      'Огненные установки, огненные надписи, огненные стены и другие спецэффекты для создания впечатляющего шоу',
    image: '/images/fire-effects.jpg',
  },
  {
    title: 'Тематические программы',
    description:
      'Индивидуальные программы для свадеб, корпоративов, дней рождения и других праздников с учетом ваших пожеланий',
    image: '/images/themed-show.jpg',
  },
];

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-6">
            Наши услуги
          </h2>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12">
            Создаем яркие и безопасные огненные шоу для любых мероприятий. Все
            выступления проводятся профессиональными артистами с соблюдением
            норм безопасности
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gray-900 border-gray-800 hover:border-red-500 transition-all duration-300">
                  <CardHeader>
                    <div className="relative h-48 w-full mb-4 overflow-hidden rounded-t-lg">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="object-cover w-full h-full transform hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardTitle className="text-xl text-white">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400">
                      {service.description}
                    </CardDescription>
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

export default Services;

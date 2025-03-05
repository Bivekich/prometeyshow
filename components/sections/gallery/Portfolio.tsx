'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { PortfolioItem } from '@/types/schema';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface PortfolioProps {
  items: PortfolioItem[];
}

const Portfolio = ({ items }: PortfolioProps) => {
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
            Портфолио выступлений
          </h2>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12">
            Наши самые яркие и масштабные проекты
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gray-900 border-gray-800 overflow-hidden hover:border-red-500/50 transition-colors duration-300">
                  <div className="relative h-64">
                    <Image
                      src={item.image.asset.url}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                      {format(new Date(item.date), 'LLLL yyyy', { locale: ru })}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-white">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 mb-6">{item.description}</p>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-red-500 font-bold">
                          {item.stats.viewers}
                        </p>
                        <p className="text-gray-400 text-sm">Зрителей</p>
                      </div>
                      <div>
                        <p className="text-red-500 font-bold">
                          {item.stats.duration}
                        </p>
                        <p className="text-gray-400 text-sm">
                          Продолжительность
                        </p>
                      </div>
                      <div>
                        <p className="text-red-500 font-bold">
                          {item.stats.artists}
                        </p>
                        <p className="text-gray-400 text-sm">Артистов</p>
                      </div>
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

export default Portfolio;

'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const categories = [
  {
    name: 'Все статьи',
    count: 12,
  },
  {
    name: 'Новости',
    count: 4,
  },
  {
    name: 'Советы',
    count: 3,
  },
  {
    name: 'Безопасность',
    count: 2,
  },
  {
    name: 'Тренды',
    count: 2,
  },
  {
    name: 'Мероприятия',
    count: 1,
  },
];

const Categories = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-xl text-white">Категории</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="space-y-2"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.name}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-800 transition-colors text-left"
            >
              <span className="text-gray-300 hover:text-white transition-colors">
                {category.name}
              </span>
              <span className="text-gray-500 text-sm">{category.count}</span>
            </motion.button>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default Categories;

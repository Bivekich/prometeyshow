'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { BlogCategory } from '@/types/schema';

interface CategoriesProps {
  categories: (BlogCategory & { count?: number })[]
}

export default function Categories({ categories }: CategoriesProps) {
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
            <motion.div
              key={category.slug.current}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/blog/category/${category.slug.current}`}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-800 transition-colors text-left"
              >
                <span className="text-gray-300 hover:text-white transition-colors">
                  {category.name}
                </span>
                {category.count !== undefined && (
                  <span className="text-gray-500 text-sm">{category.count}</span>
                )}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
}

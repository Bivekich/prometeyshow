'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

interface StatItem {
  label: string;
  value: number;
  suffix: string;
}

const stats: StatItem[] = [
  { label: 'Проведено шоу', value: 1000, suffix: '+' },
  { label: 'Довольных клиентов', value: 500, suffix: '+' },
  { label: 'Городов России', value: 25, suffix: '' },
  { label: 'Лет опыта', value: 8, suffix: '+' },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    if (inView) {
      const duration = 2000;
      const steps = 50;
      const stepValue = value / steps;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        if (currentStep < steps) {
          setCount(Math.ceil(stepValue * (currentStep + 1)));
          currentStep++;
        } else {
          clearInterval(timer);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <span ref={ref} className="text-5xl md:text-6xl font-bold text-red-500">
      {count}
      {suffix}
    </span>
  );
};

const Statistics = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-gray-900 rounded-lg"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="text-lg text-gray-400 mt-4">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;

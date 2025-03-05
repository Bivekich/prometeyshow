'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CompanyIntro as CompanyIntroType } from '@/types/schema';

interface CompanyIntroProps {
  data: CompanyIntroType;
}

const CompanyIntro = ({ data }: CompanyIntroProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            {data.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            {data.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.features.map((feature, index) => (
              <div key={index} className="p-6 bg-gray-900 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyIntro;

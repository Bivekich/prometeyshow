'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CompanyIntro = () => {
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
            О нашей компании
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Театр огня "Прометей" - это команда профессиональных артистов,
            создающих незабываемые огненные шоу с 2015 года. Мы специализируемся
            на проведении ярких и безопасных выступлений для любых мероприятий.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 bg-gray-900 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Опыт</h3>
              <p className="text-gray-400">Более 8 лет в сфере огненных шоу</p>
            </div>
            <div className="p-6 bg-gray-900 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Безопасность</h3>
              <p className="text-gray-400">
                Сертифицированное оборудование и страховка
              </p>
            </div>
            <div className="p-6 bg-gray-900 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Профессионализм</h3>
              <p className="text-gray-400">Команда опытных артистов</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyIntro;

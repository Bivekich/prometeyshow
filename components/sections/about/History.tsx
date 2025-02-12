'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const milestones = [
  {
    year: '2015',
    title: 'Основание театра',
    description:
      'Группа энтузиастов объединилась, чтобы создать уникальные огненные представления',
  },
  {
    year: '2016',
    title: 'Первые городские мероприятия',
    description:
      'Начало выступлений на крупных городских праздниках и фестивалях',
  },
  {
    year: '2018',
    title: 'Расширение команды',
    description: 'К нам присоединились новые талантливые артисты и техники',
  },
  {
    year: '2020',
    title: 'Новые программы',
    description:
      'Разработка и запуск инновационных программ с использованием современных технологий',
  },
  {
    year: '2023',
    title: 'Признание в индустрии',
    description:
      'Получение наград и признания как одного из ведущих огненных шоу России',
  },
];

const History = () => {
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
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            История театра
          </h2>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={
                  inView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }
                }
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative flex items-center"
              >
                {/* Линия времени */}
                <div className="absolute left-0 w-px h-full bg-red-500/20" />

                {/* Год */}
                <div className="absolute left-0 w-12 h-12 -translate-x-1/2 bg-gray-900 border-2 border-red-500 rounded-full flex items-center justify-center">
                  <span className="text-red-500 font-bold">
                    {milestone.year}
                  </span>
                </div>

                {/* Контент */}
                <div className="ml-12 bg-gray-900/50 p-6 rounded-lg w-full">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-400">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-400">
              Сегодня театр огня &ldquo;Прометей&rdquo; - это команда
              профессионалов, создающих незабываемые шоу для тысяч зрителей по
              всей России. Мы продолжаем развиваться и совершенствовать наше
              мастерство, чтобы дарить вам самые яркие эмоции.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default History;

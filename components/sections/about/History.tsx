'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { HistoryEvent } from '@/types/schema';

interface HistoryProps {
  events: HistoryEvent[];
}

const History = ({ events }: HistoryProps) => {
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
            {events.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={
                  inView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }
                }
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative flex items-center"
              >
                {/* Timeline */}
                <div className="absolute left-0 w-px h-full bg-red-500/20" />

                {/* Year */}
                <div className="absolute left-0 w-12 h-12 -translate-x-1/2 bg-gray-900 border-2 border-red-500 rounded-full flex items-center justify-center">
                  <span className="text-red-500 font-bold">
                    {event.year}
                  </span>
                </div>

                {/* Content */}
                <div className="ml-16 bg-gray-900/50 p-6 rounded-lg border border-gray-800 hover:border-red-500/50 transition-all duration-300 w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className={event.image?.asset?.url ? "" : "md:col-span-2"}>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-400">{event.description}</p>
                    </div>
                    {event.image?.asset?.url && (
                      <div className="relative aspect-video rounded-lg overflow-hidden">
                        <Image
                          src={event.image.asset.url}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
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

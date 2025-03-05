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
import { UpcomingEvent } from '@/types/schema';

interface UpcomingEventsProps {
  events: UpcomingEvent[];
  sectionData: {
    title: string;
    description: string;
  };
}

const UpcomingEvents = ({ events, sectionData }: UpcomingEventsProps) => {
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
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-6">
            {sectionData.title}
          </h2>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12">
            {sectionData.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gray-900 border-gray-800 hover:border-red-500 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-500">
                        <TagIcon className="w-4 h-4 mr-1" />
                        {event.typeLabel}
                      </span>
                    </div>
                    <CardTitle className="text-xl text-white">
                      {event.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-400">{event.description}</p>
                    <div className="space-y-2 text-sm text-gray-400">
                      <div className="flex items-center">
                        <CalendarIcon className="w-5 h-5 mr-2" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="w-5 h-5 mr-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPinIcon className="w-5 h-5 mr-2" />
                        <span>{event.location}</span>
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

export default UpcomingEvents;

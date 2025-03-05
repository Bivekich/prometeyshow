'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Review } from '@/types/schema';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';

interface ReviewsProps {
  reviews: Review[];
}

export default function Reviews({ reviews }: ReviewsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
            Отзывы клиентов
          </h2>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12">
            Что говорят о нас наши клиенты и партнеры
          </p>

          <div className="max-w-4xl mx-auto relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-900/50 rounded-lg p-8 md:p-12"
              >
                <Quote className="w-12 h-12 text-red-500/20 mb-6" />
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                    {reviews[currentIndex].avatar?.asset?.url && (
                      <Image
                        src={reviews[currentIndex].avatar.asset.url}
                        alt={reviews[currentIndex].author}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-gray-300 text-lg mb-6">
                      {reviews[currentIndex].content}
                    </p>
                    <div>
                      <p className="text-white font-bold">
                        {reviews[currentIndex].author}
                      </p>
                      <p className="text-red-500">
                        {reviews[currentIndex].role}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        {formatDate(reviews[currentIndex].date)}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevious}
                className="bg-gray-900 border-gray-800 hover:bg-gray-800 text-white hover:text-red-500 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                className="bg-gray-900 border-gray-800 hover:bg-gray-800 text-white hover:text-red-500 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-red-500' : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

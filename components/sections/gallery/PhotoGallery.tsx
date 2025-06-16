'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { GalleryPhoto } from '@/types/schema';
import { urlFor } from '@/lib/sanity';

const categories = ['Все', 'Городские мероприятия', 'Свадьбы', 'Пиротехника'];

interface PhotoGalleryProps {
  photos: GalleryPhoto[];
}

const PhotoGallery = ({ photos }: PhotoGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredPhotos = photos.filter(
    (photo) => selectedCategory === 'Все' || photo.category === selectedCategory
  );

  const handlePrevious = () => {
    setSelectedImage((prev) =>
      prev === 0 ? filteredPhotos.length - 1 : prev! - 1
    );
  };

  const handleNext = () => {
    setSelectedImage((prev) =>
      prev === filteredPhotos.length - 1 ? 0 : prev! + 1
    );
  };

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
            Фотогалерея
          </h2>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12">
            Яркие моменты наших выступлений, запечатленные на фотографиях
          </p>

          {/* Фильтр категорий */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Сетка фотографий */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
                }
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-square cursor-pointer group"
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={urlFor(photo.image).url()}
                  alt={photo.alt}
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                  <div className="text-center p-4">
                    <p className="text-white font-medium mb-2">{photo.alt}</p>
                    <span className="text-red-500 text-sm">
                      {photo.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Модальное окно для просмотра */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-red-500 transition-colors"
              onClick={handlePrevious}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-red-500 transition-colors"
              onClick={handleNext}
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-[80vh] w-full"
            >
              <div className="relative w-full h-[calc(80vh-80px)]">
                <Image
                  src={urlFor(filteredPhotos[selectedImage].image).url()}
                  alt={filteredPhotos[selectedImage].alt}
                  fill
                  className="object-contain z-10"
                />
              </div>
              <div className="mt-2 p-4 bg-black/50 text-white text-center">
                <p className="font-medium mb-1">
                  {filteredPhotos[selectedImage].alt}
                </p>
                <span className="text-red-500 text-sm">
                  {filteredPhotos[selectedImage].category}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoGallery;

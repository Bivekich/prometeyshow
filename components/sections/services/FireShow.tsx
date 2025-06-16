'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';
import { Service, PriceListItem } from '@/types/schema';
import { Flame, Clock, Users, Sparkles, Star, Target, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { urlFor } from '@/lib/sanity';

interface FireShowProps {
  services: Service[];
  prices: PriceListItem[];
}

const iconMap: Record<string, React.ComponentType> = {
  'Sparkles': Sparkles,
  'Star': Star,
  'Target': Target,
};

interface ImageSliderProps {
  images: Service['images'];
}

const ImageSlider = ({ images }: ImageSliderProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      <div className="relative aspect-video rounded-lg overflow-hidden mt-6">
        <Image
          src={urlFor(images[currentImageIndex]).url()}
          alt="Огненное шоу"
          fill
          className="object-cover cursor-pointer"
          onClick={() => setSelectedImage(urlFor(images[currentImageIndex]).url())}
        />
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-1.5 rounded-full hover:bg-black/75 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-1.5 rounded-full hover:bg-black/75 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex justify-center mt-2 gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                index === currentImageIndex ? 'bg-red-500' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      )}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] m-4">
            <Image
              src={selectedImage}
              alt="Огненное шоу"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default function FireShow({ services }: FireShowProps) {
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
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
            Огненное шоу
          </h2>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12">
            Яркие и безопасные выступления с использованием огня, создающие
            незабываемую атмосферу на вашем мероприятии
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon ? iconMap[service.icon] : Sparkles;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-gray-900 border-gray-800 h-full hover:border-red-500/50 transition-colors duration-300">
                    <CardContent className="p-6">
                      {Icon && <Icon className="w-12 h-12 text-red-500 mb-6" />}
                      <h3 className="text-xl font-bold text-white mb-4">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 mb-6">{service.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-400">
                          <Clock className="w-5 h-5 mr-2" />
                          <span>{service.duration}</span>
                        </div>
                        {service.performers && (
                          <div className="flex items-center text-gray-400">
                            <Users className="w-5 h-5 mr-2" />
                            <span>{service.performers}</span>
                          </div>
                        )}
                      </div>
                      <ImageSlider images={service.images} />
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

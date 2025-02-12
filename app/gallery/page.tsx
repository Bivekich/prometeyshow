'use client';

import { motion } from 'framer-motion';
import PhotoGallery from '@/components/sections/gallery/PhotoGallery';
import VideoGallery from '@/components/sections/gallery/VideoGallery';
import Portfolio from '@/components/sections/gallery/Portfolio';

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-black pt-20">
      {/* Заголовок страницы */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Галерея
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Коллекция наших лучших выступлений, фотографий и видео
            </p>
          </motion.div>
        </div>
      </section>

      {/* Основные секции */}
      <PhotoGallery />
      <VideoGallery />
      <Portfolio />
    </main>
  );
}

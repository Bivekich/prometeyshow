'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, Play } from 'lucide-react';
import ReactPlayer from 'react-player';

const videos = [
  {
    url: '/videos/show-1.mp4',
    thumbnail: '/images/gallery/video-thumb-1.jpg',
    title: 'Огненное шоу на Дворцовой площади',
    description: 'Выступление на День города',
  },
  {
    url: '/videos/show-2.mp4',
    thumbnail: '/images/gallery/video-thumb-2.jpg',
    title: 'Пиротехническое шоу',
    description: 'Новогодний фейерверк',
  },
  // Добавьте больше видео
];

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
            Видеогалерея
          </h2>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12">
            Видеозаписи наших лучших выступлений и шоу-программ
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <motion.div
                key={video.url}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-video cursor-pointer group"
                onClick={() => setSelectedVideo(index)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-white font-medium mb-2">
                      {video.title}
                    </h3>
                    <p className="text-gray-300 text-sm">{video.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Модальное окно для просмотра видео */}
      <AnimatePresence>
        {selectedVideo !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors"
              onClick={() => setSelectedVideo(null)}
            >
              <X className="w-8 h-8" />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl aspect-video"
            >
              <ReactPlayer
                url={videos[selectedVideo].url}
                width="100%"
                height="100%"
                controls
                playing
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoGallery;

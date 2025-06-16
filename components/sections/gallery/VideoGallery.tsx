'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, Play } from 'lucide-react';
import Image from 'next/image';
import { GalleryVideo } from '@/types/schema';
import { urlFor } from '@/lib/sanity';

interface VideoGalleryProps {
  videos: GalleryVideo[];
}

const VideoGallery = ({ videos }: VideoGalleryProps) => {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-video cursor-pointer group"
                onClick={() => setSelectedVideo(index)}
              >
                <Image
                  src={urlFor(video.thumbnail).url()}
                  alt={video.title}
                  fill
                  className="object-cover rounded-lg"
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
              {isMounted && (
                <div className="relative w-full h-full">
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
                    </div>
                  )}
                  {error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <div className="text-white text-center p-4">
                        <p className="text-red-500 mb-2">
                          Ошибка загрузки видео
                        </p>
                        <button
                          onClick={() => {
                            setError(null);
                            setIsLoading(true);
                          }}
                          className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors"
                        >
                          Попробовать снова
                        </button>
                      </div>
                    </div>
                  )}
                  <video
                    src={
                      videos[selectedVideo].videoFile?.url ||
                      videos[selectedVideo].videoUrl
                    }
                    controls
                    autoPlay
                    className="w-full h-full rounded-lg"
                    onLoadStart={() => setIsLoading(true)}
                    onLoadedData={() => setIsLoading(false)}
                    onError={(e) => {
                      console.error('Video loading error:', e);
                      setError('Не удалось загрузить видео');
                      setIsLoading(false);
                    }}
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoGallery;

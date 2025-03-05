'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { useModal } from '@/contexts/ModalContext';
import { VideoBanner as VideoBannerType } from '@/types/schema';
import { useEffect, useState } from 'react';

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
});

interface VideoBannerProps {
  data: VideoBannerType;
}

const VideoBanner = ({ data }: VideoBannerProps) => {
  const { openOrderModal } = useModal();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="absolute inset-0">
        {isMounted && (
          <ReactPlayer
            url={data.videoUrl.asset.url}
            playing
            loop
            muted
            width="100%"
            height="100%"
            playsinline
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            config={{
              file: {
                attributes: {
                  style: {
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  },
                },
              },
            }}
          />
        )}
      </div>

      <motion.div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          {data.title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
          {data.subtitle}
        </p>
        <Button
          size="lg"
          className="bg-red-600 hover:bg-red-700 text-white"
          onClick={openOrderModal}
        >
          Заказать шоу
        </Button>
      </motion.div>
    </div>
  );
};

export default VideoBanner;

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Галерея - Фото и видео наших выступлений',
  description:
    'Галерея фото и видео выступлений театра огня "Прометей". Яркие моменты огненных шоу, фейерверков и пиротехнических представлений.',
  keywords: [
    'галерея',
    'фото огненного шоу',
    'видео фаер шоу',
    'фотографии выступлений',
    'видео фейерверков',
    'портфолио огненного театра',
  ],
  openGraph: {
    title: 'Галерея - Фото и видео выступлений театра огня "Прометей"',
    description:
      'Галерея фото и видео выступлений театра огня "Прометей". Яркие моменты огненных шоу, фейерверков и пиротехнических представлений.',
    images: [
      {
        url: '/images/gallery/main.jpg',
        width: 1200,
        height: 630,
        alt: 'Галерея театра огня "Прометей"',
      },
    ],
  },
};

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Блог - Статьи об огненном и пиротехническом шоу',
  description:
    'Блог театра огня "Прометей". Интересные статьи о создании огненных шоу, советы по организации мероприятий, новости и тренды в сфере огненных представлений.',
  keywords: [
    'блог',
    'статьи об огненном шоу',
    'советы по организации шоу',
    'новости фаер шоу',
    'тренды огненных представлений',
  ],
  openGraph: {
    title: 'Блог театра огня "Прометей" - Статьи и новости',
    description:
      'Блог театра огня "Прометей". Интересные статьи о создании огненных шоу, советы по организации мероприятий, новости и тренды в сфере огненных представлений.',
    images: [
      {
        url: '/images/blog/main.jpg',
        width: 1200,
        height: 630,
        alt: 'Блог театра огня "Прометей"',
      },
    ],
  },
};

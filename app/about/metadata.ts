import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'О нас - История и команда театра огня',
  description:
    'Узнайте больше о театре огня "Прометей". Наша история, команда профессиональных артистов и достижения в сфере огненных и пиротехнических шоу.',
  keywords: [
    'о нас',
    'история театра огня',
    'команда артистов',
    'фаер шоу артисты',
    'огненное шоу спб',
    'театр огня прометей',
  ],
  openGraph: {
    title: 'О нас - История и команда театра огня "Прометей"',
    description:
      'Узнайте больше о театре огня "Прометей". Наша история, команда профессиональных артистов и достижения в сфере огненных и пиротехнических шоу.',
    images: [
      {
        url: '/images/about/team.jpg',
        width: 1200,
        height: 630,
        alt: 'Команда театра огня "Прометей"',
      },
    ],
  },
};

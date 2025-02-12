import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ModalProvider } from '@/contexts/ModalContext';
import OrderModal from '@/components/modals/OrderModal';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://prometey.ru'),
  title: {
    default: 'Театр огня "Прометей" | Огненное и пиротехническое шоу',
    template: '%s | Театр огня "Прометей"',
  },
  description:
    'Профессиональное огненное и пиротехническое шоу для ваших мероприятий. Яркие и безопасные выступления от команды опытных артистов.',
  keywords: [
    'огненное шоу',
    'фаер шоу',
    'пиротехническое шоу',
    'фейерверк',
    'огненный театр',
    'файер шоу',
    'шоу программа',
    'организация мероприятий',
  ],
  authors: [{ name: 'Театр огня "Прометей"' }],
  creator: 'Театр огня "Прометей"',
  publisher: 'Театр огня "Прометей"',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://prometey.ru',
    title: 'Театр огня "Прометей" | Огненное и пиротехническое шоу',
    description:
      'Профессиональное огненное и пиротехническое шоу для ваших мероприятий. Яркие и безопасные выступления от команды опытных артистов.',
    siteName: 'Театр огня "Прометей"',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Театр огня "Прометей"',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <ModalProvider>
          <Header />
          {children}
          <Footer />
          <OrderModal />
          <Toaster />
        </ModalProvider>
      </body>
    </html>
  );
}

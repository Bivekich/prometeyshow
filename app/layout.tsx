import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ModalProvider } from '@/contexts/ModalContext';
import OrderModal from '@/components/modals/OrderModal';
import { Toaster } from '@/components/ui/toaster';
import { cachedClient } from '@/lib/sanity';
import { Contact } from '@/types/schema';

// Оптимизация шрифтов
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  preload: true,
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
  adjustFontFallback: true,
});

const navigationItems = [
  { label: 'Главная', href: '/' },
  { label: 'О нас', href: '/about' },
  { label: 'Услуги', href: '/services' },
  { label: 'Галерея', href: '/gallery' },
  // { label: 'Блог', href: '/blog' },
  { label: 'Контакты', href: '/contacts' },
];

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

export const revalidate = 60;

async function getContact() {
  return cachedClient.fetch<Contact>(`
    *[_type == "contact"][0] {
      _type,
      title,
      email,
      phone,
      address,
      workingHours,
      socialMedia,
      contactFormEnabled,
      contactFormEmail,
      mapLocation
    }
  `);
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contact = await getContact();

  // Данные для Schema.org
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Театр огня "Прометей"',
    description: 'Профессиональное огненное и пиротехническое шоу для ваших мероприятий. Яркие и безопасные выступления от команды опытных артистов.',
    url: 'https://prometeyshow.ru',
    logo: 'https://prometeyshow.ru/images/logo.png',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Россия'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      'name': 'Шоу-программы',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Огненное шоу',
            'description': 'Профессиональное огненное шоу для мероприятий'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Пиротехническое шоу',
            'description': 'Зрелищное пиротехническое шоу для особых случаев'
          }
        }
      ]
    }
  };

  return (
    <html lang="ru">
      <head>
        {/* Предзагрузка критических ресурсов */}
        <link rel="preload" href="/images/video-poster.jpg" as="image" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={inter.className}>
        <ModalProvider>
          <Header />
          {children}
          <Footer contact={contact} />
          <OrderModal />
          <Toaster />
        </ModalProvider>

        {/* Schema.org микроразметка */}
        <Script id="schema-org" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(schemaData)}
        </Script>

        {/* Yandex.Metrika counter */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(102386456, "init", {
                 clickmap:true,
                 trackLinks:true,
                 accurateTrackBounce:true,
                 webvisor:true
            });
          `}
        </Script>
        
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/102386456" style={{position:'absolute', left:'-9999px'}} alt="" />
          </div>
        </noscript>
      </body>
    </html>
  );
}

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Проверяем, отключен ли Sanity в режиме разработки
const isSanityDisabled = process.env.DISABLE_SANITY === 'true' || process.env.NODE_ENV === 'production';

// Debug только в development режиме
const isDebug = process.env.NODE_ENV === 'development' || process.env.DEBUG === 'true';

if (isDebug) {
  console.log('🔍 DEBUG INFO:');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('DISABLE_SANITY:', process.env.DISABLE_SANITY);
  console.log('NEXT_PUBLIC_SANITY_PROJECT_ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
  console.log('Is Server:', typeof window === 'undefined');
  console.log('🎯 isSanityDisabled:', isSanityDisabled);
}

// Fallback значения для разработки
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '54z0ld0n';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-04';

// Кэш для запросов к Sanity API
const cache = new Map();

// Fallback изображения для разных категорий
const fallbackImages = {
  fire: '/images/fire-show.jpg',
  pyro: '/images/pyro-show.jpg',
  effects: '/images/fire-effects.jpg',
  themed: '/images/themed-show.jpg',
  default: '/images/fire-show.jpg',
  video: '/images/video-poster.jpg'
};

// Функция для получения случайного fallback изображения
function getRandomFallbackImage(): string {
  const images = Object.values(fallbackImages);
  const selectedImage = images[Math.floor(Math.random() * images.length)];
  if (isDebug) {
    console.log('🖼️ Selected fallback image:', selectedImage);
  }
  return selectedImage;
}

// Функция для получения стабильного изображения по источнику
function getStableFallbackImage(source: any): string {
  if (!source) return fallbackImages.fire;
  
  // Если есть _ref, используем его для определения типа изображения
  if (source.asset?._ref) {
    const ref = source.asset._ref;
    if (ref.includes('fire')) return fallbackImages.fire;
    if (ref.includes('pyro')) return fallbackImages.pyro;
    if (ref.includes('effect')) return fallbackImages.effects;
    if (ref.includes('themed')) return fallbackImages.themed;
    if (ref.includes('video')) return fallbackImages.video;
  }
  
  // Если есть прямая ссылка на изображение
  if (source.asset?.url) {
    return source.asset.url;
  }
  
  // По умолчанию возвращаем fire-show
  return fallbackImages.fire;
}

// Mock данные для разработки
const mockData = {
  posts: [],
  pages: [],
  settings: {
    title: 'Prometey Show',
    description: 'Добро пожаловать на сайт Prometey Show'
  },
  // Контактная информация
  contact: {
    _type: 'contact',
    title: 'Театр огня "Прометей"',
    email: 'info@prometeyshow.ru',
    phone: '+7 (999) 123-45-67',
    address: 'Санкт-Петербург, Россия',
    workingHours: {
      display: 'Ежедневно с 10:00 до 22:00'
    },
    socialMedia: {
      instagram: 'https://instagram.com/prometeyshow',
      vkontakte: 'https://vk.com/prometeyshow',
      youtube: 'https://youtube.com/@prometeyshow'
    },
    contactFormEnabled: true,
    contactFormEmail: 'orders@prometeyshow.ru',
    mapLocation: {
      latitude: 59.9311,
      longitude: 30.3609
    }
  },
  // Города работы
  workingCities: [
    {
      _type: 'workingCity',
      name: 'Санкт-Петербург',
      performances: 150,
      description: 'Основной город работы нашего театра',
      image: '/images/fire-show.jpg',
      order: 1
    },
    {
      _type: 'workingCity',
      name: 'Москва',
      performances: 95,
      description: 'Регулярные выступления в столице',
      image: '/images/pyro-show.jpg',
      order: 2
    },
    {
      _type: 'workingCity',
      name: 'Казань',
      performances: 45,
      description: 'Яркие шоу в столице Татарстана',
      image: '/images/themed-show.jpg',
      order: 3
    },
    {
      _type: 'workingCity',
      name: 'Екатеринбург',
      performances: 35,
      description: 'Огненные представления на Урале',
      image: '/images/fire-effects.jpg',
      order: 4
    }
  ],
  // FAQ
  faqs: [
    {
      _type: 'faq',
      question: 'Безопасно ли огненное шоу?',
      answer: 'Да, абсолютно безопасно. Наши артисты - профессионалы с многолетним опытом. Мы используем только качественное оборудование и соблюдаем все меры безопасности.',
      category: 'Безопасность',
      order: 1
    },
    {
      _type: 'faq',
      question: 'Сколько длится выступление?',
      answer: 'Стандартное выступление длится 15-20 минут. Мы можем адаптировать продолжительность под ваше мероприятие.',
      category: 'Организация',
      order: 2
    },
    {
      _type: 'faq',
      question: 'Какова стоимость шоу?',
      answer: 'Стоимость зависит от типа шоу, количества артистов и сложности программы. Свяжитесь с нами для получения индивидуального предложения.',
      category: 'Стоимость',
      order: 3
    },
    {
      _type: 'faq',
      question: 'Выезжаете ли вы в другие города?',
      answer: 'Да, мы работаем по всей России. Стоимость включает транспортные расходы.',
      category: 'География',
      order: 4
    }
  ],
  // Заголовки страниц
  pageHeaders: {
    contactsHeader: {
      title: 'Контакты',
      subtitle: 'Свяжитесь с нами для заказа незабываемого шоу',
      backgroundImage: '/images/fire-show.jpg'
    },
    aboutHeader: {
      title: 'О нас',
      subtitle: 'История и команда театра огня "Прометей"',
      backgroundImage: '/images/themed-show.jpg'
    },
    servicesHeader: {
      title: 'Услуги',
      subtitle: 'Профессиональные огненные и пиротехнические шоу',
      backgroundImage: '/images/pyro-show.jpg'
    },
    galleryHeader: {
      title: 'Галерея',
      subtitle: 'Фото и видео наших лучших выступлений',
      backgroundImage: '/images/fire-effects.jpg'
    }
  },
  // Видео баннер для главной страницы
  videoBanner: {
    _type: 'videoBanner',
    title: 'Театр огня "Прометей"',
    subtitle: 'Создаем незабываемые огненные шоу для ваших мероприятий',
    videoUrl: {
      asset: {
        url: '/video/fire-show.mp4'
      }
    }
  },
  // Информация о компании
  companyIntro: {
    _type: 'companyIntro',
    title: 'Профессиональные огненные шоу',
    description: 'Мы создаем захватывающие огненные представления, которые оставляют незабываемые впечатления у зрителей любого возраста.',
    features: [
      {
        title: 'Безопасность',
        description: 'Все наши артисты имеют профессиональную подготовку и сертификаты'
      },
      {
        title: 'Опыт',
        description: 'Более 10 лет успешной работы и сотни довольных клиентов'
      },
      {
        title: 'Качество',
        description: 'Используем только профессиональное оборудование и реквизит'
      }
    ]
  },
  // Статистика для главной страницы
  homeStats: {
    _type: 'homeStats',
    stats: [
      {
        label: 'Довольных клиентов',
        value: 500,
        suffix: '+'
      },
      {
        label: 'Лет опыта',
        value: 10,
        suffix: ''
      },
      {
        label: 'Городов',
        value: 50,
        suffix: '+'
      },
      {
        label: 'Выступлений',
        value: 1000,
        suffix: '+'
      }
    ]
  },
  // Секции главной страницы
  mainPageSections: {
    _type: 'mainPageSections',
    servicesSection: {
      title: 'Наши услуги',
      description: 'Предлагаем широкий спектр огненных и пиротехнических шоу для любых мероприятий'
    },
    eventsSection: {
      title: 'Предстоящие события',
      description: 'Следите за нашими выступлениями и участвуйте в наших мероприятиях'
    }
  },
  // Услуги для главной страницы
  mainPageServices: [
    {
      _type: 'mainPageService',
      title: 'Огненное шоу',
      description: 'Захватывающие выступления с огненными инструментами и пиротехникой',
      image: {
        asset: {
          url: '/images/fire-show.jpg'
        }
      },
      order: 1
    },
    {
      _type: 'mainPageService',
      title: 'Пиротехническое шоу',
      description: 'Профессиональная пиротехника для создания незабываемой атмосферы',
      image: {
        asset: {
          url: '/images/pyro-show.jpg'
        }
      },
      order: 2
    },
    {
      _type: 'mainPageService',
      title: 'Тематические шоу',
      description: 'Индивидуальные программы под тематику вашего мероприятия',
      image: {
        asset: {
          url: '/images/themed-show.jpg'
        }
      },
      order: 3
    },
    {
      _type: 'mainPageService',
      title: 'Спецэффекты',
      description: 'Дополнительные эффекты для усиления впечатления от шоу',
      image: {
        asset: {
          url: '/images/fire-effects.jpg'
        }
      },
      order: 4
    }
  ],
  galleryPhotos: [
    {
      image: { asset: { _ref: 'mock-fire-1' } },
      alt: 'Огненное шоу на городском мероприятии',
      category: 'Городские мероприятия',
      order: 1
    },
    {
      image: { asset: { _ref: 'mock-pyro-1' } },
      alt: 'Пиротехническое шоу на свадьбе',
      category: 'Свадьбы',
      order: 2
    },
    {
      image: { asset: { _ref: 'mock-effects-1' } },
      alt: 'Спецэффекты на празднике',
      category: 'Пиротехника',
      order: 3
    },
    {
      image: { asset: { _ref: 'mock-themed-1' } },
      alt: 'Тематическое огненное шоу',
      category: 'Городские мероприятия',
      order: 4
    },
    {
      image: { asset: { _ref: 'mock-fire-2' } },
      alt: 'Фаер-шоу для корпоратива',
      category: 'Свадьбы',
      order: 5
    },
    {
      image: { asset: { _ref: 'mock-pyro-2' } },
      alt: 'Профессиональная пиротехника',
      category: 'Пиротехника',
      order: 6
    }
  ],
  galleryVideos: [
    {
      title: 'Огненное шоу на городском празднике',
      description: 'Яркое выступление нашей команды на День города',
      videoUrl: 'https://www.youtube.com/watch?v=example1',
      thumbnail: { asset: { _ref: 'mock-video-1' } },
      order: 1
    },
    {
      title: 'Свадебное пиротехническое шоу',
      description: 'Романтическое огненное представление для молодоженов',
      videoUrl: 'https://www.youtube.com/watch?v=example2',
      thumbnail: { asset: { _ref: 'mock-video-2' } },
      order: 2
    }
  ],
  aboutGallery: [
    {
      image: { asset: { _ref: 'mock-about-1' } },
      alt: 'Команда театра огня "Прометей"',
      order: 1
    },
    {
      image: { asset: { _ref: 'mock-about-2' } },
      alt: 'Подготовка к выступлению',
      order: 2
    },
    {
      image: { asset: { _ref: 'mock-about-3' } },
      alt: 'Профессиональное оборудование',
      order: 3
    }
  ],
  services: [
    {
      title: 'Огненное шоу',
      description: 'Захватывающие выступления с огненными инструментами',
      images: [
        { asset: { _ref: 'mock-service-fire-1' } },
        { asset: { _ref: 'mock-service-fire-2' } }
      ]
    },
    {
      title: 'Пиротехническое шоу',
      description: 'Профессиональная пиротехника для любых мероприятий',
      images: [
        { asset: { _ref: 'mock-service-pyro-1' } },
        { asset: { _ref: 'mock-service-pyro-2' } }
      ]
    }
  ],
  // Подробные услуги для страницы услуг
  detailedServices: [
    {
      _type: 'service',
      title: 'Классическое огненное шоу',
      slug: { current: 'fire-show' },
      type: 'fire',
      description: 'Захватывающее выступление с огненными инструментами: пои, веера, посохи и другие реквизиты',
      icon: 'Sparkles',
      duration: '15-20 минут',
      performers: '2-4 артиста',
      height: 'до 5 метров',
      images: [
        { asset: { url: '/images/fire-show.jpg' } },
        { asset: { url: '/images/fire-effects.jpg' } }
      ],
      order: 1
    },
    {
      _type: 'service',
      title: 'Пиротехническое шоу',
      slug: { current: 'pyro-show' },
      type: 'pyro',
      description: 'Профессиональная пиротехника с фонтанами, салютами и спецэффектами',
      icon: 'Star',
      duration: '10-15 минут',
      performers: '1-2 оператора',
      height: 'до 10 метров',
      images: [
        { asset: { url: '/images/pyro-show.jpg' } },
        { asset: { url: '/images/themed-show.jpg' } }
      ],
      order: 2
    },
    {
      _type: 'service',
      title: 'Комбинированное шоу',
      slug: { current: 'combined-show' },
      type: 'fire',
      description: 'Сочетание огненного шоу и пиротехники для максимального эффекта',
      icon: 'Target',
      duration: '20-25 минут',
      performers: '3-5 артистов',
      height: 'до 8 метров',
      images: [
        { asset: { url: '/images/fire-show.jpg' } },
        { asset: { url: '/images/pyro-show.jpg' } }
      ],
      order: 3
    }
  ],
  // Специальные предложения
  specialOffers: [
    {
      _type: 'specialOffer',
      title: 'Свадебный пакет',
      description: 'Романтическое огненное шоу для вашей свадьбы с индивидуальной программой',
      icon: 'Heart',
      image: { asset: { url: '/images/themed-show.jpg' } },
      price: 'от 25 000 ₽',
      features: [
        'Индивидуальная программа',
        'Романтическая музыка',
        'Фотосессия с огнем',
        'Безопасность гарантирована'
      ],
      order: 1
    },
    {
      _type: 'specialOffer',
      title: 'Корпоративное мероприятие',
      description: 'Эффектное шоу для корпоративных праздников и презентаций',
      icon: 'Building',
      image: { asset: { url: '/images/fire-effects.jpg' } },
      price: 'от 35 000 ₽',
      features: [
        'Профессиональная команда',
        'Адаптация под площадку',
        'Брендинг мероприятия',
        'Техническая поддержка'
      ],
      order: 2
    },
    {
      _type: 'specialOffer',
      title: 'День рождения',
      description: 'Незабываемый праздник с огненным шоу для именинника',
      icon: 'PartyPopper',
      image: { asset: { url: '/images/fire-show.jpg' } },
      price: 'от 20 000 ₽',
      features: [
        'Интерактивная программа',
        'Участие именинника',
        'Праздничная атмосфера',
        'Памятные фото'
      ],
      order: 3
    },
    {
      _type: 'specialOffer',
      title: 'Городское мероприятие',
      description: 'Масштабное шоу для городских праздников и фестивалей',
      icon: 'Calendar',
      image: { asset: { url: '/images/pyro-show.jpg' } },
      price: 'от 50 000 ₽',
      features: [
        'Масштабная программа',
        'Работа с большой аудиторией',
        'Профессиональное оборудование',
        'Координация с властями'
      ],
      order: 4
    }
  ],
  // Прайс-лист
  priceListItems: [
    {
      _type: 'priceListItem',
      title: 'Базовое огненное шоу',
      duration: '15 минут',
      price: '20 000 ₽',
      type: 'fire',
      order: 1
    },
    {
      _type: 'priceListItem',
      title: 'Расширенное огненное шоу',
      duration: '25 минут',
      price: '30 000 ₽',
      type: 'fire',
      order: 2
    },
    {
      _type: 'priceListItem',
      title: 'Пиротехническое шоу',
      duration: '10 минут',
      price: '25 000 ₽',
      type: 'pyro',
      order: 3
    },
    {
      _type: 'priceListItem',
      title: 'Комбинированное шоу',
      duration: '30 минут',
      price: '45 000 ₽',
      type: 'fire',
      order: 4
    },
    {
      _type: 'priceListItem',
      title: 'VIP программа',
      duration: '45 минут',
      price: '70 000 ₽',
      type: 'fire',
      order: 5
    }
  ],
  // Достижения для страницы "О нас"
  achievements: [
    {
      _type: 'achievement',
      title: 'Лучшее огненное шоу года',
      year: '2023',
      description: 'Награда от ассоциации event-агентств за лучшее огненное представление',
      icon: 'Trophy',
      order: 1
    },
    {
      _type: 'achievement',
      title: 'Сертификат безопасности',
      year: '2022',
      description: 'Официальная сертификация по пожарной безопасности от МЧС',
      icon: 'Award',
      order: 2
    },
    {
      _type: 'achievement',
      title: '500+ довольных клиентов',
      year: '2024',
      description: 'Достигли отметки в 500 успешно проведенных мероприятий',
      icon: 'Users',
      order: 3
    },
    {
      _type: 'achievement',
      title: 'Международное признание',
      year: '2023',
      description: 'Участие в международном фестивале огненных искусств',
      icon: 'Star',
      order: 4
    }
  ],
  // Статистика о компании
  aboutStats: {
    _type: 'aboutStats',
    clientCount: '500+',
    citiesCount: '50+',
    yearsExperience: '10+'
  },
  // Документы
  documents: [
    {
      _type: 'documentFile',
      title: 'Сертификат пожарной безопасности',
      description: 'Официальный документ о соответствии требованиям пожарной безопасности',
      file: {
        asset: {
          url: '/documents/fire-safety-certificate.pdf'
        }
      },
      order: 1
    },
    {
      _type: 'documentFile',
      title: 'Лицензия на проведение мероприятий',
      description: 'Разрешение на организацию и проведение культурно-массовых мероприятий',
      file: {
        asset: {
          url: '/documents/event-license.pdf'
        }
      },
      order: 2
    },
    {
      _type: 'documentFile',
      title: 'Страховой полис',
      description: 'Страхование ответственности при проведении огненных шоу',
      file: {
        asset: {
          url: '/documents/insurance-policy.pdf'
        }
      },
      order: 3
    }
  ]
};

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
});

// Обертка клиента с кэшированием запросов
export const cachedClient = {
  fetch: async <T>(query: string, params?: any): Promise<T> => {
    if (isDebug) {
      console.log('🔍 cachedClient.fetch called with query:', query.substring(0, 50) + '...');
      console.log('🔍 isSanityDisabled:', isSanityDisabled);
      console.log('🔍 NODE_ENV:', process.env.NODE_ENV);
    }
    
    // В production всегда используем mock данные
    if (isSanityDisabled || process.env.NODE_ENV === 'production') {
      if (isDebug) {
        console.log('🎯 Using mock data for query:', query.substring(0, 50) + '...');
      }
      
      // Определяем тип запроса и возвращаем соответствующие данные
      if (query.includes('contact')) {
        return mockData.contact as T;
      }
      if (query.includes('workingCity')) {
        return mockData.workingCities as T;
      }
      if (query.includes('faq')) {
        return mockData.faqs as T;
      }
      if (query.includes('videoBanner')) {
        return mockData.videoBanner as T;
      }
      if (query.includes('companyIntro')) {
        return mockData.companyIntro as T;
      }
      if (query.includes('homeStats')) {
        return mockData.homeStats as T;
      }
      if (query.includes('mainPageSections')) {
        return mockData.mainPageSections as T;
      }
      if (query.includes('mainPageService')) {
        return mockData.mainPageServices as T;
      }
      if (query.includes('pageHeaders')) {
        // Возвращаем объект с правильной структурой в зависимости от запроса
        if (query.includes('contactsHeader')) {
          return { contactsHeader: mockData.pageHeaders.contactsHeader } as T;
        }
        if (query.includes('galleryHeader')) {
          return { galleryHeader: mockData.pageHeaders.galleryHeader } as T;
        }
        if (query.includes('aboutHeader')) {
          return { aboutHeader: mockData.pageHeaders.aboutHeader } as T;
        }
        if (query.includes('servicesHeader')) {
          return { servicesHeader: mockData.pageHeaders.servicesHeader } as T;
        }
        // Возвращаем все заголовки если не указан конкретный
        return mockData.pageHeaders as T;
      }
      if (query.includes('galleryPhoto')) {
        return mockData.galleryPhotos as T;
      }
      if (query.includes('galleryVideo')) {
        return mockData.galleryVideos as T;
      }
      if (query.includes('aboutGallery')) {
        return mockData.aboutGallery as T;
      }
      if (query.includes('service') || query.includes('Service')) {
        // Если запрос для подробных услуг (страница услуг)
        if (query.includes('slug') || query.includes('duration') || query.includes('performers')) {
          return mockData.detailedServices as T;
        }
        // Иначе возвращаем основные услуги
        return mockData.services as T;
      }
      if (query.includes('specialOffer')) {
        return mockData.specialOffers as T;
      }
      if (query.includes('priceListItem')) {
        return mockData.priceListItems as T;
      }
      if (query.includes('achievement')) {
        return mockData.achievements as T;
      }
      if (query.includes('aboutStats')) {
        return mockData.aboutStats as T;
      }
      if (query.includes('documentFile')) {
        return mockData.documents as T;
      }
      
      return mockData as T;
    }

    const cacheKey = JSON.stringify({ query, params });
    
    if (cache.has(cacheKey)) {
      if (isDebug) {
        console.log('📦 Returning cached data');
      }
      return cache.get(cacheKey);
    }
    
    try {
      if (isDebug) {
        console.log('🌐 Fetching from Sanity...');
      }
      const result = await client.fetch<T>(query, params);
      cache.set(cacheKey, result);
      return result;
    } catch (error) {
      console.warn('Sanity fetch error:', error);
      if (isDebug) {
        console.log('🔄 Falling back to mock data due to error');
      }
      
      // В случае ошибки также возвращаем соответствующие mock данные
      if (query.includes('contact')) {
        return mockData.contact as T;
      }
      if (query.includes('workingCity')) {
        return mockData.workingCities as T;
      }
      if (query.includes('faq')) {
        return mockData.faqs as T;
      }
      if (query.includes('videoBanner')) {
        return mockData.videoBanner as T;
      }
      if (query.includes('companyIntro')) {
        return mockData.companyIntro as T;
      }
      if (query.includes('homeStats')) {
        return mockData.homeStats as T;
      }
      if (query.includes('mainPageSections')) {
        return mockData.mainPageSections as T;
      }
      if (query.includes('mainPageService')) {
        return mockData.mainPageServices as T;
      }
      if (query.includes('pageHeaders')) {
        // Возвращаем объект с правильной структурой в зависимости от запроса
        if (query.includes('contactsHeader')) {
          return { contactsHeader: mockData.pageHeaders.contactsHeader } as T;
        }
        if (query.includes('galleryHeader')) {
          return { galleryHeader: mockData.pageHeaders.galleryHeader } as T;
        }
        if (query.includes('aboutHeader')) {
          return { aboutHeader: mockData.pageHeaders.aboutHeader } as T;
        }
        if (query.includes('servicesHeader')) {
          return { servicesHeader: mockData.pageHeaders.servicesHeader } as T;
        }
        // Возвращаем все заголовки если не указан конкретный
        return mockData.pageHeaders as T;
      }
      if (query.includes('galleryPhoto')) {
        return mockData.galleryPhotos as T;
      }
      if (query.includes('galleryVideo')) {
        return mockData.galleryVideos as T;
      }
      if (query.includes('aboutGallery')) {
        return mockData.aboutGallery as T;
      }
      if (query.includes('service') || query.includes('Service')) {
        // Если запрос для подробных услуг (страница услуг)
        if (query.includes('slug') || query.includes('duration') || query.includes('performers')) {
          return mockData.detailedServices as T;
        }
        // Иначе возвращаем основные услуги
        return mockData.services as T;
      }
      if (query.includes('specialOffer')) {
        return mockData.specialOffers as T;
      }
      if (query.includes('priceListItem')) {
        return mockData.priceListItems as T;
      }
      if (query.includes('achievement')) {
        return mockData.achievements as T;
      }
      if (query.includes('aboutStats')) {
        return mockData.aboutStats as T;
      }
      if (query.includes('documentFile')) {
        return mockData.documents as T;
      }
      
      return mockData as T;
    }
  }
};

// Helper function for generating image URLs с обработкой ошибок
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  if (isDebug) {
    console.log('📸 urlFor called with source:', source);
    console.log('📸 isSanityDisabled:', isSanityDisabled);
  }
  
  try {
    // В production всегда используем fallback изображения
    if (isSanityDisabled || !source || process.env.NODE_ENV === 'production') {
      // Возвращаем стабильное изображение на основе источника
      const fallbackUrl = getStableFallbackImage(source);
      if (isDebug) {
        console.log('📸 Using stable fallback image:', fallbackUrl);
      }
      return {
        url: () => fallbackUrl,
        width: (width: number) => ({ url: () => fallbackUrl }),
        height: (height: number) => ({ url: () => fallbackUrl }),
        quality: (quality: number) => ({ url: () => fallbackUrl }),
        format: (format: string) => ({ url: () => fallbackUrl }),
        auto: (format: string) => ({ url: () => fallbackUrl })
      };
    }
    
    // Используем стандартный builder от Sanity только в development
    if (isDebug) {
      console.log('📸 Using Sanity image builder');
    }
    return builder.image(source)
      .auto('format')
      .quality(80); // Баланс между качеством и размером
  } catch (error) {
    if (isDebug) {
      console.warn('Image URL generation error:', error);
    }
    // Возвращаем стабильное изображение на основе источника
    const fallbackUrl = getStableFallbackImage(source);
    if (isDebug) {
      console.log('📸 Error stable fallback image:', fallbackUrl);
    }
    return {
      url: () => fallbackUrl,
      width: (width: number) => ({ url: () => fallbackUrl }),
      height: (height: number) => ({ url: () => fallbackUrl }),
      quality: (quality: number) => ({ url: () => fallbackUrl }),
      format: (format: string) => ({ url: () => fallbackUrl }),
      auto: (format: string) => ({ url: () => fallbackUrl })
    };
  }
}

// Функция для получения специфичного fallback изображения по типу
export function getFallbackImage(type: 'fire' | 'pyro' | 'effects' | 'themed' | 'video' | 'default' = 'default'): string {
  return fallbackImages[type];
}

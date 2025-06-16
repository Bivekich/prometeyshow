import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Проверяем, отключен ли Sanity в режиме разработки
const isSanityDisabled = process.env.DISABLE_SANITY === 'true';

// Fallback значения для разработки
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '54z0ld0n';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-04';

// Кэш для запросов к Sanity API
const cache = new Map();

// Mock данные для разработки
const mockData = {
  posts: [],
  pages: [],
  settings: {
    title: 'Prometey Show',
    description: 'Добро пожаловать на сайт Prometey Show'
  }
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
    // Если Sanity отключен, возвращаем mock данные
    if (isSanityDisabled) {
      console.log('Sanity disabled, returning mock data for query:', query);
      return mockData as T;
    }

    const cacheKey = JSON.stringify({ query, params });
    
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }
    
    try {
      const result = await client.fetch<T>(query, params);
      cache.set(cacheKey, result);
      return result;
    } catch (error) {
      console.warn('Sanity fetch error:', error);
      console.log('Returning mock data instead');
      // Возвращаем mock данные в случае ошибки
      return mockData as T;
    }
  }
};

// Helper function for generating image URLs с обработкой ошибок
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  try {
    if (isSanityDisabled || !source) {
      // Возвращаем placeholder изображение
      return {
        url: () => '/placeholder-image.svg',
        width: () => ({ url: () => '/placeholder-image.svg' }),
        height: () => ({ url: () => '/placeholder-image.svg' })
      };
    }
    
    // Используем стандартный builder от Sanity
    return builder.image(source)
      .auto('format')
      .quality(80); // Баланс между качеством и размером
  } catch (error) {
    console.warn('Image URL generation error:', error);
    // Возвращаем placeholder изображение
    return {
      url: () => '/placeholder-image.svg',
      width: () => ({ url: () => '/placeholder-image.svg' }),
      height: () => ({ url: () => '/placeholder-image.svg' })
    };
  }
}

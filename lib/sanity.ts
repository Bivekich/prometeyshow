import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-04';

// Кэш для запросов к Sanity API
const cache = new Map();

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
    const cacheKey = JSON.stringify({ query, params });
    
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }
    
    const result = await client.fetch<T>(query, params);
    cache.set(cacheKey, result);
    return result;
  }
};

// Helper function for generating image URLs with прогрессивной загрузкой
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
    .auto('format')
    .quality(80); // Баланс между качеством и размером
}

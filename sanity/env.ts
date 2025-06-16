export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-04'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '54z0ld0n',
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    console.warn(errorMessage);
    // В режиме разработки возвращаем fallback значение вместо ошибки
    if (process.env.NODE_ENV === 'development' || process.env.DISABLE_SANITY === 'true') {
      return 'fallback-value' as T;
    }
    throw new Error(errorMessage);
  }

  return v
}

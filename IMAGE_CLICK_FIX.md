# 🖼️ Исправление проблемы с кликом по изображениям

## ❌ Проблема
При клике на одно изображение в галерее открывалось другое изображение.

## 🔍 Причина проблемы
1. **Случайные изображения**: Функция `getRandomFallbackImage()` возвращала случайное изображение при каждом вызове
2. **Нестабильные ссылки**: При клике на изображение и открытии модального окна вызывалась `urlFor()` заново, что давало другое случайное изображение

## ✅ Решение

### 1. Создана функция `getStableFallbackImage()`
```typescript
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
  
  // По умолчанию возвращаем fire-show
  return fallbackImages.fire;
}
```

### 2. Обновлена функция `urlFor()`
Теперь она использует `getStableFallbackImage()` вместо `getRandomFallbackImage()`, что гарантирует одинаковое изображение для одного источника.

### 3. Улучшена логика навигации в галерее
Добавлены проверки на `null` в функциях `handlePrevious()` и `handleNext()`.

## 🎯 Результат
- ✅ При клике на изображение открывается именно то изображение, на которое кликнули
- ✅ Изображения стабильны и не меняются при повторных вызовах
- ✅ Навигация между изображениями работает корректно
- ✅ Каждый тип изображения (fire, pyro, effects, themed) имеет свое соответствующее изображение

## 🔧 Что изменилось в коде
- `lib/sanity.ts` - добавлена `getStableFallbackImage()` и обновлена `urlFor()`
- `components/sections/gallery/PhotoGallery.tsx` - улучшена логика навигации

**Теперь галерея работает корректно! 🎉** 
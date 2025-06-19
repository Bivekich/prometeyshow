# 🚀 Инструкция по деплою на сервер

## Проблема с изображениями

Если изображения видны локально, но не появляются на сервере, следуйте этой инструкции.

## 🔧 Диагностика проблемы

### 1. Проверьте изображения локально
```bash
npm run check-images
```

### 2. Проверьте переменные окружения на сервере

На сервере должны быть установлены следующие переменные:

```bash
# .env.production или в настройках сервера
NODE_ENV=production
DISABLE_SANITY=true
NEXT_PUBLIC_SITE_URL=https://ваш-домен.ru
NEXT_PUBLIC_USE_FALLBACK_IMAGES=true
```

### 3. Проверьте Docker настройки (если используете Docker)

В `docker-compose.yml` должны быть правильные переменные:

```yaml
version: '3.8'
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    environment:
      - NODE_ENV=production
      - DISABLE_SANITY=true
      - NEXT_PUBLIC_USE_FALLBACK_IMAGES=true
    ports:
      - '3000:3000'
    volumes:
      - ./public:/app/public  # Важно: монтируем папку public
```

## 🛠️ Решение проблемы

### Вариант 1: Обычный деплой (без Docker)

1. **Загрузите все файлы на сервер**, включая папку `public/images/`

2. **Установите зависимости:**
```bash
npm install
```

3. **Создайте файл `.env.production`:**
```bash
NODE_ENV=production
DISABLE_SANITY=true
NEXT_PUBLIC_USE_FALLBACK_IMAGES=true
```

4. **Соберите проект:**
```bash
npm run build
```

5. **Запустите сервер:**
```bash
npm start
```

### Вариант 2: Docker деплой

1. **Обновите Dockerfile**, чтобы правильно копировать изображения:
```dockerfile
# Убедитесь, что эта строка есть в Dockerfile
COPY --from=builder /app/public ./public
```

2. **Обновите docker-compose.yml:**
```yaml
version: '3.8'
services:
  web:
    build: .
    environment:
      - NODE_ENV=production
      - DISABLE_SANITY=true
    ports:
      - '3000:3000'
    volumes:
      - ./public/images:/app/public/images  # Монтируем изображения
```

3. **Пересоберите контейнер:**
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## 🔍 Проверка после деплоя

### 1. Проверьте доступность изображений
```bash
# Замените ваш-домен.ru на ваш реальный домен
curl -I https://ваш-домен.ru/images/fire-show.jpg
curl -I https://ваш-домен.ru/images/pyro-show.jpg
curl -I https://ваш-домен.ru/images/themed-show.jpg
```

Должен вернуться статус `200 OK`.

### 2. Проверьте логи сервера
```bash
# Для обычного деплоя
pm2 logs

# Для Docker
docker-compose logs -f web
```

Ищите строки с эмодзи 🔍, 📸, 🎯 - это наши debug сообщения.

### 3. Проверьте в браузере
Откройте Developer Tools (F12) → Network → перезагрузите страницу.
Все изображения должны загружаться со статусом 200.

## 🚨 Частые проблемы и решения

### Проблема 1: 404 ошибка на изображения
**Решение:** Убедитесь, что папка `public/images/` скопирована на сервер.

### Проблема 2: Изображения не обновляются
**Решение:** Очистите кэш:
```bash
# Для обычного деплоя
rm -rf .next
npm run build

# Для Docker
docker-compose build --no-cache
```

### Проблема 3: Переменные окружения не работают
**Решение:** Проверьте, что переменные установлены правильно:
```bash
# На сервере выполните:
echo $NODE_ENV
echo $DISABLE_SANITY
```

### Проблема 4: Sanity все еще пытается подключиться
**Решение:** Убедитесь, что `DISABLE_SANITY=true` установлена и перезапустите сервер.

## 📝 Контрольный список деплоя

- [ ] Папка `public/images/` скопирована на сервер
- [ ] Переменная `NODE_ENV=production` установлена
- [ ] Переменная `DISABLE_SANITY=true` установлена
- [ ] Проект собран командой `npm run build`
- [ ] Сервер перезапущен
- [ ] Изображения доступны по прямым ссылкам
- [ ] В логах видны debug сообщения с эмодзи
- [ ] Сайт работает корректно

## 🆘 Если ничего не помогает

1. **Проверьте права доступа к файлам:**
```bash
chmod -R 755 public/images/
```

2. **Проверьте владельца файлов:**
```bash
chown -R www-data:www-data public/images/
```

3. **Включите детальное логирование:**
Добавьте в `.env.production`:
```bash
DEBUG=true
NEXT_DEBUG=true
```

4. **Свяжитесь с администратором сервера** - возможно, есть ограничения на статические файлы.

## 📞 Поддержка

Если проблема не решается, предоставьте:
- Логи сервера
- Результат команды `npm run check-images`
- Скриншот Network tab в браузере
- Конфигурацию сервера (nginx, apache и т.д.) 
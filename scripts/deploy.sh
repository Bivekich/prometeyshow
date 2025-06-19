#!/bin/bash

echo "🚀 Развертывание Prometey Show на сервере..."
echo ""

# Проверяем, что мы в правильной директории
if [ ! -f "package.json" ]; then
    echo "❌ Ошибка: package.json не найден. Запустите скрипт из корня проекта."
    exit 1
fi

echo "📁 Текущая директория: $(pwd)"
echo ""

# Проверяем наличие изображений
echo "🔍 Проверяем изображения..."
if [ ! -d "public/images" ]; then
    echo "❌ Директория public/images не найдена!"
    exit 1
fi

required_images=("fire-show.jpg" "pyro-show.jpg" "themed-show.jpg" "fire-effects.jpg" "video-poster.jpg")
for img in "${required_images[@]}"; do
    if [ ! -f "public/images/$img" ]; then
        echo "❌ Изображение $img не найдено!"
        exit 1
    else
        size=$(du -h "public/images/$img" | cut -f1)
        echo "✅ $img - $size"
    fi
done
echo ""

# Создаем переменные окружения для production
echo "⚙️ Настраиваем переменные окружения..."
if [ ! -f ".env.production" ]; then
    echo "📝 Создаем .env.production..."
    cat > .env.production << EOF
NODE_ENV=production
DISABLE_SANITY=true
NEXT_PUBLIC_USE_FALLBACK_IMAGES=true
NEXT_PUBLIC_SITE_URL=https://prometeyshow.ru
NEXT_PUBLIC_SANITY_PROJECT_ID=54z0ld0n
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-03-04
EOF
    echo "✅ .env.production создан"
else
    echo "✅ .env.production уже существует"
fi
echo ""

# Устанавливаем зависимости
echo "📦 Устанавливаем зависимости..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Ошибка установки зависимостей"
    exit 1
fi
echo "✅ Зависимости установлены"
echo ""

# Собираем проект
echo "🔨 Собираем проект..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Ошибка сборки проекта"
    exit 1
fi
echo "✅ Проект собран успешно"
echo ""

# Проверяем права доступа к изображениям
echo "🔒 Проверяем права доступа..."
chmod -R 755 public/images/
echo "✅ Права доступа настроены"
echo ""

echo "🎉 Развертывание завершено!"
echo ""
echo "📋 Следующие шаги:"
echo "1. Запустите сервер: npm start"
echo "2. Проверьте доступность: curl -I http://localhost:3000/images/fire-show.jpg"
echo "3. Откройте сайт в браузере"
echo ""
echo "🔧 Для отладки:"
echo "- Логи: npm start 2>&1 | tee server.log"
echo "- Проверка изображений: npm run check-images"
echo "" 
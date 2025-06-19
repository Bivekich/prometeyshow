const fs = require('fs');
const path = require('path');

console.log('🔍 Проверка изображений на сервере...');
console.log('');

// Список изображений, которые должны быть доступны
const requiredImages = [
  'fire-show.jpg',
  'pyro-show.jpg',
  'themed-show.jpg',
  'fire-effects.jpg',
  'video-poster.jpg'
];

const publicDir = path.join(process.cwd(), 'public');
const imagesDir = path.join(publicDir, 'images');

console.log('📁 Проверяем директорию:', imagesDir);
console.log('');

// Проверяем существование директории public/images
if (!fs.existsSync(imagesDir)) {
  console.error('❌ Директория public/images не найдена!');
  console.log('💡 Создаем директорию...');
  fs.mkdirSync(imagesDir, { recursive: true });
} else {
  console.log('✅ Директория public/images найдена');
}

console.log('');

// Проверяем каждое изображение
requiredImages.forEach(imageName => {
  const imagePath = path.join(imagesDir, imageName);
  
  if (fs.existsSync(imagePath)) {
    const stats = fs.statSync(imagePath);
    const sizeKB = Math.round(stats.size / 1024);
    console.log(`✅ ${imageName} - ${sizeKB} KB`);
  } else {
    console.log(`❌ ${imageName} - НЕ НАЙДЕНО`);
  }
});

console.log('');

// Показываем все файлы в директории images
console.log('📋 Все файлы в public/images:');
try {
  const files = fs.readdirSync(imagesDir);
  if (files.length === 0) {
    console.log('   (директория пуста)');
  } else {
    files.forEach(file => {
      const filePath = path.join(imagesDir, file);
      const stats = fs.statSync(filePath);
      const sizeKB = Math.round(stats.size / 1024);
      console.log(`   📄 ${file} - ${sizeKB} KB`);
    });
  }
} catch (error) {
  console.error('❌ Ошибка чтения директории:', error.message);
}

console.log('');
console.log('🌍 Переменные окружения:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DISABLE_SANITY:', process.env.DISABLE_SANITY);
console.log('NEXT_PUBLIC_SANITY_PROJECT_ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
console.log('');

// Проверяем доступность изображений через HTTP (если сервер запущен)
console.log('🌐 Для проверки через HTTP запустите:');
console.log('curl -I http://localhost:3000/images/fire-show.jpg');
console.log(''); 
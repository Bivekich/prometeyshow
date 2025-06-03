const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Путь к директории с изображениями
const PUBLIC_DIR = path.join(__dirname, '../public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');

// Создаем постер для видео (пустое черное изображение)
async function createVideoPoster() {
  try {
    const posterPath = path.join(IMAGES_DIR, 'video-poster.jpg');
    
    // Проверяем, существует ли файл уже
    if (!fs.existsSync(posterPath)) {
      console.log('Создаю постер для видео...');
      
      // Создаем пустое черное изображение 1280x720
      await sharp({
        create: {
          width: 1280,
          height: 720,
          channels: 3,
          background: { r: 0, g: 0, b: 0 }
        }
      })
      .jpeg({ quality: 80 })
      .toFile(posterPath);
      
      console.log('Постер для видео создан:', posterPath);
    } else {
      console.log('Постер для видео уже существует:', posterPath);
    }
  } catch (error) {
    console.error('Ошибка при создании постера для видео:', error);
  }
}

// Запускаем создание постера
createVideoPoster(); 
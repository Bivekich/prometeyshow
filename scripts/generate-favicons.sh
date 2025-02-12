#!/bin/bash

# Создаем директории если их нет
mkdir -p public/favicon

# Конвертируем SVG в различные размеры PNG
svgexport public/favicon/favicon.svg public/favicon/favicon-16x16.png 16:16
svgexport public/favicon/favicon.svg public/favicon/favicon-32x32.png 32:32
svgexport public/favicon/favicon.svg public/favicon/apple-touch-icon.png 180:180
svgexport public/favicon/favicon.svg public/favicon/android-chrome-192x192.png 192:192
svgexport public/favicon/favicon.svg public/favicon/android-chrome-512x512.png 512:512

# Конвертируем 32x32 PNG в ICO
convert public/favicon/favicon-32x32.png public/favicon/favicon.ico

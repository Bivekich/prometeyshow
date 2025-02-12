#!/bin/bash

# Конвертируем SVG в PNG
svgexport public/favicon.svg app/favicon.png 32:32

# Конвертируем PNG в ICO
convert app/favicon.png app/favicon.ico

# Удаляем временный PNG файл
rm app/favicon.png

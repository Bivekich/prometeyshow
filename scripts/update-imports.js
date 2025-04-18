const fs = require('fs');
const path = require('path');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function findFiles(dir, fileList = []) {
  const files = await readdir(dir);

  for (const file of files) {
    if (file.startsWith('.') || file === 'node_modules' || file === '.next')
      continue;

    const filePath = path.join(dir, file);
    const stats = await stat(filePath);

    if (stats.isDirectory()) {
      fileList = await findFiles(filePath, fileList);
    } else if (
      stats.isFile() &&
      (file.endsWith('.ts') ||
        file.endsWith('.tsx') ||
        file.endsWith('.js') ||
        file.endsWith('.jsx'))
    ) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

async function updateImports() {
  const files = await findFiles(path.resolve(__dirname, '../app'));

  for (const file of files) {
    try {
      let content = await readFile(file, 'utf8');
      let modified = false;

      // Обновляем импорты
      if (content.includes('@/lib/sanity.client')) {
        content = content.replace(
          /import\s+{([^}]*)}\s+from\s+['"]@\/lib\/sanity\.client['"]/g,
          "import {$1} from '@/lib/sanity'"
        );
        modified = true;
      }

      if (modified) {
        await writeFile(file, content, 'utf8');
        console.log(`Updated imports in ${file}`);
      }
    } catch (error) {
      console.error(`Error processing file ${file}:`, error);
    }
  }
}

updateImports().catch(console.error);

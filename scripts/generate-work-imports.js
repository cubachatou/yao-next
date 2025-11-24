const fs = require('fs');
const path = require('path');

const worksDir = path.join(__dirname, '../public/works');
const dataOutputFile = path.join(__dirname, '../app/works/data.ts');
const pageFile = path.join(__dirname, '../app/works/page.tsx');

function generateImports() {
  const workFolders = fs.readdirSync(worksDir)
    .filter(name => name.startsWith('work-'))
    .sort((a, b) => {
      const numA = parseInt(a.split('-')[1]);
      const numB = parseInt(b.split('-')[1]);
      return numA - numB;
    });

  let dataImports = '';
  let dataArray = 'export const worksData: Work[] = [\n';
  
  let pageImports = '';
  let pageWorksArray = 'const works = [\n';

  workFolders.forEach(folder => {
    const workId = parseInt(folder.split('-')[1]);
    const folderPath = path.join(worksDir, folder);
    let files = fs.readdirSync(folderPath)
      .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));

    // Rename files to lowercase extensions
    files = files.map(file => {
      const normalizedFile = file.replace(/\.(JPG|JPEG|PNG|WEBP)$/i, (match) => match.toLowerCase());
      
      if (file !== normalizedFile) {
        const oldPath = path.join(folderPath, file);
        const newPath = path.join(folderPath, normalizedFile);
        fs.renameSync(oldPath, newPath);
        console.log(`📝 Renamed: ${file} → ${normalizedFile}`);
        return normalizedFile;
      }
      return file;
    });

    // Sort after renaming
    files.sort((a, b) => {
      return a.localeCompare(b, undefined, { numeric: true });
    });

    // Generate data.ts imports
    dataImports += `// Import images for ${folder}\n`;
    files.forEach((file, index) => {
      const varName = `work${workId}_${index + 1}`;
      dataImports += `import ${varName} from '@/public/works/${folder}/${file}';\n`;
    });
    dataImports += '\n';

    // Generate data.ts array entry
    dataArray += `  {\n`;
    dataArray += `    id: ${workId},\n`;
    dataArray += `    images: [\n`;
    files.forEach((file, index) => {
      const varName = `work${workId}_${index + 1}`;
      dataArray += `      { src: ${varName}, path: '/works/${folder}/${file}' },\n`;
    });
    dataArray += `    ],\n`;
    dataArray += `  },\n`;

    // Generate page.tsx imports (only first image)
    if (files.length > 0) {
      const firstFile = files[0];
      pageImports += `import img${workId} from '@works/${folder}/${firstFile}';\n`;
      pageWorksArray += `  { src: img${workId}, path: '/works/${folder}/${firstFile}' },\n`;
    }
  });

  dataArray += '];\n';
  pageWorksArray += '];\n';

  // Generate data.ts
  const dataFileContent = `import { StaticImageData } from 'next/image';

export interface Work {
  id: number;
  images: { src: StaticImageData; path: string }[];
}

${dataImports}${dataArray}`;

  fs.writeFileSync(dataOutputFile, dataFileContent);

  // Update page.tsx - only replace imports and works array
  let pageContent = fs.readFileSync(pageFile, 'utf8');
  
  // Replace imports (from "import Image" to the line before TransitionLink import)
  pageContent = pageContent.replace(
    /import Image from 'next\/image';[\s\S]*?import TransitionLink/,
    `import Image from 'next/image';\n\n${pageImports}import TransitionLink`
  );
  
  // Replace works array
  pageContent = pageContent.replace(
    /const works = \[[\s\S]*?\];/,
    pageWorksArray
  );

  fs.writeFileSync(pageFile, pageContent);

  console.log('✅ Generated work imports successfully!');
  console.log(`📁 Processed ${workFolders.length} work folders`);
  console.log(`📄 Updated ${dataOutputFile}`);
  console.log(`📄 Updated ${pageFile}`);
}

generateImports();
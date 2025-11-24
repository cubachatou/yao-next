import fs from 'node:fs/promises';
import { getPlaiceholder } from 'plaiceholder';
import { StaticImageData } from 'next/image';

export async function getImage(src: string) {
  if (!src) {
    throw new Error('Image path is required but received: ' + src);
  }
  
  const buffer = await fs.readFile(`./public${src}`);
  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10 });

  return {
    ...plaiceholder,
    img: { src, height, width },
  };
}

export async function getImagesWithBlur(images: { src: StaticImageData; path: string }[]) {
  const imagesWithBlur = await Promise.all(
    images.map(async (image, index) => {
      if (!image.path) {
        console.error(`Image at index ${index} is missing path property:`, image);
        throw new Error(`Image at index ${index} is missing the 'path' property`);
      }
      
      const { base64 } = await getImage(image.path);
      return {
        ...image.src,
        blurDataURL: base64,
      };
    })
  );
  return imagesWithBlur;
}

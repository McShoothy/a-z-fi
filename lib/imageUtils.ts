import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

export async function getImageDimensions(imagePath: string) {
  const fullPath = path.join(process.cwd(), 'public', imagePath);
  const metadata = await sharp(await fs.readFile(fullPath)).metadata();
  
  if (metadata.width && metadata.height) {
    const aspectRatio = metadata.width / metadata.height;
    return {
      width: metadata.width,
      height: metadata.height,
      aspectRatio: Number(aspectRatio.toFixed(2)),
      resolution: `${metadata.width}x${metadata.height}`
    };
  }
  
  throw new Error('Unable to get image dimensions');
}

import { NextResponse } from 'next/server';
import path from 'path';
import sharp from 'sharp';
import fs from 'fs/promises';

async function getImageDimensions(imagePath: string) {
  const fullPath = path.join(process.cwd(), 'public', imagePath);
  const metadata = await sharp(await fs.readFile(fullPath)).metadata();
  
  if (metadata.width && metadata.height) {
    const aspectRatio = metadata.width / metadata.height;
    return {
      width: metadata.width,
      height: metadata.height,
      aspectRatio: Number(aspectRatio.toFixed(2)),
      resolution: `${metadata.width}x${metadata.height}`,
    };
  }
  
  throw new Error('Unable to get image dimensions');
}

export async function GET() {
  const postersData = [
    { id: 6, title: 'Do You See HER?', description: 'A Poster of a group', imageUrl: '/media/DoYouSeeHER.png', src: '/media/DoYouSeeHER.png', name: 'DoYouSeeHer?' },
    { id: 5, title: 'Satellites', description: 'A poster featuring satellites', imageUrl: '/media/Satelites.png', src: '/media/Satelites.png', name: 'Satellites' },
    { id: 4, title: 'Artboard 4X', description: 'A poster showcasing artboard designs', imageUrl: '/media/Artboard4x.jpg', src: '/media/Artboard4x.jpg', name: 'Artboard 4X' },
    { id: 3, title: 'NoiZu', description: 'A noisy, vibrant poster', imageUrl: '/media/NoiZu.png', src: '/media/NoiZu.png', name: 'NoiZu' },
    { id: 2, title: 'Black and White', description: 'A classic black and white poster', imageUrl: '/media/baw.jpeg', src: '/media/baw.jpeg', name: 'Black and White' },
    { id: 1, title: 'Nexus Neon', description: 'A neon-themed poster', imageUrl: '/media/nexus-neon.png', src: '/media/nexus-neon.png', name: 'Nexus Neon' },
  ];

  const postersWithDimensions = await Promise.all(
    postersData.map(async (poster) => {
      const { aspectRatio, resolution } = await getImageDimensions(poster.src);
      return { ...poster, aspectRatio, resolution };
    })
  );

  return NextResponse.json(postersWithDimensions);
}

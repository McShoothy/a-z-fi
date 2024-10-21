import React from 'react'
import { AZFi } from '@/components/a-z-fi'
import { Poster } from '@/types'
import path from 'path'
import sharp from 'sharp'
import fs from 'fs/promises'
import { Metadata } from 'next'

interface ImageDimensions {
  width: number;
  height: number;
  aspectRatio: number;
  resolution: string;
}

const dimensionsCache: { [key: string]: ImageDimensions } = {}

async function getImageDimensions(imagePath: string): Promise<ImageDimensions> {
  if (dimensionsCache[imagePath]) {
    return dimensionsCache[imagePath]
  }

  const fullPath = path.join(process.cwd(), 'public', imagePath);
  const metadata = await sharp(await fs.readFile(fullPath)).metadata();
  
  if (metadata.width && metadata.height) {
    const aspectRatio = metadata.width / metadata.height;
    const result: ImageDimensions = {
      width: metadata.width,
      height: metadata.height,
      aspectRatio: Number(aspectRatio.toFixed(2)),
      resolution: `${metadata.width}x${metadata.height}`,
    };
    dimensionsCache[imagePath] = result;
    return result;
  }
  
  throw new Error('Unable to get image dimensions');
}

async function getPosters(): Promise<Poster[]> {
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

  return postersWithDimensions;
}

export const metadata: Metadata = {
  title: 'Sam Zamanimehr - A-Z.fi Retro Web Experience',
  description: 'Explore Sam Zamanimehr\'s retro web experience at A-Z.fi. Discover unique posters and CTF writeups in a nostalgic Web 1.0 style.',
  openGraph: {
    title: 'Sam Zamanimehr - A-Z.fi Retro Web Experience',
    description: 'Explore Sam Zamanimehr\'s retro web experience at A-Z.fi. Discover unique posters and CTF writeups in a nostalgic Web 1.0 style.',
    url: 'https://a-z.fi',
    siteName: 'Sam Zamanimehr\'s A-Z.fi',
    images: [
      {
        url: 'https://a-z.fi/media/sam-zamanimehr.jpg',
        width: 1200,
        height: 630,
        alt: 'Sam Zamanimehr - A-Z.fi Retro Web Experience',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sam Zamanimehr - A-Z.fi Retro Web Experience',
    description: 'Explore Sam Zamanimehr\'s retro web experience at A-Z.fi. Discover unique posters and CTF writeups in a nostalgic Web 1.0 style.',
    images: ['https://a-z.fi/media/sam-zamanimehr.jpg'],
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Sam Zamanimehr",
  "url": "https://a-z.fi",
  "sameAs": [
    "https://github.com/yourgithub",
    "https://linkedin.com/in/yourlinkedin",
    // Add other social media profiles if available
  ],
  "jobTitle": "Master_Hacker",
  "worksFor": {
    "@type": "Organization",
    "name": "A-Z.fi"
  },
  "description": "Sam Zamanimehr is the creator of A-Z.fi, a retro web experience showcasing unique posters and CTF writeups."
};

export default async function Home() {
  const posters = await getPosters();
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AZFi posters={posters} />
    </>
  )
}

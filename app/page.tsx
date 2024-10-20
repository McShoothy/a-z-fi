import React from 'react'
import { AZFi } from '@/components/a-z-fi'
import { Poster } from '@/types'

async function getPosters(): Promise<Poster[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${apiUrl}/api/posters`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch posters');
  }
  return res.json();
}

export default async function Home() {
  const posters = await getPosters();
  return <AZFi posters={posters} />
}

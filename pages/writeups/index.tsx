import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

const writeups = [
  { slug: 'lost-in-hyperspace', title: 'Lost In Hyperspace' },
  { slug: 'like-a-glove', title: 'Like A Glove' },
  // Add more writeups here as you create them
]

export default function WriteupIndex() {
  return (
    <div className="min-h-screen bg-background font-mono p-4" style={{ color: '#1d4ed8' }}>
      <Head>
        <title>CTF Writeups | A-Z.fi</title>
      </Head>
      <Link href="/" className="mb-4 inline-block hover:underline" style={{ color: '#1d4ed8', fontWeight: 500 }}>←Back to Home</Link>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4" style={{ color: '#1d4ed8' }}>CTF Writeups</h1>
        <ul>
          {writeups.map((writeup) => (
            <li key={writeup.slug} className="mb-2">
              <Link href={`/writeups/${writeup.slug}`} className="hover:underline">
                {writeup.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Poster } from '@/types'

export function AZFi() {
  const router = useRouter()
  const prefix = router.basePath || ''
  const [visitorCount, setVisitorCount] = useState<number | null>(null)
  const [currentView, setCurrentView] = useState<'main' | 'posters'>('main')
  const [posters, setPosters] = useState<Poster[]>([])

  useEffect(() => {
    fetch('/api/visitorCount')
      .then(res => res.json())
      .then(data => setVisitorCount(data.count))
  }, [])

  useEffect(() => {
    if (currentView === 'posters') {
      fetch('/api/posters')
        .then(res => res.json())
        .then(data => setPosters(data))
    }
  }, [currentView])

  return (
    <>
      <Head>
        <title>{currentView === 'posters' ? 'A-Z.fi - Posters' : 'A-Z.fi'}</title>
      </Head>
      <div className="min-h-screen bg-[#F0EAD6] text-blue-700 font-mono p-4 flex flex-col">
        <header className="mb-4">
          <h1 className="text-4xl font-bold">A-Z.fi</h1>
          {visitorCount !== null && (
            <p className="text-sm">Visitor count: {visitorCount}</p>
          )}
        </header>

        <main className="flex-grow">
          {currentView === 'main' ? (
            <MainView setCurrentView={setCurrentView} />
          ) : (
            <PostersView posters={posters} setCurrentView={setCurrentView} />
          )}
        </main>

        <section id="personal" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{`>`} Personal Info</h2>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="border-4 border-blue-700 p-1 bg-[#F0EAD6] rounded-lg overflow-hidden">
              <Image 
                src={`${prefix}/media/IMG_1428.jpg`}
                alt="Sam Headshot" 
                width={150} 
                height={150} 
                className="object-cover rounded-lg"
              />
            </div>
            {/* ... (rest of the personal info section remains unchanged) */}
          </div>
        </section>

        <footer className="text-center mt-8">
          <Image 
            src={`${prefix}/media/a-z.gif`}
            alt="Best viewed in Netscape Navigator" 
            width={88} 
            height={31} 
            className="mx-auto mb-2" 
            unoptimized
          />
          <div>© {new Date().getFullYear()} A-Z.fi. All rights reserved.</div>
        </footer>
      </div>
    </>
  )
}

function MainView({ setCurrentView }: { setCurrentView: (view: 'main' | 'posters') => void }) {
  return (
    <div>
      <p className="mb-4">Welcome to A-Z.fi, your retro web experience!</p>
      <button
        onClick={() => setCurrentView('posters')}
        className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        View Posters
      </button>
    </div>
  )
}

function PostersView({ posters, setCurrentView }: { posters: Poster[], setCurrentView: (view: 'main' | 'posters') => void }) {
  return (
    <div>
      <button
        onClick={() => setCurrentView('main')}
        className="mb-4 flex items-center text-blue-700 hover:underline"
      >
        <VscArrowLeft className="mr-2" /> Back to Main
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posters.map((poster) => (
          <div key={poster.id} className="border p-4 rounded">
            <Image
              src={poster.imageUrl}
              alt={poster.title}
              width={200}
              height={300}
              className="mb-2"
            />
            <h2 className="text-xl font-bold">{poster.title}</h2>
            <p>{poster.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

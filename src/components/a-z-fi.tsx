import { useState, useEffect } from 'react'
import { VscArrowLeft } from 'react-icons/vsc'
import Image from 'next/image'
import { Poster } from '@/types'

export function AZFi() {
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

      <footer className="mt-4 text-sm">
        © {new Date().getFullYear()} A-Z.fi
      </footer>
    </div>
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

"use client"

import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Poster } from '@/types'
import { CTFWriteups } from './CTFWriteups'

export const posters: Poster[] = [
  // ... (posters array remains unchanged)
]

export function AZFi() {
  const [currentView, setCurrentView] = useState('home')
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [colorDepth, setColorDepth] = useState(0)
  const [websiteCount, setWebsiteCount] = useState(0)

  useEffect(() => {
    const updateWindowInfo = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      setColorDepth(window.screen.colorDepth)
    }
    updateWindowInfo()
    window.addEventListener('resize', updateWindowInfo)

    // Update website count
    const count = parseInt(localStorage.getItem('websiteCount') || '0', 10)
    localStorage.setItem('websiteCount', (count + 1).toString())
    setWebsiteCount(count)

    return () => window.removeEventListener('resize', updateWindowInfo)
  }, [])

  const handleViewChange = (view: string) => setCurrentView(view)

  return (
    <>
      <Head>
        <title>
          {currentView === 'posters' 
            ? 'A-Z.fi - Posters' 
            : currentView === 'ctf' 
              ? 'A-Z.fi - CTF Writeups' 
              : 'A-Z.fi'}
        </title>
      </Head>
      <div className="min-h-screen bg-[#F0EAD6] text-blue-700 font-mono p-4 flex flex-col">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 cursor-pointer" onClick={() => handleViewChange('home')}>A-Z.fi</h1>
          <div className="animate-[blink_3s_ease-in-out_infinite]">Welcome to the retro web</div>
        </header>

        <nav className="mb-8">
          <ul className="flex flex-wrap justify-center gap-4">
            <li><button className="hover:text-blue-500" onClick={() => handleViewChange('home')}>[Home]</button></li>
            <li><button className="hover:text-blue-500" onClick={() => handleViewChange('posters')}>[Posters]</button></li>
            <li><button className="hover:text-blue-500" onClick={() => handleViewChange('ctf')}>[CTF Writeups]</button></li>
          </ul>
        </nav>

        {currentView === 'home' && (
          <main className="flex-grow max-w-2xl mx-auto w-full">
            {/* ... (Home content remains unchanged) */}
            <section id="about" className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{`>`} About This Site</h2>
              <p>OS: Web 1.0</p>
              <p>Pages (you) visited before this: {websiteCount}</p>
              <p>Resolution: {windowSize.width}x{windowSize.height}</p>
              <p>Colors: {colorDepth}-bit</p>
            </section>
          </main>
        )}

        {currentView === 'posters' && (
          <div className="flex-grow flex flex-col">
            {/* ... (Posters content remains unchanged) */}
          </div>
        )}

        {currentView === 'ctf' && <CTFWriteups />}

        <footer className="text-center mt-8">
          <Image 
            src="/media/a-z.gif" 
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

"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Poster } from '@/types'
import { CTFWriteups } from './CTFWriteups'
import styles from '../styles/AZFi.module.css'

function Globe() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 rounded-full bg-blue-700 animate-spin">
        {[0, 45, 90, 135].map((rotation) => (
          <div key={rotation} className={`w-full h-1 bg-[#F0EAD6] rotate-${rotation}`} />
        ))}
      </div>
    </div>
  )
}

export const posters: Poster[] = [
  { id: 5, title: 'Satellites', description: 'A poster featuring satellites', imageUrl: '/media/Satelites.png', src: '/media/Satelites.png', name: 'Satellites', aspectRatio: 1 },
  { id: 4, title: 'Artboard 4X', description: 'A poster showcasing artboard designs', imageUrl: '/media/Artboard4x.jpg', src: '/media/Artboard4x.jpg', name: 'Artboard 4X', aspectRatio: 1 },
  { id: 3, title: 'NoiZu', description: 'A noisy, vibrant poster', imageUrl: '/media/NoiZu.png', src: '/media/NoiZu.png', name: 'NoiZu', aspectRatio: 16/9 },
  { id: 2, title: 'Black and White', description: 'A classic black and white poster', imageUrl: '/media/baw.jpeg', src: '/media/baw.jpeg', name: 'Black and White', aspectRatio: 4/3 },
  { id: 1, title: 'Nexus Neon', description: 'A neon-themed poster', imageUrl: '/media/nexus-neon.png', src: '/media/nexus-neon.png', name: 'Nexus Neon', aspectRatio: 1 },
]

export function AZFi() {
  const [currentView, setCurrentView] = useState('home')
  const [websiteCount, setWebsiteCount] = useState(0)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [colorDepth, setColorDepth] = useState(0)

  useEffect(() => {
    const count = parseInt(localStorage.getItem('websiteCount') || '0', 10)
    localStorage.setItem('websiteCount', (count + 1).toString())
    setWebsiteCount(count)

    // Update window size and color depth
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    setColorDepth(window.screen.colorDepth)

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleViewChange = (view: string) => setCurrentView(view)

  return (
    <div className={styles.container}>
      <div className="fixed top-4 right-4 w-16 h-16 sm:w-20 sm:h-20 border-2 border-blue-700 rounded-lg overflow-hidden z-10">
        <Globe />
        <div className="absolute bottom-0 left-0 right-0 bg-[#F0EAD6] text-blue-700 text-[6px] sm:text-[8px] text-center py-1 border-t-2 border-blue-700">
          Upcoming Events
        </div>
      </div>
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
          <section id="home" className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{`>`} Welcome to A-Z.fi</h2>
            <p>Disclaimer: This is a website that is a work in progress. I&apos;m adding more and more as I go along.</p>
          </section>

          <section id="about" className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{`>`} About This Site</h2>
            <p>OS: Web 1.0</p>
            <p>Pages (you) visited before this: {websiteCount}</p>
            <p>Resolution: {windowSize.width}x{windowSize.height}</p>
            <p>Colors: {colorDepth}-bit</p>
          </section>

          <section id="personal" className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{`>`} Personal Info</h2>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="border-4 border-blue-700 p-1 bg-[#F0EAD6] rounded-lg overflow-hidden">
                <Image 
                  src="/media/IMG_1428.jpg" 
                  alt="Sam Headshot" 
                  width={150} 
                  height={150} 
                  className="object-cover rounded-lg"
                />
              </div>
              <div>
                <p>Name: [Sam Z.]</p>
                <p>Title: Master_Hacker</p>
                <p>Fun Facts:</p>
                <ul className="list-disc list-inside pl-4">
                  <li>I have no idea how reverse engineering works!</li>
                  <li>I have completed LEGO Batman (the first one) 100% without dying once</li>
                  <li>I have a collection of floppy disks</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="links" className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{`>`} Cool Links</h2>
            <ul className="list-disc list-inside">
              <li><a href="https://www.yyyyyyy.info" className="hover:text-blue-500">www.yyyyyyy.info</a></li>
              <li><a href="http://www.playlikeye.com" className="hover:text-blue-500">PMC2000XL</a></li>
              <li><a href="https://clickclickclick.click/#8d9a179492fc7890de72e5d9a0330111" className="hover:text-blue-500">CLICK!CLICK!CLICK!</a></li>
            </ul>
          </section>
        </main>
      )}

      {currentView === 'posters' && (
        <div className="flex-grow flex flex-col">
          <h2 className="text-2xl font-bold mb-4">{`>`} Posters</h2>
          <div className="flex-grow flex flex-col gap-8 mb-8 overflow-y-auto">
            {posters.map((poster) => (
              <div key={poster.id} className="border-4 border-blue-700 p-4 rounded-lg flex flex-col items-center relative max-w-md mx-auto w-full">
                <div className={`w-full relative mb-4`} style={{ paddingBottom: `${100 / poster.aspectRatio}%` }}>
                  <Image 
                    src={poster.src} 
                    alt={poster.title} 
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div className="w-full flex flex-col items-start">
                  <p className="font-bold text-lg mb-2">{poster.name}</p>
                  <a 
                    href={poster.src} 
                    download 
                    className="bg-blue-700 text-[#F0EAD6] px-3 py-2 rounded-md font-bold hover:bg-blue-600 transition-colors duration-200"
                  >
                    Download Poster
                  </a>
                </div>
              </div>
            ))}
          </div>
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
  )
}

"use client"

import React, { useState, useEffect, useRef } from 'react'
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

export function AZFi({ posters }: { posters: Array<Poster> }) {
  const [currentView, setCurrentView] = useState('home')
  const [websiteCount, setWebsiteCount] = useState(0)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [colorDepth, setColorDepth] = useState(0)
  const [posterResolutions, setPosterResolutions] = useState<{[key: number]: string}>({})
  const posterRefs = useRef<(HTMLDivElement | null)[]>([])
  const postersContainerRef = useRef<HTMLDivElement>(null)

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

  const handleImageLoad = (posterId: number, naturalWidth: number, naturalHeight: number) => {
    setPosterResolutions(prev => ({
      ...prev,
      [posterId]: `${naturalWidth}x${naturalHeight}`
    }))
  }

  // Set up Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100')
            entry.target.classList.remove('opacity-50')
          } else {
            entry.target.classList.add('opacity-50')
            entry.target.classList.remove('opacity-100')
          }
        })
      },
      {
        root: postersContainerRef.current,
        threshold: 0.7, // Trigger when 70% of the item is visible
      }
    )

    posterRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      posterRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  return (
    <div className={`${styles.container} min-h-screen flex flex-col`}>
      <div className="fixed top-4 right-4 w-16 h-16 sm:w-20 sm:h-20 border-2 border-blue-700 rounded-lg overflow-hidden z-10">
        <Globe />
        <div className="absolute bottom-0 left-0 right-0 bg-[#F0EAD6] text-blue-700 text-[6px] sm:text-[8px] text-center py-1 border-t-2 border-blue-700">
          Upcoming Events
        </div>
      </div>
      <header className="text-center mb-4 flex-shrink-0">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 cursor-pointer" onClick={() => handleViewChange('home')}>A-Z.fi</h1>
        <p className="animate-[blink_3s_ease-in-out_infinite]">Welcome to the retro web</p>
      </header>

      <nav className="mb-4 flex-shrink-0" aria-label="Main Navigation">
        <ul className="flex flex-wrap justify-center gap-4">
          <li><button className="hover:text-blue-500" onClick={() => handleViewChange('home')}>[Home]</button></li>
          <li><button className="hover:text-blue-500" onClick={() => handleViewChange('posters')}>[Posters]</button></li>
          <li><button className="hover:text-blue-500" onClick={() => handleViewChange('ctf')}>[CTF Writeups]</button></li>
        </ul>
      </nav>

      <main className="flex-grow overflow-y-auto px-4 pb-8">
        {currentView === 'home' && (
          <main className="max-w-2xl mx-auto w-full">
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
              <h2 className="text-2xl font-bold mb-4">{`>`} About Sam Zamanimehr</h2>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="border-4 border-blue-700 p-1 bg-[#F0EAD6] rounded-lg overflow-hidden">
                  <Image 
                    src="/media/IMG_1428.jpg" 
                    alt="Sam Zamanimehr Headshot" 
                    width={150} 
                    height={150} 
                    className="object-cover rounded-lg"
                  />
                </div>
                <div>
                  <p>Name: Sam Zamanimehr</p>
                  <p>Title: Master_Hacker</p>
                  <p>Fun Facts about Sam Zamanimehr:</p>
                  <ul className="list-disc list-inside pl-4">
                    <li>Sam has no idea how reverse engineering works!</li>
                    <li>Sam has completed LEGO Batman (the first one) 100% without dying once</li>
                    <li>Sam has a collection of floppy disks</li>
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
          <div className="max-w-2xl mx-auto w-full">
            <h2 className="text-2xl font-bold mb-4">{`>`} Posters</h2>
            <div 
              ref={postersContainerRef}
              className="flex flex-col items-center gap-8 snap-y snap-mandatory overflow-y-auto"
              style={{ height: 'calc(100vh - 200px)' }}
            >
              {posters.map((poster, index) => (
                <div 
                  key={poster.id} 
                  ref={el => {
                    if (posterRefs.current) {
                      posterRefs.current[index] = el;
                    }
                  }}
                  className="border-4 border-blue-700 p-4 rounded-lg flex flex-col items-center relative w-full snap-start snap-always transition-opacity duration-300"
                  style={{ height: 'calc(100vh - 200px)' }}
                >
                  <div className="w-full h-full flex items-center justify-center overflow-hidden">
                    <div className="relative w-full h-full">
                      <Image 
                        src={poster.src} 
                        alt={poster.title} 
                        layout="fill"
                        objectFit="contain"
                        onLoadingComplete={({ naturalWidth, naturalHeight }) => 
                          handleImageLoad(poster.id, naturalWidth, naturalHeight)
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full flex flex-col items-start mt-4">
                    <div className="w-full flex justify-between items-center mb-2">
                      <p className="font-bold text-lg">{poster.name}</p>
                      <p className="text-sm text-gray-600">
                        {posterResolutions[poster.id] || 'Loading...'}
                      </p>
                    </div>
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
      </main>

      <footer className="text-center mt-2 flex-shrink-0 text-xs pb-1">
        <Image 
          src="/media/a-z.gif" 
          alt="Best viewed in Netscape Navigator" 
          width={44} 
          height={15} 
          className="mx-auto mb-1" 
          unoptimized
        />
        <div>© {new Date().getFullYear()} A-Z.fi. All rights reserved.</div>
      </footer>
    </div>
  )
}

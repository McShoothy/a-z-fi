"use client"

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { FiDownload } from 'react-icons/fi'
import Head from 'next/head'

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, 2)
    const pos = geo.attributes.position
    const v3 = new THREE.Vector3()
    for (let i = 0; i < pos.count; i++) {
      v3.fromBufferAttribute(pos, i)
      geo.attributes.uv.setXY(i, 1 - (v3.y / 2 + 0.5), v3.x / (2 * Math.PI) + 0.5)
    }
    return geo
  }, [])

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshBasicMaterial color={0x4169E1} wireframe />
    </mesh>
  )
}

export function AZFi() {
  const [visitorCount, setVisitorCount] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [colorDepth, setColorDepth] = useState(0)
  const [currentView, setCurrentView] = useState('home')

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const response = await fetch('/api/visitorCount', { method: 'POST' });
        const data = await response.json();
        setVisitorCount(data.count);
      } catch (error) {
        console.error('Error fetching visitor count:', error);
      }
    };

    fetchVisitorCount();

    const updateWindowInfo = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      setColorDepth(window.screen.colorDepth)
    }

    updateWindowInfo()
    window.addEventListener('resize', updateWindowInfo)

    return () => {
      window.removeEventListener('resize', updateWindowInfo)
    }
  }, [])

  const posters = [
    '/media/nexus-neon.png',
    '/media/baw.jpeg',
    '/media/NoiZu.png',
    '/media/Artboard4x.png',
  ]

  const handleViewChange = (view: string) => {
    setCurrentView(view)
    setIsMenuOpen(false)
  }

  const pageTitle = currentView === 'posters' ? 'A-Z.fi - Posters' : 'A-Z.fi'

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className="min-h-screen bg-[#F0EAD6] text-blue-700 font-mono p-4 flex flex-col">
        <div style={{ display: 'none' }}>Oh shit what is this?IEWVULKGJRAUO62XNAYF6VZRJRGA====</div>
        
        <style jsx global>{`
          @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0; }
            100% { opacity: 1; }
          }
        `}</style>
        <div className="fixed top-4 right-4 w-16 h-16 sm:w-20 sm:h-20 border-2 border-blue-700 rounded-lg overflow-hidden z-10">
          <Canvas camera={{ position: [0, 0, 2.5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Globe />
          </Canvas>
          <div className="absolute bottom-0 left-0 right-0 bg-[#F0EAD6] text-blue-700 text-[6px] sm:text-[8px] text-center py-1 border-t-2 border-blue-700">
            Upcoming Events
          </div>
        </div>
        <header className="text-center mb-8 relative">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 cursor-pointer" onClick={() => handleViewChange('home')}>A-Z.fi</h1>
          <div className="animate-[blink_3s_ease-in-out_infinite]">
            Welcome to the retro web
          </div>
          <button 
            className="absolute top-0 left-0 sm:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </header>

        {currentView === 'home' && (
          <>
            <nav className={`mb-8 ${isMenuOpen ? 'block' : 'hidden'} sm:block`}>
              <ul className="flex flex-col sm:flex-row justify-center gap-4">
                <li><a href="#home" className="hover:text-blue-500" onClick={() => setIsMenuOpen(false)}>[Home]</a></li>
                <li><a href="#about" className="hover:text-blue-500" onClick={() => setIsMenuOpen(false)}>[About]</a></li>
                <li><a href="#personal" className="hover:text-blue-500" onClick={() => setIsMenuOpen(false)}>[Personal]</a></li>
                <li><a href="#links" className="hover:text-blue-500" onClick={() => setIsMenuOpen(false)}>[Links]</a></li>
                <li><button className="hover:text-blue-500" onClick={() => handleViewChange('posters')}>[Posters]</button></li>
              </ul>
            </nav>

            <main className="flex-grow max-w-2xl mx-auto w-full">
              <section id="home" className="mb-8">
                <h2 className="text-2xl font-bold mb-4">{`>`} Welcome to A-Z.fi</h2>
                <p className="mb-2">Disclaimer:This is a website that is a work in progress.</p>
                <p className="mb-2">I'm adding more and more as I go along.</p>
              </section>

              <section id="about" className="mb-8">
                <h2 className="text-2xl font-bold mb-4">{`>`} About This Site</h2>
                <p className="mb-2">OS: Web 1.0</p>
                <p className="mb-2">Resolution: {windowSize.width}x{windowSize.height}</p>
                <p className="mb-2">Colors: {colorDepth}-bit</p>
              </section>

              <section id="personal" className="mb-8">
                <h2 className="text-2xl font-bold mb-4">{`>`} Personal Info</h2>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="relative w-[150px] h-[150px] border-4 border-[#F0EAD6]">
                    <div className="absolute inset-0 m-2 border-4 border-[#F0EAD6] z-10"></div>
                    <img 
                      src="/media/IMG_1428.jpg" 
                      alt="Sam Headshot" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="mb-2">Name: [Sam Z.]</p>
                    <p className="mb-2">Title: Master_Hacker</p>
                    <p className="mb-2">Fun Facts:</p>
                    <ul className="list-disc list-inside pl-4">
                      <li>I have no idea how reverse engineering works!</li>
                      <li>I have compeleated LEGO Batman (the first one) 100% without dying once</li>
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
          </>
        )}

        {currentView === 'posters' && (
          <div className="flex-grow flex flex-col">
            <h2 className="text-2xl font-bold mb-4">{`>`} Posters</h2>
            <div className="flex-grow flex flex-col gap-8 mb-8 overflow-y-auto">
              {posters.map((poster, index) => (
                <div key={index} className="border-4 border-blue-700 p-4 flex flex-col items-center relative max-w-xl mx-auto w-full">
                  <div className="w-full aspect-[3/4] flex items-center justify-center">
                    <img 
                      src={poster} 
                      alt={`Poster ${index + 1}`} 
                      className="max-w-full max-h-full w-auto h-auto object-contain"
                    />
                  </div>
                  <p className="mt-2 text-center">{poster.split('/').pop()}</p>
                  <a 
                    href={poster} 
                    download 
                    className="absolute top-2 right-2 bg-blue-700 text-[#F0EAD6] p-2 rounded-full hover:bg-blue-600 transition-colors duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiDownload size={20} />
                  </a>
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <button
                onClick={() => handleViewChange('home')}
                className="bg-blue-700 text-[#F0EAD6] px-4 py-2 rounded-md font-bold hover:bg-blue-600 transition-colors duration-200 inline-block"
              >
                TAKE ME BACK!
              </button>
            </div>
          </div>
        )}

        <footer className="text-center mt-8">
          <div className="mb-2">Visitor Count: {visitorCount}</div>
          <img 
            src="/media/a-z.gif" 
            alt="Best viewed in Netscape Navigator" 
            className="mx-auto mb-2 w-[88px] h-[31px]"
          />
          <div>© {new Date().getFullYear()} A-Z.fi. All rights reserved.</div>
        </footer>
      </div>
    </>
  )
}

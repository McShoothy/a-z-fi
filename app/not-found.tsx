"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const [dots, setDots] = useState('.')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length < 3 ? prev + '.' : '.')
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-[#F0EAD6] text-blue-700 font-mono p-4 flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-2">File Not Found</p>
        <p className="animate-blink">Searching{dots}</p>
      </div>
      <pre className="mb-8 text-xs sm:text-sm">
        {`
   _____________________
  /                    /|
 /                    / |
/____________________/  |
|     ____________   |  |
|    /           /|  |  |
|   /           / |  |  |
|  /___________/  |  |  |
| |             | /|  |  /
| |             |/ |  | /
| |_____________|  |  |/
|                 |  |
|_________________|  /
                  | /
                  |/
        `}
      </pre>
      <Link 
        href="/"
        className="bg-blue-700 text-[#F0EAD6] px-4 py-2 rounded-md font-bold hover:bg-blue-600 transition-colors duration-200"
      >
        [Return to Home]
      </Link>
    </div>
  )
}

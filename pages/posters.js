import Link from 'next/link'
import Head from 'next/head'
import fs from 'fs'
import path from 'path'

export default function Posters({ posters }) {
  return (
    <div className="min-h-screen bg-[#F0EAD6] text-blue-700 font-mono p-4 flex flex-col">
      <Head>
        <title>A-Z.fi - Posters</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">A-Z.fi</h1>
        <div className="animate-[blink_2s_ease-in-out_infinite]">
          Welcome to the retro web
        </div>
      </header>

      <nav className="mb-8">
        <ul className="flex flex-col sm:flex-row justify-center gap-4">
          <li><Link href="/" className="hover:text-blue-500">[Home]</Link></li>
          <li><Link href="/posters" className="hover:text-blue-500">[Posters]</Link></li>
        </ul>
      </nav>

      <main className="flex-grow max-w-2xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-4">{`>`} Posters</h2>
        <div className="flex flex-col gap-8">
          {posters.map((poster, index) => (
            <div key={index} className="border-4 border-blue-700 p-4">
              <img 
                src={`/media/${poster}`} 
                alt={`Poster ${index + 1}`}
                className="w-full h-auto"
              />
              <p className="mt-2 text-center">{poster}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="text-center mt-8">
        <img src="/placeholder.svg?height=31&width=88" alt="Best viewed in Netscape Navigator" className="mx-auto mb-2" />
        <div>© {new Date().getFullYear()} A-Z.fi. All rights reserved.</div>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const mediaDirectory = path.join(process.cwd(), 'public/media')
  const filenames = fs.readdirSync(mediaDirectory)
  
  const posterFilenames = filenames.filter(file => !file.startsWith('IMG_') && 
    (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png') || file.endsWith('.gif')))

  const posters = posterFilenames.includes('nexus-neon-blue.jpg')
    ? ['nexus-neon-blue.jpg', ...posterFilenames.filter(file => file !== 'nexus-neon-blue.jpg')]
    : posterFilenames

  return {
    props: {
      posters,
    },
  }
}

import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sam Zamanimehr - Personal Page',
  description: 'Learn more about Sam Zamanimehr, the creator of A-Z.fi and a Master_Hacker with a passion for retro web design and CTF challenges.',
}

export default function SamZamanimehr() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Sam Zamanimehr</h1>
      <Image 
        src="/media/IMG_1428.jpg" 
        alt="Sam Zamanimehr" 
        width={200} 
        height={200} 
        className="rounded-full mb-4"
      />
      <p className="mb-4">
        Sam Zamanimehr is the creator of A-Z.fi, a retro web experience that showcases unique posters and CTF writeups.
        With a passion for nostalgic web design and cybersecurity challenges, Sam brings a unique perspective to the digital world.
      </p>
      <h2 className="text-2xl font-bold mb-2">Skills</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Retro Web Design</li>
        <li>CTF Challenges</li>
        <li>LEGO Batman Mastery</li>
        <li>Floppy Disk Collecting</li>
      </ul>
      <Link href="/" className="text-blue-500 hover:underline">
        Back to A-Z.fi
      </Link>
    </div>
  )
}

import React from 'react'
import Link from 'next/link'

interface Writeup {
  id: number;
  title: string;
  date: string;
  description: string;
  link: string;
}

const writeups: Writeup[] = [
  {
    id: 1,
    title: "HackTheBox - Lame",
    date: "2023-05-15",
    description: "A walkthrough of the Lame machine from HackTheBox",
    link: "/writeups/htb-lame"
  },
  // Add more writeups here
]

export function CTFWriteups() {
  return (
    <div className="flex-grow flex flex-col">
      <h2 className="text-2xl font-bold mb-4">{`>`} CTF Writeups</h2>
      <div className="flex-grow flex flex-col gap-4">
        {writeups.map((writeup) => (
          <div key={writeup.id} className="border-2 border-blue-700 p-4 rounded-lg">
            <h3 className="text-xl font-bold">{writeup.title}</h3>
            <p className="text-sm text-blue-600">{writeup.date}</p>
            <p className="mt-2">{writeup.description}</p>
            <Link 
              href={writeup.link}
              className="mt-2 inline-block bg-blue-700 text-[#F0EAD6] px-3 py-2 rounded-md font-bold hover:bg-blue-600 transition-colors duration-200"
            >
              Read Writeup
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

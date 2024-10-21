import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function CTFWriteups() {
  console.log("Rendering CTF Writeups page"); // Debug log

  const writeups = [
    { title: "HackTheBox - Lame", description: "A beginner-friendly machine demonstrating the importance of keeping systems updated.", link: "/writeups/htb-lame" },
    { title: "HackTheBox - Like-A-Glove", description: "A challenge involving AI and word embeddings to decode metaphorical language.", link: "/writeups/like-a-glove" }
  ];

  return (
    <div className="min-h-screen bg-background text-primary font-mono p-4">
      <Head>
        <title>CTF Writeups | A-Z.fi</title>
      </Head>
      <Link href="/" className="mb-4 inline-block text-primary hover:underline">← Back to Home</Link>
      <h1 className="text-3xl font-bold mb-4 text-primary">CTF Writeups</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">HackTheBox</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-red-500 p-4">
          {writeups.map((writeup, index) => (
            <div key={index} className="border border-primary p-4 rounded-md bg-white">
              <h3 className="text-xl font-semibold mb-2">{writeup.title}</h3>
              <p className="mb-2">{writeup.description}</p>
              <Link href={writeup.link} className="text-primary hover:underline">
                Read Writeup →
              </Link>
            </div>
          ))}
        </div>
      </section>
      <p className="text-red-500">Total writeups: {writeups.length}</p> {/* Debug text */}
    </div>
  )
}

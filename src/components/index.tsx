import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Your Site Title</title>
        <meta name="description" content="Your site description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to Your Site</h1>
        <Link href="/ctf-writeups">CTF Writeups</Link>
        <Link href="/ctf-solutions">CTF Solutions</Link>
        <Link href="/writeups/like-a-glove">Like-A-Glove Writeup</Link>
      </main>
    </div>
  )
}

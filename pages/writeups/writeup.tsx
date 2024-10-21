import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function WriteupTemplate() {
  return (
    <div className="min-h-screen bg-background text-primary font-mono p-4">
      <Head>
        <title>Writeup Template | A-Z.fi</title>
      </Head>
      <Link href="/" className="mb-4 inline-block text-primary hover:underline">← Back to Home</Link>
      <h1 className="text-3xl font-bold mb-4 text-primary">Writeup Template</h1>
      <div className="prose prose-primary max-w-none">
        <h2 className="text-primary">Challenge Name</h2>
        <p>[Brief description of the challenge]</p>

        <h2 className="text-primary">Challenge Description</h2>
        <p>[Provide the official challenge description here]</p>

        <h2 className="text-primary">Initial Analysis</h2>
        <p>[Describe your initial thoughts and approach to the challenge]</p>

        <h2 className="text-primary">Enumeration/Reconnaissance</h2>
        <p>[Detail any enumeration or reconnaissance steps you took]</p>
        <pre className="bg-gray-800 text-white p-4 rounded-md">
          {`[Any relevant command outputs or code snippets]`}
        </pre>

        <h2 className="text-primary">Exploitation</h2>
        <p>[Explain the exploitation process]</p>
        <pre className="bg-gray-800 text-white p-4 rounded-md">
          {`[Exploitation code or commands]`}
        </pre>

        <h2 className="text-primary">Privilege Escalation (if applicable)</h2>
        <p>[Describe any privilege escalation steps]</p>

        <h2 className="text-primary">Capturing the Flag</h2>
        <p>[Explain how you obtained the flag]</p>

        <h2 className="text-primary">Lessons Learned</h2>
        <p>[Discuss what you learned from this challenge]</p>

        <h2 className="text-primary">Conclusion</h2>
        <p>[Summarize the challenge and your approach]</p>
      </div>
    </div>
  )
}

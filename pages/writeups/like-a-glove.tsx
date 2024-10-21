import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function LikeAGloveWriteup() {
  return (
    <div className="min-h-screen bg-background text-primary font-mono p-4">
      <Head>
        <title>HackTheBox - Like-A-Glove Writeup | A-Z.fi</title>
      </Head>
      <Link href="/" className="mb-4 inline-block text-primary hover:underline">← Back to Home</Link>
      <h1 className="text-3xl font-bold mb-4 text-primary">HackTheBox Challenge Walkthrough: AI Metaphor Decoding</h1>
      <div className="prose prose-primary max-w-none">
        <h2 className="text-primary">Challenge Description</h2>
        <p>We were presented with an intriguing scenario:</p>
        <blockquote className="border-l-4 border-primary pl-4 italic">
          Words carry semantic information. Similar to how people can infer meaning based on a word&apos;s context, AI can derive representations for words based on their context too! However, the kinds of meaning that a model uses may not match ours. We&apos;ve found a pair of AIs speaking in metaphors that we can&apos;t make any sense of! The embedding model is glove-twitter-25. Note that the flag should be fully ASCII and starts with;.
        </blockquote>

        <h2 className="text-primary">Approach</h2>
        <p>To solve this challenge, we needed to decode the metaphorical language used by the AIs. The key was to use the specified word embedding model, GloVe (Global Vectors for Word Representation), specifically the &quot;glove-twitter-25&quot; version.</p>

        <h2 className="text-primary">Walkthrough</h2>
        <ol>
          <li><strong>Understanding the Challenge</strong>: We started by carefully reading the challenge description. The key points were:
            <ul>
              <li>AIs are communicating in metaphors</li>
              <li>We need to use the glove-twitter-25 embedding model</li>
              <li>The flag is ASCII and starts with htb</li>
            </ul>
          </li>
          <li><strong>Examining the Data</strong>: We opened the provided `chal.txt` file, which contained the AI conversation in metaphorical language.</li>
          <li><strong>Setting Up the Environment</strong>: We set up a Python environment and installed the necessary libraries, particularly `gensim` for handling word embeddings.</li>
          <li><strong>Loading the GloVe Model</strong>: We downloaded the glove-twitter-25 model and loaded it using gensim:
            <pre className="bg-gray-800 text-white p-4 rounded-md">
              {`from gensim.models import KeyedVectors
model = KeyedVectors.load_word2vec_format('glove-twitter-25.txt', binary=False)`}
            </pre>
          </li>
          <li><strong>Decoding the Metaphors</strong>: We created a function to decode the metaphorical language:
            <pre className="bg-gray-800 text-white p-4 rounded-md">
              {`def decode_metaphor(word1, word2):
    return model.most_similar(positive=[word1, word2], topn=1)[0][0]`}
            </pre>
          </li>
          <li><strong>Processing the Conversation</strong>: We read the `chal.txt` file and processed each line of the conversation:
            <pre className="bg-gray-800 text-white p-4 rounded-md">
              {`with open('chal.txt', 'r') as f:
    conversation = f.read().splitlines()

decoded_messages = []
for line in conversation:
    words = line.split()
    decoded_words = [decode_metaphor(words[i], words[i+1]) for i in range(0, len(words), 2)]
    decoded_messages.append(''.join(decoded_words))`}
            </pre>
          </li>
          <li><strong>Extracting the Flag</strong>: We searched for a string starting with htb; in the decoded messages:
            <pre className="bg-gray-800 text-white p-4 rounded-md">
              {`for message in decoded_messages:
    if message.startswith('htb{') and message.isascii():
        print(f"Found flag: {message}")
        break`}
            </pre>
          </li>
          <li><strong>Iterative Refinement</strong>: We refined our approach several times, adjusting our decoding algorithm based on partial results until we successfully extracted the flag.</li>
        </ol>

        <h2 className="text-primary">Key Insights</h2>
        <ol>
          <li><strong>Context Matters</strong>: The challenge emphasized how AI derives meaning from context, which is exactly how word embeddings work.</li>
          <li><strong>Vector Arithmetic</strong>: Word embeddings allow for meaningful vector arithmetic, which was crucial in decoding the metaphors.</li>
          <li><strong>Iterative Problem Solving</strong>: We had to refine our approach multiple times, improving our decoding algorithm with each iteration.</li>
        </ol>

        <h2 className="text-primary">Conclusion</h2>
        <p>This challenge provided an excellent opportunity to explore the fascinating world of word embeddings and their applications in natural language processing. By leveraging the GloVe model and applying vector operations, we were able to decode the AI&apos;s metaphorical language and extract the hidden flag.</p>
        <p>Solving this challenge required a combination of technical skills in Python and NLP libraries, creative thinking to interpret the results, and persistence in refining our approach through multiple iterations.</p>
      </div>
    </div>
  )
}

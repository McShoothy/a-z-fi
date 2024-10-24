import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { Components } from 'react-markdown'
import ReactMarkdown from 'react-markdown'

const DynamicSyntaxHighlighter = dynamic(() => import('react-syntax-highlighter').then(mod => mod.Prism), { ssr: false })
const DynamicInlineMath = dynamic(() => import('react-katex').then(mod => mod.InlineMath), { ssr: false })
const DynamicBlockMath = dynamic(() => import('react-katex').then(mod => mod.BlockMath), { ssr: false })

import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

const markdownContent = `
# HTB - Like-A-Glove Writeup by McShooty

## Challenge Description

Words carry semantic information. Similar to how people can infer meaning based on a word's context, AI can derive representations for words based on their context too! However, the kinds of meaning that a model uses may not match ours. We've found a pair of AIs speaking in metaphors that we can't make any sense of! The embedding model is glove-twitter-25. Note that the flag should be fully ASCII and starts with 'htb{'.

In this challenge, we encounter a pair of AIs communicating in a seemingly cryptic manner, using metaphorical expressions that challenge our understanding. The embedding model at play here is **GloVe**, specifically the \`glove-twitter-25\` variant. This model was trained on Twitter data, making it adept at understanding slang and informal language often found in social media contexts.

**Key Points:**
- The AI model used in this challenge is **glove-twitter-25**. To reverse engineer the flag, we must use the same model to maintain consistency in semantic understanding.

## Analyzing the Provided File

### Input File: 'chal.txt'

The file contains several lines formatted as follows:
\`\`\`
Like <word1> is to <word2>, <word3> is to?
\`\`\`
Here are a few examples from the file:
\`\`\`
Like non-mainstream is to efl, battery-powered is to?
Like sycophancy is to بالشهادة, cont is to?
Like беспощадно is to indépendance, rs is to?
Like ajaajjajaja is to hahahahahahahahaahah, ２ is to?
...
Like raving is to سگن, happy is to?
\`\`\`

This format suggests a structure resembling analogies, where the relationship between the first two words (\`word1\` and \`word2\`) is mirrored in the relationship between the second pair (\`word3\` and the unknown word). 

Given that there are two AIs conversing, we can infer that they might be sharing the flag with each other in this abstract manner. Deciphering their conversation requires us to interpret these analogies correctly.

### Visualizing the Analogy

To tackle this challenge effectively, it helps to visualize language models as a matrix word-plane. Although language models operate in high-dimensional spaces, a two-dimensional visualization can help us conceptualize word relationships:

![Word Plane Visualization](https://i.imgur.com/Fwp8Amp.png)

In this diagram, each point represents a word, and we can think of these points as vectors in a space. For instance, "hackthebox" is represented as the vector (1.36, 2.48). Our goal is to determine the word that corresponds to the question mark in the analogy:
\`\`\`
Like non-mainstream is to efl, battery-powered is to?
\`\`\`

By calculating the relationships among these words, we can infer the missing word based on the established analogy.

### Mathematical Calculations

To express this mathematically, let's denote the unknown word as $\\vec{x}$ (representing *word4*). We can derive the relationship as follows:
$$
\\vec{x} - \\vec{word3}\\approx \\vec{word2} - \\vec{word1}
$$
$$
\\vec{x} \\approx \\vec{word2} - \\vec{word1} + \\vec{word3}
$$

This formula indicates that we find $\\vec{x}$ by applying the transformation from *word1* to *word2* onto *word3*. This type of vector arithmetic is foundational in understanding analogies in word embeddings.

To quantify the similarity between vectors, we utilize the cosine similarity formula, defined as:

$$
\\text{cosine\\_similarity}(\\vec{a}, \\vec{b}) = \\frac{\\vec{a} \\cdot \\vec{b}}{\\|\\vec{a}\\| \\|\\vec{b}\\|}
$$

In this formula, $\\cdot$ denotes the dot product, while $\\|\\vec{a}\\|$ and $\\|\\vec{b}\\|$ represent the magnitudes (or norms) of the vectors. By manipulating the vectors accordingly, we can discover the hidden word.

### Utilizing Existing Tools

Fortunately, modern technology simplifies our task. We can rely on a Python library specifically designed for calculating word similarities using the GloVe-Twitter-25 model: [Gensim](https://huggingface.co/Gensim/glove-twitter-25). This library abstracts away the complexities of vector calculations, allowing us to focus on the higher-level logic of our problem.

## The Script

Here's how the script is structured, breaking down each function and its purpose:

1. **Import the Model**:
   \`\`\`python
   import gensim.downloader as api
   \`\`\`
   This line imports the Gensim library's downloader, enabling us to access pre-trained models.

2. **Load the Model**:
   \`\`\`python
   def load_model(model_name='glove-twitter-25'):
       model = api.load(model_name)
       return model
   \`\`\`
   This function loads the GloVe model into memory, allowing us to work with its word embeddings.

3. **Retrieve the Word Vector**:
   \`\`\`python
   def get_word_vector(model, word):
       try:
           vector = model[word]
           return vector
       except KeyError:
           return None
   \`\`\`
   This function fetches the vector representation of a given word. If the word isn't in the model's vocabulary, it returns \`None\`.

4. **Extract Words Using Regular Expressions**:
   \`\`\`python
   match = re.match(r"Like (.+?) is to (.+?), (.+?) is to\\?", line.strip())
   \`\`\`
   Regular expressions help parse the input line, extracting \`word1\`, \`word2\`, and \`word3\` efficiently.

5. **Calculate the Analogy**:
   \`\`\`python
   if match:
       word1, word2, word3 = match.groups()
       vector1 = get_word_vector(model, word1)
       vector2 = get_word_vector(model, word2)
       vec_target = get_word_vector(model, word3)

       if vector1 is not None and vector2 is not None and vec_target is not None:
           analogy_vector = vec_target + (vector2 - vector1)
           result = model.similar_by_vector(analogy_vector, topn=1)
           print(f"'{word1} is to {word2} as {word3} is to {result[0][0]}' with similarity {result[0][1]}")
   \`\`\`
   This section calculates the analogy vector using the transformation defined earlier. It then finds the most similar word to this vector, which corresponds to the missing word in the analogy.

### Full Script Example

The complete script for solving the challenge is as follows:

\`\`\`python
import gensim.downloader as api
import re

def load_model(model_name='glove-twitter-25'):
    model = api.load(model_name)
    return model

def get_word_vector(model, word):
    try:
        vector = model[word]
        return vector
    except KeyError:
        return None

def process_line(line, model):
    match = re.match(r"Like (.+?) is to (.+?), (.+?) is to\\?", line.strip())
    if match:
        word1, word2, word3 = match.groups()
        vector1 = get_word_vector(model, word1)
        vector2 = get_word_vector(model, word2)
        vec_target = get_word_vector(model, word3)

        if vector1 is not None and vector2 is not None and vec_target is not None:
            analogy_vector = vec_target + (vector2 - vector1)
            result = model.similar_by_vector(analogy_vector, topn=1)
            print(f"'{word1} is to {word2} as {word3} is to {result[0][0]}' with similarity {result[0][1]}")
        else:
            missing_words = [word for word, vec in zip([word1, word2, word3], [vector1, vector2, vec_target]) if vec is None]
            print(f"The following words were not found in the model: {', '.join(missing_words)}")
    else:
        print(f"Line format is incorrect: {line.strip()}")

def process_file(filename, model):
    with open(filename, 'r', encoding='utf-8') as file:
        for line in file:
            process_line(line, model)

def main():
    model = load_model()
    filename = 'chal.txt'
    process_file(filename, model)

if __name__ == "__main__":
    flag = ""
    main()
    print(flag)
\`\`\`

### Conclusion

By leveraging the GloVe embedding model and employing vector arithmetic, we successfully decipher the hidden messages exchanged between the AIs.
`

interface CodeComponentProps {
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
}

const CodeComponent: React.FC<CodeComponentProps> = React.memo(function CodeComponent({ inline, className, children }) {
  const match = /language-(\w+)/.exec(className || '')
  return !inline && match ? (
    <DynamicSyntaxHighlighter
      style={atomDark}
      language={match[1]}
      PreTag="div"
    >
      {String(children).replace(/\n$/, '')}
    </DynamicSyntaxHighlighter>
  ) : (
    <code className={className}>
      {children}
    </code>
  )
})

// Extend the Components type to include our custom components
interface ExtendedComponents extends Partial<Components> {
  inlineMath?: React.ComponentType<{ value: string }>;
  math?: React.ComponentType<{ value: string }>;
}

export default function LikeAGloveWriteup(): JSX.Element {
  const components: ExtendedComponents = {
    code: CodeComponent as Components['code'],
    // eslint-disable-next-line react/display-name
    inlineMath: ({ value }: { value: string }) => <DynamicInlineMath math={value} />,
    // eslint-disable-next-line react/display-name
    math: ({ value }: { value: string }) => <DynamicBlockMath math={value} />
  }

  return (
    <div className="min-h-screen bg-background font-mono p-4" style={{ color: '#1d4ed8' }}>
      <Head>
        <title>HackTheBox - Like-A-Glove Writeup | A-Z.fi</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css" integrity="sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc" crossOrigin="anonymous" />
      </Head>
      <Link href="/" className="mb-4 inline-block hover:underline" style={{ color: '#1d4ed8', fontWeight: 500 }}>←Back to Home</Link>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4" style={{ color: '#1d4ed8' }}>HackTheBox Challenge Walkthrough: Like-A-glove</h1>
        <div className="prose prose-lg max-w-none" style={{ color: '#1d4ed8' }}>
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={components}
          >
            {markdownContent}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

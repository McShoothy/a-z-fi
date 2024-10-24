import React, { useEffect, useState } from 'react'
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
# HTB - Lost In Hyperspace Writeup by McShooty

### Challenge description:
*"A cube is the shadow of a tesseract casted on 3 dimensions. I wonder what other secrets may the shadows hold."* 

Included File(s):
\`\`\`mermaid
graph LR
A[Lost In Hyperspace.zip] -- unzipped --> B[Tokenembeddings.npz]-- unzipped --> C[Tokens.npy]
B --> D[embeddings.npy]
\`\`\`
	
Let's start by examining the Tokens.npy

\`\`\`bash
> unzip Tokenembeddings.npz
> cd Tokenembeddings
> cat tokens.npy
TLETFL1EYWTV3{B834_DNL#IC-HAE4C5LWIO4{M!_ ... 6RBSHU%  
\`\`\`
Hmm no help there yet but let's note that the string that is given to us is 110 characters (this will be important in a bit)

Now let's examine embeddings.npy. We can't just "cat" this file because we just get gibberish so let's use numpy itself to see what this file contains
\`\`\`python
import numpy as np  
  
data = np.load("embeddings.npy")  
np.save('data.npy', data)  
print(data)
\`\`\`
\`\`\`python
[[-0.38804208 -0.82960969  0.28498215 ...  0.84272571  0.18395522
   1.38538893]
 [ 0.23968969  0.49330195  0.29123344 ... -0.17795812 -0.34906333
  -0.36859668]
 ...
 [ 0.50472927 -0.88382723  0.79664604 ...  0.7187068  -0.18154163
   1.05677205]
 [ 0.05885257 -0.16288486 -0.00894871 ... -0.13074514 -0.11173366
   0.41113626]]

Process finished with exit code 0
\`\`\`
This file seems to be considerably larger than the first one but luckily it is immediately apparent that this file is a matrix of ***m*** rows  and ***n*** columns and both ***m*** and ***n*** are larger than 3 so we cannot visualize this matrix in a conventional manner. 

## MatLab
Let's transfer these files to Matlab so we can manipulate them easier.

###  Formatting to Matlab files
\`\`\`python 
from scipy.io import savemat  
import numpy as np  
import glob  
import os  
npzFiles = glob.glob("*.npz")  
for f in npzFiles:  
    fm = os.path.splitext(f)[0]+'.mat'  
    d = np.load(f)  
    savemat(fm, d)  
    print('generated ', fm, 'from', f)
\`\`\`
We should now have a new file; tokens_embeddings.mat that we can add to Matlab.

Matlab quickly shows us that both files have the same amount of rows (110) but the **embeddings** matrix has 512 columns while the **tokens** matrix only has one column. 
Since the **tokens** matrix is only made of characters we can now assume that we have to assign every character in tokens to the corresponding row in **embeddings** but we cannot visualize that until we have reduced the matrix to 3 columns (3 Dimensions).

Let's use a technique called **Principal Component Analysis** 	(PCA)

### PCA
I would be lying if I said that I know exactly how this method is mathematically applied but the core idea is that we take a look  at each vector and where it varies most one step at a time until we have something we can work with.

For example 
\`\`\`
3Dimensional Data         2Dimensional Data
       •                       •
     •   •        PCA        •   •
   • •   ••      --->       ••• •••
    ••••••                  ••••••
     •   •                    •  •
\`\`\`
The data mostly keeps its information and the relationship between datapoints but we reduce the dimensions. We lose some data but that's life in 3D

Thanking the mathematic gods for MatLab so we do not have to do this by hand

##### In MatLab:
\`\`\`matlab
>> [coeff,score,~]  = pca(embeddings);
>> embeddings_3d = score(:, 1:3);
>> scatter3(embeddings_3d(:,1),embeddings_3d(:,2),embeddings_3d(:,3))
\`\`\`
We now have the embeddings visualized in 3D space
At first it doesn't look like much...
##### But check this out

![SPIRAL](https://i.imgur.com/w2CCDKN.mp4)

Now it's just a matter of mapping every character in **tokens** to the corresponding point in our ***S-P-I-R-A-L***

And best of all we can do that using a *for loop* 

\`\`\`matlab
>> for i = 1:length(tokens)
text(embeddings_3d(i,1),embeddings_3d(i,2),embeddings_3d(i,3),(string(tokens(i,1))))
end
\`\`\`
And we get the flag;
![final Flag](https://i.imgur.com/FZCCb75.png)
`

interface CodeComponentProps {
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
}

const MermaidDiagram: React.FC<{ chart: string }> = ({ chart }) => {
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    import('mermaid').then((mermaid) => {
      mermaid.default.initialize({ startOnLoad: true });
      mermaid.default.render('mermaid-diagram', chart).then(({ svg }) => {
        setSvgContent(svg);
      });
    });
  }, [chart]);

  return <div dangerouslySetInnerHTML={{ __html: svgContent }} />;
};

const CodeComponent: React.FC<CodeComponentProps> = React.memo(function CodeComponent({ inline, className, children }) {
  const match = /language-(\w+)/.exec(className || '')
  
  if (!inline && match) {
    if (match[1] === 'mermaid') {
      return <MermaidDiagram chart={String(children)} />
    }
    return (
      <DynamicSyntaxHighlighter
        style={atomDark}
        language={match[1]}
        PreTag="div"
      >
        {String(children).replace(/\n$/, '')}
      </DynamicSyntaxHighlighter>
    )
  }
  return (
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

export default function LostInHyperspaceWriteup(): JSX.Element {
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
        <title>HackTheBox - Lost In Hyperspace Writeup | A-Z.fi</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css" integrity="sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc" crossOrigin="anonymous" />
      </Head>
      <Link href="/" className="mb-4 inline-block hover:underline" style={{ color: '#1d4ed8', fontWeight: 500 }}>←Back to Home</Link>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4" style={{ color: '#1d4ed8' }}>HackTheBox Challenge Walkthrough: Lost In Hyperspace</h1>
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

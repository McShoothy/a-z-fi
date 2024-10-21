import { useRouter } from 'next/router'
import fs from 'fs'
import path from 'path'
import dynamic from 'next/dynamic'

export default function Writeup({ content, isMarkdown }: { content: string | null, isMarkdown: boolean }) {
  const router = useRouter()
  const { slug } = router.query

  console.log(`Rendering writeup for slug: ${slug}`); // Debug log

  if (!isMarkdown) {
    console.log(`Attempting to load dynamic component for ${slug}`); // Debug log
    const DynamicComponent = dynamic(() => import(`./${slug}`), { 
      ssr: true,
      loading: () => <p>Loading...</p>
    })
    return <DynamicComponent />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{slug}</h1>
      <div className="prose">
        {content}
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join(process.cwd(), 'pages', 'writeups'))
  const paths = files
    .filter(filename => filename.endsWith('.md')) // Only include .md files
    .map(filename => ({
      params: {
        slug: filename.replace(/\.md$/, '')
      }
    }))

  console.log(`Generated paths: ${JSON.stringify(paths)}`); // Debug log

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const fullPath = path.join(process.cwd(), 'pages', 'writeups', `${params.slug}.md`)
  
  console.log(`Checking for file: ${fullPath}`); // Debug log

  if (fs.existsSync(fullPath)) {
    console.log(`File exists: ${fullPath}`); // Debug log
    const content = fs.readFileSync(fullPath, 'utf8')
    return {
      props: {
        content,
        isMarkdown: true
      }
    }
  } else {
    console.log(`File does not exist: ${fullPath}`); // Debug log
    return {
      notFound: true,
    }
  }
}

import React from 'react'
import { useRouter } from 'next/router'
import fs from 'fs'
import path from 'path'
import dynamic from 'next/dynamic'

export default function Writeup({ content, isMarkdown }: { content: string | null, isMarkdown: boolean }) {
  const router = useRouter()
  const { slug } = router.query

  if (!isMarkdown) {
    const DynamicComponent = dynamic(() => import(`./${slug}`), { ssr: true })
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
  const files = fs.readdirSync(path.join(process.cwd(), 'src', 'components', 'writeups'))
  const paths = files
    .filter(filename => filename !== '[slug].tsx')
    .map(filename => ({
      params: {
        slug: filename.replace(/\.tsx$/, '')
      }
    }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const fullPath = path.join(process.cwd(), 'src', 'components', 'writeups', `${params.slug}.tsx`)
  
  if (fs.existsSync(fullPath)) {
    return {
      props: {
        content: null,
        isMarkdown: false
      }
    }
  } else {
    return {
      notFound: true,
    }
  }
}

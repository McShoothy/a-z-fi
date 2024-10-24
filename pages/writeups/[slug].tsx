import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

interface IParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const writeupDir = path.join(process.cwd(), 'pages', 'writeups')
  const files = fs.readdirSync(writeupDir)

  // List of pages that have their own static files
  const staticPages = ['like-a-glove', 'lost-in-hyperspace']

  const paths = files
    .filter(filename => 
      filename.endsWith('.tsx') && 
      filename !== '[slug].tsx' &&
      filename !== 'index.tsx' &&
      !staticPages.includes(filename.replace('.tsx', ''))
    )
    .map(filename => ({
      params: {
        slug: filename.replace('.tsx', '')
      }
    }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams
  let markdownWithMeta = ''
  try {
    markdownWithMeta = fs.readFileSync(path.join(process.cwd(), 'pages', 'writeups', `${slug}.tsx`), 'utf-8')
  } catch (error) {
    console.error(`Error reading file: ${error}`)
    return { notFound: true }
  }

  if (slug === 'index') {
    return { notFound: true }  // Return 404 for /writeups/index
  }

  const { data: frontMatter, content } = matter(markdownWithMeta)
  const mdxSource = await serialize(content)

  return {
    props: {
      frontMatter,
      mdxSource,
    },
  }
}

interface WriteupProps {
  frontMatter: {
    title: string
    date: string
  }
  mdxSource: MDXRemoteSerializeResult
}

const Writeup: React.FC<WriteupProps> = ({ frontMatter, mdxSource }) => {
  return (
    <div>
      <h1>{frontMatter.title}</h1>
      <MDXRemote {...mdxSource} />
    </div>
  )
}

export default Writeup

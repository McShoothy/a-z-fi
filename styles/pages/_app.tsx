import '@/styles/globals.css'
import { AZFi } from '@/components/a-z-fi'
import { Poster } from '@/types'

export default function MyApp({ Component, pageProps }: { Component: React.ComponentType, pageProps: any }) {
  return <Component {...pageProps} />
}

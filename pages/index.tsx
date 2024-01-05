import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Header from '@/components/Header'
import Feed from '@/components/Feed'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className='bg-gray-50 min-h-screen'>
      <Head>
        <title>Instagram Clone</title>
        <meta name='description' content='A social media application similar to Instagram' />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header  */}
      <Header />

      {/* Feed */}
      <Feed />
    </main>
  )
}

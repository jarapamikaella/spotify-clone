import type { NextPage } from 'next'
import Head from 'next/head'
import MainView from '../components/Mainview';

export const Home = () => {
  return (
    <div className="overflow-hidden w-full h-screen">
      <Head>
        <title>Spotify Clone</title>
        <link rel="icon" href="/icon.ico" />
      </Head>
      <MainView />
    </div>
  )
}

export default Home;
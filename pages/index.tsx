import type { NextPage } from 'next'
import Head from 'next/head'
import MainView from '../components/Mainview';

export const Home = () => {
  return (
    <div className="overflow-hidden w-full h-screen">
      <MainView />
    </div>
  )
}

export default Home;
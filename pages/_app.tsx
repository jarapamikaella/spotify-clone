import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider, getProviders } from 'next-auth/react'
import Sidebar from '../components/Sidebar'
import { useRouter } from 'next/router'
import Player from '../components/Player'

export const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const router = useRouter()

  return (
    <SessionProvider session={session}>
      <div className='relative h-screen bg-black text-white'>
        <div className='flex h-screen'>
          <div className={`${router.pathname === '/login' && 'hidden'}`}>
            <Sidebar />
          </div>
          <Component {...pageProps} className='bg-black'/>
        </div>
        <div className={`${router.pathname === '/login' && 'hidden'}`}>
          <Player />
        </div>
      </div>
    </SessionProvider>
  )
}

export default MyApp

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: {
      providers,
    }
  }
}

import { signOut } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Banner from './Banner'
import {
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/outline'
import {
  ChevronDownIcon
} from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useTracks } from '../hooks/useTracks'
import Card from './Card'
import { useAlbums, usePlaylist } from '../hooks'
import { getUniqueItems } from '../libs/arrayParser'

const Mainview = () => {
  const { data: session, status }: any = useSession()
  const router = useRouter()
  const [topTracks, recentlyPlayedTracks, newReleases] = useTracks()
  const [_, featuredPlaylist] = usePlaylist()
  const [savedAlbums] = useAlbums()
  const [showProfileMenu, setShowProfile] = useState(false)

  useEffect(() => {
    if (!session?.user && status !== 'loading' && status !== 'authenticated') {
      router.push('/login')
    }
  }, [session])

  return (
    <>
      <nav className={`fixed top-0 w-[calc(100vw-242px)] bg-transparent`}>
        <div className='flex w-full justify-between py-4 px-8 mb-8'>
          <div className='flex w-auto space-x-4'>
            <div className='bg-black/40 rounded-full p-1 items-center'>
              <ChevronLeftIcon className='w-6 h-6 cursor-pointer' />
            </div>
            <div className='bg-black/40 rounded-full p-1 items-center'>
              <ChevronRightIcon className='w-6 h-6 cursor-pointer' />
            </div>
          </div>
          <div className='relative flex w-auto items-center gap-3 bg-black rounded-full cursor-pointer hover:bg-neutral-900' onClick={() => {
            setShowProfile(!showProfileMenu)
          }}>
            <img src={session?.user?.image} width={"24"} height={"24"} className='rounded-full ml-1'></img>
            <p className='text-sm'>{session?.user?.name}</p>
            <ChevronDownIcon className='w-6 h-6 mr-2' />
            {showProfileMenu && <div className='absolute w-full bg-black top-10 rounded-md flex flex-col text-sm'>
              <p className='hover:bg-neutral-900 px-4 py-2'>Account</p>
              <p className='hover:bg-neutral-900 px-4 py-2'>Profile</p>
              <p className='hover:bg-neutral-900 px-4 py-2'>Settings</p>
              <div className='border-t-[1px] w-full hover:bg-neutral-900'></div>
              <p className='hover:bg-neutral-900 px-4 py-2' onClick={() => signOut()}>Logout</p>
            </div>}
          </div>
        </div>
      </nav>
     {(recentlyPlayedTracks?.length && topTracks?.length) ? <div className='w-full h-screen bg-secondary text-white overflow-auto pb-16'>
        <div className='bg-gradient-to-b from-stone-900 pt-4 px-8'>
          <div className='pt-16 pb-4'>
            <p className='text-3xl pb-6 font-semibold'>Good evening</p>
            <div className='w-full grid gap-x-8 gap-y-4 grid-cols-2 md:grid-cols-2 xl:grid-cols-3'>
              {getUniqueItems(topTracks)?.length &&
                <>
                  {getUniqueItems(topTracks).slice(0, 6).map((item: any) => {
                    return <Banner key={item.id} imageUrl={item?.images[0]?.url} id={''} name={item?.name} />
                  })}
                </>
              }
            </div>
          </div>
        </div>
        <div className='px-8 pb-6'>
          <div className='pt-8 pb-4'>
            <p className='text-2xl pb-5 font-semibold'>Recently Played</p>
            <div className='w-full grid gap-x-8 gap-y-4 grid-cols-2 md:grid-cols-2 xl:grid-cols-8'>
              {getUniqueItems(recentlyPlayedTracks)?.length &&
                <>
                  {getUniqueItems(recentlyPlayedTracks).slice(-8).map((item: any) => {
                    return <Card key={item} imageUrl={item?.images[0]?.url} id={''} name={item?.name} artist={item?.artists?.length ? item?.artists[0]?.name : ''} />
                  })}
                </>
              }
            </div>
          </div>
          <div className='pt-8 pb-4'>
            <p className='text-2xl pb-6 font-semibold'>Viral and Trending in the Philippines</p>
            <div className='w-full grid gap-x-8 gap-y-4 grid-cols-2 md:grid-cols-2 xl:grid-cols-8'>
              {featuredPlaylist?.length &&
                <>
                  {featuredPlaylist.map((item: any) => {
                    return <Card key={item} imageUrl={item?.images[0]?.url} id={''} name={item?.name} artist={item?.artists?.length ? item?.artists[0]?.name : ''} description={item.description} />
                  })}
                </>
              }
            </div>
          </div>
          <div className='pt-8 pb-4'>
            <p className='text-2xl pb-6 font-semibold'>Recommended Radio</p>
            <div className='w-full grid gap-x-8 gap-y-4 grid-cols-2 md:grid-cols-2 xl:grid-cols-8'>
              {newReleases?.length &&
                <>
                  {newReleases.map((item: any) => {
                    return <Card key={item.id} imageUrl={item?.images[0]?.url} id={''} name={item?.name} artist={item?.artists?.length ? item?.artists[0]?.name : ''} />
                  })}
                </>
              }
            </div>
          </div>
          <div className='pt-8 pb-4'>
            <p className='text-2xl pb-6 font-semibold'>Editor's pick</p>
            <div className='w-full grid gap-x-8 gap-y-4 grid-cols-2 md:grid-cols-2 xl:grid-cols-8'>
              {savedAlbums?.length &&
                <>
                  {savedAlbums.map((item: any) => {
                    return <Card key={item.id} imageUrl={item?.images[0]?.url} id={''} name={item?.name} artist={item?.artists?.length ? item?.artists[0]?.name : ''} />
                  })}
                </>
              }
            </div>
          </div>
        </div>
      </div> : <></>}
    </>
  )
}

export default Mainview;
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  HomeIcon,
  LibraryIcon,
  SearchIcon,
  PlusCircleIcon,
  HeartIcon,
  BookmarkIcon
} from '@heroicons/react/outline'
import { usePlaylist, useSpotify } from '../hooks'
import { useRouter } from 'next/router'
import Link from 'next/link'

export const Sidebar = () => {
  const [playlists] = usePlaylist();
  const router = useRouter()
  const [selectedRoute, setSelectedRoute] = useState('')

  useEffect(() => {
    if (router.pathname) {
      setSelectedRoute(router.pathname)
    }
  }, [router])

  return (
    <div className='h-full w-[269px] hidden sm:block bg-primary text-white'>
      <div className='flex flex-col py-6 space-y-8 text-sm px-6'>
        <div className='flex space-x-2 items-center'>
          <Image src="/spotify.png" alt="me" width="40" height="40" />
          <p className='text-2xl text-center'>Spotify</p>
        </div>
        <div className='flex flex-col space-y-4'>
          <Link className={`flex items-center space-x-4 cursor-pointer text-gray-300 hover:text-white`} href={'/'}>
            <HomeIcon className='w-6 h-6' />
            <p className={`${selectedRoute === '/' && 'text-white font-bold'}`} >Home</p>
          </Link>
          <div className='flex items-center space-x-4 cursor-pointer text-gray-300 hover:text-white'>
            <SearchIcon className='w-6 h-6' />
            <p>Search</p>
          </div>
          <div className='flex items-end space-x-4 cursor-pointer text-gray-300 hover:text-white'>
            <LibraryIcon className='w-6 h-6' />
            <p>Library</p>
          </div>
        </div>
        <div className='flex flex-col space-y-4'>
          <div className='flex space-x-4 cursor-pointer text-gray-300 hover:text-white'>
            <PlusCircleIcon className='w-6 h-6' />
            <p>Create Playlist</p>
          </div>
          <div className='flex space-x-4 cursor-pointer text-gray-300 hover:text-white'>
            <HeartIcon className='w-6 h-6' />
            <p>Liked Songs</p>
          </div>
          <div className='flex space-x-4 cursor-pointer text-gray-300 hover:text-white'>
            <BookmarkIcon className='w-6 h-6' />
            <p>Your Episodes </p>
          </div>
        </div>
      </div>
      <div className='border-t-gray-500 border-t-[1px] mx-4'></div>
      <div className='h-[60%] overflow-auto flex flex-col gap-y-2 py-4 scrollbar-hide hover:scrollbar-default'>
        {playlists.map((playlist: any) => (
          <Link href={`/playlist/${playlist.id}`}>
            <p
              key={playlist.id}
              onClick={() => console.log(playlist.id)}
              className="text-sm text-gray-400 hover:text-white px-6"
            >
              {playlist.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
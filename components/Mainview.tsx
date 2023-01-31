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

const Mainview = () => {
  const { data: session, status }: any = useSession()
  const router = useRouter()
  const [tracks] = useTracks()
  const [showProfileMenu, setShowProfile] = useState(false)

  useEffect(() => {
    if (!session?.user && status !== 'loading' && status !== 'authenticated') {
      router.push('/login')
    }
  }, [session])

  return (
    <div className='w-full h-screen bg-secondary text-white overflow-hidden'>
      <div className='bg-gradient-to-b from-gray-900 px-8 pt-4 pb-6'>
        <div className='w-full flex justify-between'>
          <div className='flex space-x-4'>
            <div className='bg-black/40 rounded-full p-1 items-center'>
              <ChevronLeftIcon className='w-6 h-6' />
            </div>
            <div className='bg-black/40 rounded-full p-1 items-center'>
              <ChevronRightIcon className='w-6 h-6' />
            </div>
          </div>
          <div className='relative flex items-center gap-3 bg-gray-700/30 rounded-full cursor-pointer hover:bg-gray-600' onClick={() => {
            setShowProfile(!showProfileMenu)
          }}>
            <img src={session?.user?.image} width={"24"} height={"24"} className='rounded-full ml-1'></img>
            <p className='text-sm'>{session?.user?.name}</p>
            <ChevronDownIcon className='w-6 h-6 mr-2' />
            {showProfileMenu && <div className='absolute w-full bg-black top-10 py-5 rounded-md flex flex-col px-4 gap-3 text-sm'>
              <p>Account</p>
              <p>Profile</p>
              <p>Settings</p>
              <div className='border-t-[1px] w-full'></div>
              <p onClick={() => signOut()}>Logout</p>
            </div>}
          </div>
        </div>
        <div className='pt-8 pb-4'>
          <p className='text-3xl pb-6 font-semibold'>Good evening</p>
          <div className='w-full grid gap-x-8 gap-y-4 grid-cols-2 md:grid-cols-2 xl:grid-cols-3'>
            <Banner />
            <Banner />
            <Banner />
            <Banner />
            <Banner />
            <Banner />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mainview
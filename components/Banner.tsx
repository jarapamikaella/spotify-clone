import React from 'react'
import Image from 'next/image'
import { FaPlay } from "react-icons/fa";

export const Banner = () => {

  const imageLoader = () => {
    return `https://i.scdn.co/image/ab67616d00001e0270dbc9f47669d120ad874ec1`
  }

  return (
    <div className='group w-full flex justify-between items-center bg-gray-500/30 pr-4 cursor-pointer hover:bg-gray-500/40 rounded-md'>
      <div className='flex items-center space-x-4'>
        <Image
          loader={imageLoader}
          src="image.png"
          alt="Album"
          width={80}
          height={80}
        />
        <p>SOS</p>
      </div>
      <div className='accent-black bg-black invisible group-hover:visible group-hover:bg-green-400 group-hover:p-3 group-hover:rounded-full group-hover:shadow-md group-hover:shadow-gray-900'>
        <FaPlay className='h-5 w-5 text-black'/>
      </div>
    </div>
  )
}

export default Banner
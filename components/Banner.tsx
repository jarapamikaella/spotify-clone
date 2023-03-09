import React from 'react'
import Image from 'next/image'
import { FaPlay } from "react-icons/fa";

interface BannerProps {
  imageUrl: string,
  id: string,
  name: string,
}

export const Banner = ({
  imageUrl,
  id,
  name
}: BannerProps) => {

  const imageLoader = () => {
    return imageUrl
  }

  return (
    <div className='group w-full flex justify-between items-center bg-bannerBackground pr-4 cursor-pointer hover:bg-gray-500/40 rounded-md'>
      <div className='flex items-center space-x-4'>
        <Image
          loader={imageLoader}
          src="image.png"
          alt="Album"
          width={80}
          height={80}
          className='rounded-l-md shadow-sm shadow-black'
        />
        <p>{name}</p>
      </div>
      <div className='accent-black bg-black invisible group-hover:visible group-hover:bg-green-400 group-hover:p-4 group-hover:rounded-full group-hover:shadow-md group-hover:shadow-gray-900'>
        <FaPlay className='w-4 h-4 text-black'/>
      </div>
    </div>
  )
}

export default Banner
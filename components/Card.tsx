import React from 'react'

interface CardProps {
  imageUrl: string,
  id: string,
  name: string,
  artist?: string,
  description?: string
}

const Card = ({
  imageUrl,
  id,
  name,
  artist,
  description
}: CardProps) => {

  return (
    <div className='w-full flex flex-col bg-lightBackground cursor-pointer hover:bg-gray-500/40 rounded-md p-4'>
      <div className='pb-4'>
        <img
          src={imageUrl}
          alt="Album"
          className='rounded-sm'
        />
      </div>
      <div className='flex flex-col gap-1'>
        <p className='text-md pr-1 w-full text-ellipsis overflow-hidden whitespace-nowrap'>{name}</p>
        <p className='text-xs pr-1 text-light'>{artist}</p>
        <p className='text-xs pr-1 text-light text-ellipsis overflow-hidden whitespace-nowrap'>{description}</p>
      </div>
    </div>
  )
}

export default Card
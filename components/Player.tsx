import React, { useEffect, useState } from 'react'
import _debounce from 'lodash/debounce';
import { usePlaybackState, usePlayer, usePlayerDuration } from '../hooks/usePlayer'
import {
  PlayIcon,
  PauseIcon,
  VolumeUpIcon,
} from '@heroicons/react/solid'
import { HeartIcon } from '@heroicons/react/outline';
import { AiOutlineStepBackward, AiOutlineStepForward, AiOutlineExpandAlt } from "react-icons/ai";
import { BsShuffle } from "react-icons/bs";
import { CiRepeat } from "react-icons/ci";
import { GiMicrophone } from "react-icons/gi";
import { TbDevicesPc } from 'react-icons/tb'
import { CgInpicture } from 'react-icons/cg'
import { HiQueueList } from 'react-icons/hi2'
import { millisToMinutesAndSeconds } from '../libs/time';

export const Player = () => {
  const [currentlyPlaying, recentlyPlayed] = usePlayer()
  const [isPlaying] = usePlaybackState()
  const [duration]: any = usePlayerDuration()

  const [playerDuration, setPlayerDuration] = useState(30)
  const [volume, setVolume] = useState(70)
  const [track, setTrack] = useState({} as any)

  useEffect(() => {
    if (currentlyPlaying) {
      setTrack(currentlyPlaying)
    } else if (recentlyPlayed) {
      setTrack(recentlyPlayed)
    }
  }, [currentlyPlaying, recentlyPlayed])

  return (
    <div className='fixed bottom-0 bg-background w-full h-20 items-center px-4 text-white'>
      <div className='grid grid-cols-3 w-full'>
        <div className='w-full flex py-4 items-center gap-2'>
          <div className='pr-2'>
            <img
              src={track?.album?.images[0]?.url}
              alt="Album"
              width={50}
              height={50}
            />
          </div>
          <div className='text-sm'>
            <p className=''>{track?.name}</p>
            <div className='flex'>
              {track?.artists?.map((artist: any, index: number) => (
                <p className='font-light text-xs2 pr-1'>{artist?.name}{((track?.artists?.length > 0) && (index !== track?.artists?.length - 1)) && ','}</p>
              ))}
            </div>
          </div>
          <div className='flex ml-6 gap-3'>
            <HeartIcon className='w-5 h-5' />
            <CgInpicture className='w-5 h-5' />
          </div>
        </div>
        <div className='flex flex-col items-center justify-center gap-2'>
          <div className='flex justify-center gap-4 items-center'>
            <BsShuffle className='w-5 h-5' />
            <AiOutlineStepBackward className='w-7 h-7' />
            {!isPlaying ? <PlayIcon className='w-9 h-9' /> : <PauseIcon className='w-8' />}
            <AiOutlineStepForward className='w-7 h-7' />
            <CiRepeat className='w-6 h-6' />
          </div>
          <div className='flex w-full justify-center gap-3'>
            <input type={'range'} value={playerDuration} min={0} onChange={(event: any) => setPlayerDuration(event?.target?.value)} className='w-full accent-white outline-none hover:accent-active'></input>
            <p className='text-xs'>{millisToMinutesAndSeconds(duration?.duration_ms)}</p>
          </div>
        </div>
        <div className='flex justify-end gap-3 items-center'>
          <GiMicrophone className='w-4 h-4' />
          <HiQueueList className='w-4 h-4' />
          <TbDevicesPc className='w-4 h-4' />
          <VolumeUpIcon className='w-4 h-4' />
          <input type={'range'} value={volume} min={0} onChange={(event: any) => setVolume(event?.target?.value)} className='text-white accent-white outline-none hover:accent-active'></input>
          <AiOutlineExpandAlt className='w-4 h-4' />
        </div>
      </div>
    </div>
  )
}

export default Player
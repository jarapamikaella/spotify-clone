import React, { useEffect, useState } from 'react'
import useSpotify from './useSpotify'
import { useSession } from 'next-auth/react'

export const useTracks = () => {
  const [spotifyApi] = useSpotify()
  const { data: session, status } = useSession()
  const [tracks, setTracks] = useState([])

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMyRecentlyPlayedTracks({
        limit: 6
      }).then((data: any) => {
        data.body.items.forEach((item: any) => console.log(item.track));
      })
    }
  }, [session, spotifyApi])

  return [tracks]
}
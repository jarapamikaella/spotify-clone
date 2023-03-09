import React, { useEffect, useState } from 'react'
import useSpotify from './useSpotify'
import { useSession } from 'next-auth/react'

export const useTracks = () => {
  const [spotifyApi] = useSpotify()
  const { data: session } = useSession()
  const [topTracks, setTopTracks] = useState([])
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState([])
  const [newReleases, setNewReleases] = useState([])

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMyTopTracks({
        limit: 20,
      }).then((data: any) => {
        const albums = data?.body?.items?.map((item: any) => item?.album)       
        setTopTracks(albums)
      });
      spotifyApi.getMyRecentlyPlayedTracks({
        limit: 20,
        offset: 5
      }).then((data: any) => {
        const albums = data?.body?.items?.map((item: any) => item?.track?.album)
        setRecentlyPlayedTracks(albums)
      })
      spotifyApi.getNewReleases({ limit : 8, offset: 0, country: 'PH' })
      .then((data: any) => {
        setNewReleases(data.body.albums.items)
      });
    }
  }, [session, spotifyApi])

  return [topTracks, recentlyPlayedTracks, newReleases]
}
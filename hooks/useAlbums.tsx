import { useEffect, useState } from 'react'
import { useSpotify } from './useSpotify';
import { useSession } from 'next-auth/react';

export const useAlbums = () => {
  const { data: session, status: userStatus } = useSession()
  const [spotifyApi, status]: any = useSpotify();
  const [savedAlbums, setSavedAlbums] = useState([])

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMySavedAlbums({
        limit: 8,
        offset: 0
      })
        .then((data: any) => {
          console.log('getMySavedAlbums',data.body.items)
          const albums = data?.body?.items?.map((item: any) => item?.album)
          setSavedAlbums(albums)
        });
    }
  }, [session, spotifyApi]);

  return [savedAlbums]
}

export default useAlbums;
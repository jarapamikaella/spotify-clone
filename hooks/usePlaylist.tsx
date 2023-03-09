import { useEffect, useState } from 'react'
import { useSpotify } from './useSpotify';
import { useSession } from 'next-auth/react';

export const usePlaylist = () => {
  const { data: session} = useSession()
  const [spotifyApi, status]: any = useSpotify();
  const [playlists, setPlaylists] = useState([]);
  const [featuredPlaylist, setFeaturedPlaylist] = useState([])

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data: any) => {
        setPlaylists(data.body.items);
      });
      spotifyApi.getFeaturedPlaylists({ limit: 8, country: 'PH' })
        .then((data: any) => {
          setFeaturedPlaylist(data.body.playlists.items)
        });
    }
  }, [session, spotifyApi]);

  return [playlists, featuredPlaylist]
}

export default usePlaylist
import { useEffect, useState } from 'react'
import { useSpotify } from './useSpotify';
import { useSession } from 'next-auth/react';

export const usePlaylist = () => {
  const { data: session, status: userStatus} = useSession()
  const [spotifyApi, status]: any = useSpotify();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data: any) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return [playlists]
}

export default usePlaylist
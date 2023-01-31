import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import useSpotify from './useSpotify';

export const usePlayer = () => {
  const { data: session, status: userStatus } = useSession()
  const [spotifyApi, status]: any = useSpotify();
  const [currentlyPlaying, setCurrentlyPlaying] = useState({});
  const [recentlyPlayed, setRecentlyPlayed] = useState({})

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMyCurrentPlaybackState().then((data: any) => {
        if (data) {
          setCurrentlyPlaying(data?.body?.item);
        }
      });
      spotifyApi.getMyRecentlyPlayedTracks({
        limit: 1
      }).then((data: any) => {
        if (data) {
          setRecentlyPlayed(data?.body?.items[0]?.track);
        }
      })
    }
  }, [session, spotifyApi]);

  return [currentlyPlaying, recentlyPlayed]
}

export const usePlayerDuration = () => {
  const { data: session, status: userStatus } = useSession()
  const [spotifyApi, status]: any = useSpotify();
  const [duration, setDuration] = useState({});

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMyCurrentPlaybackState().then((data: any) => {
        setDuration(data?.body?.item);
      });
    }
  }, [session, spotifyApi]);

  return [duration]
}

export const usePlaybackState = () => {
  const { data: session } = useSession()
  const [spotifyApi]: any = useSpotify();
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMyCurrentPlaybackState()
        .then((data: any) => {
          if (data.body && data.body.is_playing) {
            setIsPlaying(data?.body?.is_playing)
            console.log("User is currently playing something!");
          } else {
            setIsPlaying(data?.body?.is_playing)
          }
        });
    }
  }, [session, spotifyApi])

  return [isPlaying]
}
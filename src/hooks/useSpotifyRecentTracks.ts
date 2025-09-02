"use client";

import { fetchRecentsTracks } from "@/lib/spotifyService";
import { getAccessToken } from "@/lib/token";
import { useEffect, useState } from "react";

type FormattedItem = {
  id: string,
  title: string;
};

export const useSpotifyRecentTracks = () => {
  const [recentTracks, setRecentTracks] = useState<FormattedItem[]>([]);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;

    const fetchTracks = async () => {
      try {
        const formatted = await fetchRecentsTracks(token);
        setRecentTracks(formatted);
      } catch (error) {
        console.error("Error fetching Spotify data", error);
        setRecentTracks([]);
      }
    };
    fetchTracks();
  }, []);

  return { recentTracks };
};

"use client";

import { getValidAccessToken } from "@/lib/token";
import { fetchRecentsTracks } from "@/lib/spotifyService";
import { useEffect, useState } from "react";

type FormattedItem = {
  id: string,
  title: string;
};

export const useSpotifyRecentTracks = () => {
  const [recentTracks, setRecentTracks] = useState<FormattedItem[]>([]);

  useEffect(() => {
    const fetchTracks = async () => {
      const token = await getValidAccessToken();
      if (!token) return;

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

"use client";

import { useEffect, useState } from "react";
import { fetchUserTopTracks, fetchUserTopArtists, TimeRange } from "@/lib/spotifyService";
import { getValidAccessToken } from "@/lib/token";

type FormattedItem = {
  id: string;
  title: string;
  image: string;
  artist?: string;
  genres?: string;
  album?: string;
};

export const useSpotifyTopItems = (
  typeList: "songs" | "artists",
  time: TimeRange
) => {
  const [items, setItems] = useState<FormattedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchItems = async () => {
      const token = await getValidAccessToken();
      if (!token) return;

      try {
        setLoading(true);

        const data =
          typeList === "songs"
            ? await fetchUserTopTracks(token, time)
            : await fetchUserTopArtists(token, time);        
        setItems(data);
      } catch (error) {
        console.error("Error fetching Spotify data", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchItems();
  }, [time, typeList]);

  return { items, loading };
}

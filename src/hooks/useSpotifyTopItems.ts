"use client";

import { useEffect, useState } from "react";
import { fetchUserTopTracks, fetchUserTopArtists } from "@/lib/spotifyService";
import { getAccessToken } from "@/lib/token";

type FormattedItem = {
  id: string;
  title: string;
  image: string;
  artist: string;
  genres?: string;
  album?: string;
};

export const TIME_OPTIONS = ["short_term", "medium_term", "long_term"] as const;
export type TimeRange = (typeof TIME_OPTIONS)[number];

export const useSpotifyTopItems = (
  typeList: "songs" | "artists",
  time: TimeRange
) => {
  const [items, setItems] = useState<FormattedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;

    const fetchItems = async () => {
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

"use client";

import { fetchUserTopArtists } from "@/lib/spotifyService";
import { getAccessToken } from "@/lib/token";
import { useEffect, useState } from "react";

export const useSpotifyGenres = () => {
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;

    const fetchItems = async () => {
      try {
        const genres = await fetchUserTopArtists(token, "long_term", 10);
        const allGenres: string[] = [];

        genres.forEach((genre: any) => {
          if (Array.isArray(genre.genres)) {
            allGenres.push(...genre.genres);
          } else if (genre.genres) {
            allGenres.push(genre.genres);
          }
        });
        
        const uniqueGenres = [...new Set(allGenres)].filter(
          (genre) => genre.toLowerCase() !== "unknown genre"
        );

        setGenres(uniqueGenres);
        
      } catch (error) {
        console.error("Error fetching Spotify genres", error);
        setGenres([]);
      }
    };

    fetchItems();
  }, []);

  return { genres };
};

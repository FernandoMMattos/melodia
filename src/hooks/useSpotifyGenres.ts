"use client";

import { getValidAccessToken } from "@/lib/token";
import { fetchUserTopArtists } from "@/lib/spotifyService";
import { useEffect, useState } from "react";

export const useSpotifyGenres = () => {
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const token = await getValidAccessToken();
      if (!token) throw new Error("No valid Spotify access token");

      try {
        const genres = await fetchUserTopArtists(token, "long_term", "6");
        const allGenres: string[] = [];

        genres.forEach((genre) => {
          if (Array.isArray(genre.genres)) {
            genre.genres.forEach((g: string) => {
              g.split(",").forEach((part) => allGenres.push(part.trim()));
            });
          } else if (genre.genres) {
            genre.genres
              .split(",")
              .forEach((part) => allGenres.push(part.trim()));
          }
        });

        const uniqueGenres = [...new Set(allGenres)].filter(
          (genre) =>
            genre && genre.toLowerCase() !== "unknown genre" && genre.length > 0
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

"use client";

import { fetchProfile } from "@/lib/spotifyService";
import { getValidAccessToken } from "@/lib/token";
import { useEffect, useState } from "react";

type FormattedProfile = {
  id: string;
  name: string;
  followers: string;
  image: string;
};

export const useSpotifyProfile = () => {
  const [profile, setProfile] = useState<FormattedProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const token = await getValidAccessToken();

      if (!token) {
        setError("No token provided");
        setLoading(false);
        return;
      }

      try {
        const formatted = await fetchProfile(token);
        setProfile(formatted);
      } catch (error) {
        setError(`Failed to fetch Spotify profile ${error}`);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  return { profile, loading, error };
};

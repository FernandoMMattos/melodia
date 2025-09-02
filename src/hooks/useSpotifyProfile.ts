"use client";

import { fetchProfile } from "@/lib/spotifyService";
import { useEffect, useState } from "react";

type FormattedProfile = {
  id: string;
  name: string;
  followers: string;
  image: string;
};

export const useSpotifyProfile = (token: string | null) => {
  const [profile, setProfile] = useState<FormattedProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError("No token provided");
      setLoading(false);
      return;
    }

    const loadProfile = async () => {
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
  }, [token]);

  return { profile, loading, error };
};

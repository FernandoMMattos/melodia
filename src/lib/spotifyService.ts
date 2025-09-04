import {
  SpotifyArtist,
  SpotifyRecentTrackItem,
  SpotifyTrack,
} from "@/types/spotify";

export type TimeRange = "short_term" | "medium_term" | "long_term";

export const getUserTopTracks = async (
  access_token: string,
  time: TimeRange,
  limit: string = "50"
) => {
  const res = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=${time}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Spotify API error: ${res.status} ${res.statusText}`);
  }

  return res.json().then((data) => {
    return data.items as SpotifyTrack[];
  });
};

export const fetchUserTopTracks = async (
  token: string,
  time: TimeRange,
  limit?: string
) => {
  const data = await getUserTopTracks(token, time, limit);
  return data.map((track) => ({
    id: track.id,
    title: track.name,
    image: track.album.images[0]?.url ?? "",
    artist: track.artists.map((a) => a.name).join(", ") || "Unknown Artist",
    album: track.album.name || "Unknown Album",
  }));
};

export const getUserTopArtists = async (
  access_token: string,
  time: TimeRange,
  limit: string = "50"
) => {
  const res = await fetch(
    `https://api.spotify.com/v1/me/top/artists?time_range=${time}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Spotify API error: ${res.status} ${res.statusText}`);
  }

  return res.json().then((data) => {
    return data.items as SpotifyArtist[];
  });
};

export const fetchUserTopArtists = async (
  token: string,
  time: TimeRange,
  limit?: string
) => {
  const data = await getUserTopArtists(token, time, limit);
  return data.map((artist) => ({
    id: artist.id,
    title: artist.name,
    image: artist.images[0]?.url ?? "",
    genres: artist.genres.join(", ") || "Unknown Genre",
  }));
};

export const getUserProfile = async (access_token: string) => {
  const res = await fetch(`https://api.spotify.com/v1/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Spotify API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
};

export const fetchProfile = async (access_token: string) => {
  const data = await getUserProfile(access_token);
  return {
    id: data.id,
    name: data.display_name,
    followers: data.followers.total,
    image: data.images[0]?.url ?? "",
  };
};

export const getUserRecentTracks = async (
  access_token: string,
  limit: string = "10"
) => {
  const res = await fetch(
    `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Spotify API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
};

export const fetchRecentsTracks = async (token: string) => {
  const data = await getUserRecentTracks(token);

  return data.items.map((item: SpotifyRecentTrackItem) => ({
    id: item.track.id,
    title: item.track.name,
  }));
};

export const getArtist = async (access_token: string, id: string) => {
  const headers = {
    Authoriaztion: `Bearer ${access_token}`,
  };

  try {
    const [profileRes, albumsRes, topTracksRes] = await Promise.all([
      fetch(`https://api.spotify.com/v1/artists/${id}`, { headers }),
      fetch(`https://api.spotify.com/v1/artists/${id}/albums`, { headers }),
      fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks`, { headers }),
    ]);

    if (!profileRes.ok || !albumsRes.ok || !topTracksRes.ok) {
      throw new Error(
        `Spotify API error: ${profileRes.status} / ${albumsRes.status} / ${topTracksRes.status}`
      );
    }

    const [profile, albums, topTracks] = await Promise.all([
      profileRes.json(),
      albumsRes.json(),
      topTracksRes.json(),
    ]);

    return {
      profile,
      albums: albums.items,
      topTracks: topTracks.tracks,
    };
  } catch (error) {
    console.error("Error fetching artist data:", error);
  }
};

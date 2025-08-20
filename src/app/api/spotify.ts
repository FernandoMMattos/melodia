export const getUserTopTracks = async (
  access_token: string,
  time: "short_term" | "medium_term" | "long_term"
) => {
  const res = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${time}`,
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
    return data.items;
  });
};

export const getUserTopArtists = async (
  access_token: string,
  time: "short_term" | "medium_term" | "long_term"
) => {
  const res = await fetch(
    `https://api.spotify.com/v1/me/top/artists?time_range=${time}&limit=50`,
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
    return data.items;
  });
};

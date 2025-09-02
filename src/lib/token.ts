export const getAccessToken = () => {
  return localStorage.getItem("spotify_access_token");
};

export const refreshToken = async (refresh_token: string) => {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  return res.json();
};

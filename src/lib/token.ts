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

export const getValidAccessToken = async (): Promise<string> => {
  const accessToken = localStorage.getItem("spotify_access_token");
  const refreshToken = localStorage.getItem("spotify_refresh_token");
  const expiresAt = localStorage.getItem("spotify_expires_at");

  const now = Date.now();

  if (accessToken && expiresAt && now < parseInt(expiresAt, 10)) {
    return accessToken;
  }

  if (!refreshToken) {
    throw new Error("No refresh token available, please log in again.");
  }

  const res = await fetch("/api/auth/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`Failed to refresh token ${JSON.stringify(data)}`);
  }

  if (data.access_token) {
    localStorage.setItem("spotify_access_token", data.access_token);
    localStorage.setItem("spotify_expires_at", String(data.expires_at));

    if (data.refresh_token) {
      localStorage.setItem("spotify_refresh_token", data.refresh_token);
    }

    return data.access_token;
  }

  throw new Error("No access token returned from refresh");
};

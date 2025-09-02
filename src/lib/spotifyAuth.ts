export const getValidAccessToken = async (): Promise<string | null> => {
  const accessToken = localStorage.getItem("spotify_access_token");
  const refreshToken = localStorage.getItem("spotify_refresh_token");
  const expiresAt = Number(localStorage.getItem("spotify_expires_at"));

  if (!accessToken || !refreshToken) return null;

  if (Date.now() < expiresAt) {
    return accessToken;
  }

  const res = await fetch("/api/auth/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  const data = await res.json();

  if (data.access_token) {
    localStorage.setItem("spotify_access_token", data.access_token);
    localStorage.setItem(
      "spotify_expires_at",
      String(Date.now() + data.expires_in * 1000)
    );

    return data.access_token;
  }

  return null;
};

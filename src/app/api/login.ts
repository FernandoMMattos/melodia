const base64UrlEnconde = (buffer: ArrayBuffer) => {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

const generateCodeChallenge = async (codeVerifier: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return base64UrlEnconde(digest);
};

export const login = async () => {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
  const redirectUri = "http://localhost:3000/callback";
  const scope = [
    "user-read-private",
    "user-read-email",
    "user-top-read",
    "playlist-read-private",
    "user-read-recently-played",
    "offline_access"
  ].join(" ");

  const codeVerifier = crypto.randomUUID() + crypto.randomUUID();
  localStorage.setItem("spotify_code_verifier", codeVerifier);

  const codeChallenge = await generateCodeChallenge(codeVerifier);

  const authUrl =
    `https://accounts.spotify.com/authorize?` +
    `response_type=code` +
    `&client_id=${clientId}` +
    `&scope=${encodeURIComponent(scope)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&code_challenge_method=S256` +
    `&code_challenge=${codeChallenge}`;

  window.location.href = authUrl;
};

import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const codeVerifier = searchParams.get("verifier");

  if (!code)
    return NextResponse.json({ error: "No code found" }, { status: 400 });

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
      grant_type: "authorization_code",
      code,
      redirect_uri: "http://localhost:3000/callback",
      code_verifier: codeVerifier!,
    }),
  });

  const data = await res.json();
  return NextResponse.json(data);
};

export const POST = async (req: Request) => {
  try {
    const { code, verifier } = await req.json();

    if (!code || !verifier)
      return NextResponse.json(
        { error: "Missing code or verifier" },
        { status: 400 }
      );

    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
    const redirectUri = "http://localhost:3000/callback";

    const body = new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      code_verifier: verifier,
    });

    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Spotify token exchange failed", data);
      return NextResponse.json(
        { error: "Token exchange failed", details: data },
        { status: 400 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Error in /api/auth/callback", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
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

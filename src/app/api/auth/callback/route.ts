import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const codeVerifier = searchParams.get("verifier");

  if (!code) {
    return NextResponse.json({ error: "No code found" }, { status: 400 });
  }

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

  if (!res.ok) {
    console.error("Spotify token exchange failed", data);
    return NextResponse.json(
      { error: "Token exchange failed", details: data },
      { status: 400 }
    );
  }

  const response = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_in: data.expires_in,
    expires_at: Date.now() + data.expires_in * 1000,
  };

  return NextResponse.json(response);
};

export const POST = async (req: Request) => {
  try {
    const { code, verifier } = await req.json();

    if (!code || !verifier) {
      return NextResponse.json(
        { error: "Missing code or verifier" },
        { status: 400 }
      );
    }

    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
        grant_type: "authorization_code",
        code,
        redirect_uri: "http://localhost:3000/callback",
        code_verifier: verifier,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Spotify token exchange failed", data);
      return NextResponse.json(
        { error: "Token exchange failed", details: data },
        { status: 400 }
      );
    }

    const response = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
      expires_at: Date.now() + data.expires_in * 1000,
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error("Error in /api/auth/callback", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { refresh_token } = await req.json();

    if (!refresh_token) {
      return NextResponse.json(
        { error: "Missing refresh_token" },
        { status: 400 }
      );
    }

    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
        grant_type: "refresh_token",
        refresh_token,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Spotify refresh failed", data);
      return NextResponse.json(
        { error: "Refresh failed", details: data },
        { status: 400 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Error in /api/auth/refresh", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

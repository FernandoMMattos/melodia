import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { refresh_token } = await req.json();

    if (!refresh_token) {
      return NextResponse.json(
        { error: "Missing refresh_token" },
        { status: 400 }
      );
    }

    const authHeader =
      "Basic " +
      Buffer.from(
        process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID +
          ":" +
          process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
      ).toString("base64");

    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: authHeader,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: "Spotify refresh failed", details: data },
        { status: 400 }
      );
    }

    const expires_at = Date.now() + data.expires_in * 1000;

    return NextResponse.json({ ...data, expires_at }, { status: 200 });
  } catch (err) {
    console.error("Erro no refresh:", err);
    return NextResponse.json(
      { error: "Refresh failed", details: String(err) },
      { status: 500 }
    );
  }
}

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const verifier = localStorage.getItem("spotify_code_verifier");

      if (!code || !verifier) return console.error("No code or verifier found");

      const res = await fetch("/api/auth/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, verifier }),
      });

      const data = await res.json();

      if (data.access_token) {
        localStorage.setItem("spotify_access_token", data.access_token);
        localStorage.setItem("spotify_refresh_token", data.refresh_token);
        localStorage.setItem(
          "spotify_expires_at",
          String(Date.now() + data.expiresIn * 1000)
        );

        router.push("/home");
      } else {
        console.error("Token exchange failed", data);
      }
    };
    handleAuth();
  }, [router]);

  return <p>Logging you in with Spotify...</p>;
};

export default CallbackPage;

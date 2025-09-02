"use client";

import Header from "@/components/header";
import Image from "next/image";
import { getAccessToken } from "@/lib/token";
import { useSpotifyProfile } from "@/hooks/useSpotifyProfile";
import { useSpotifyTopItems } from "@/hooks/useSpotifyTopItems";
import { useSpotifyRecentTracks } from "@/hooks/useSpotifyRecentTracks";
import CardProfile from "@/components/cardProfile";
import { useSpotifyGenres } from "@/hooks/useSpotifyGenres";
import Footer from "@/components/footer";

const ProfilePage = () => {
  const token = getAccessToken();

  const { profile, loading, error } = useSpotifyProfile(token);
  const { items: topItems } = useSpotifyTopItems("songs", "long_term");
  const { recentTracks } = useSpotifyRecentTracks();
  const { genres } = useSpotifyGenres();

  const topItem = topItems.length > 0 ? topItems[0] : null;

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <>
      <Header />

      {profile && (
        <main className="p-10 flex flex-col gap-10">
          <section className="flex flex-col items-center gap-4">
            {profile.image && (
              <Image
                src={profile.image}
                alt={`profile picture of ${profile.name}`}
                width={200}
                height={200}
                className="rounded-full shadow-lg"
              />
            )}
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <span className="text-gray-500">{profile.followers} followers</span>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CardProfile title="Most Listened Track">
              <p className="text-(--text-muted)">
                {topItem?.title ?? "No data available"}
              </p>
            </CardProfile>

            <CardProfile title="Most Listened Artist">
              <p className="text-(--text-muted)">
                {topItem?.artist?.split(",")[0] ?? "No data available"}
              </p>
            </CardProfile>

            <CardProfile title="Most Recent Tracks">
              <ol className="list-decimal list-inside text-(--text-muted)">
                {recentTracks.length > 0 ? (
                  recentTracks.map((track) => (
                    <li key={track.id}>{track.title}</li>
                  ))
                ) : (
                  <p>No recent tracks found</p>
                )}
              </ol>
            </CardProfile>

            <CardProfile title="Most Listened Genres">
              <ol className="list-disc list-inside text-(--text-muted)">
                {genres.map((genre, index) => (
                  <li key={index}>{genre}</li>
                ))}
              </ol>
            </CardProfile>
          </section>
        </main>
      )}
      <Footer />
    </>
  );
};

export default ProfilePage;

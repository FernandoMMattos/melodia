"use client";

import Header from "@/components/header";
import Card from "@/components/card";
import { useState } from "react";
import { useSpotifyTopItems } from "@/hooks/useSpotifyTopItems";
import { TimeRange } from "@/lib/spotifyService";
import Footer from "@/components/footer";

const HomePage = () => {
  const [time, setTime] = useState<TimeRange>("short_term");
  const [typeList, setTypeList] = useState<"songs" | "artists">("songs");

  const { items, loading } = useSpotifyTopItems(typeList, time);

  return (
    <>
      <Header />
      <main className="flex flex-col items-center mb-4">
        <h3 className="text-center p-2 ">
          Your most listened{" "}
          <select
            defaultValue="songs"
            onChange={(e) => setTypeList(e.target.value as "songs" | "artists")}
            className="hover:cursor-pointer hover:text-(--primary) outline-0"
          >
            <option>songs</option>
            <option>artists</option>
          </select>{" "}
        </h3>
        <select
          defaultValue="short_term"
          onChange={(e) => setTime(e.target.value as TimeRange)}
          className="my-4 border p-2 rounded bg-(--bg-light) border-(--border) hover:cursor-pointer outline-0"
        >
          <option value="short_term">4 Weeks</option>
          <option value="medium_term">6 Months</option>
          <option value="long_term">1 Year</option>
        </select>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {items.map((item) => (
              <li key={item.id}>
                <Card
                  title={item.title}
                  artist={item.artist}
                  image={item.image}
                  album={item.album}
                  genres={item.genres}
                />
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </>
  );
};

export default HomePage;

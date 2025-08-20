"use client";

import Header from "@/components/header";
import { useEffect, useState } from "react";
import { getUserTopArtists, getUserTopTracks } from "../api/spotify";
import { getAccessToken } from "../api/token";
import Card from "@/components/card";
import { FormattedItem, SpotifyArtist, SpotifyTrack } from "@/types/spotify";

type SpotifyResponse =
  | SpotifyTrack[]
  | { items: SpotifyTrack[] }
  | SpotifyArtist[]
  | { items: SpotifyArtist[] };

const HomePage = () => {
  const TIME_OPTIONS = ["short_term", "medium_term", "long_term"] as const;

  type TimeRange = (typeof TIME_OPTIONS)[number];

  const [items, setItems] = useState<FormattedItem[]>([]);
  const [time, setTime] = useState<TimeRange>("short_term");
  const [typeList, setTypeList] = useState<string>("songs");

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;

    const fetchItems = async () => {
      try {
        let data: SpotifyResponse;

        if (typeList === "songs") {
          data = await getUserTopTracks(token, time);
        } else {
          data = await getUserTopArtists(token, time);
        }

        const items = Array.isArray(data) ? data : data.items;

        if (!items) {
          console.error(
            "Spotify API returned nothing or unexpected format",
            data
          );
          return;
        }

        const formatted = items.map((item: SpotifyTrack | SpotifyArtist) => {
          if ("album" in item) {
            return {
              id: item.id,
              title: item.name,
              image: item.album.images[0]?.url ?? "",
              artist:
                item.artists.map((a) => a.name).join(", ") || "Unknown Artist",
              album: item.album.name || "Unknown Album",
            };
          } else {
            return {
              id: item.id,
              title: item.name,
              image: item.images[0]?.url ?? "",
              artist: item.genres.join(", ") || "Unknown Genre",
            };
          }
        });

        setItems(formatted);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchItems();
  }, [time, typeList]);

  return (
    <>
      <Header />
      <section className="flex flex-col items-center">
        <h3 className="text-center p-2 ">
          Your most listened{" "}
          <select
            defaultValue="songs"
            onChange={(e) => setTypeList(e.target.value)}
            className="hover:cursor-pointer hover:text-(--primary)"
          >
            <option>songs</option>
            <option>artists</option>
          </select>{" "}
        </h3>
        <select
          defaultValue="short_term"
          onChange={(e) => setTime(e.target.value as TimeRange)}
          className="my-4 border p-2 rounded bg-(--bg-light) border-(--border) hover:cursor-pointer"
        >
          <option value="short_term">1 month</option>
          <option value="medium_term">6 months</option>
          <option value="long_term">1 year</option>
        </select>
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
      </section>
      <footer></footer>
    </>
  );
};

export default HomePage;

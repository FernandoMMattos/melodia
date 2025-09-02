"use client";

import Image from "next/image";
import Link from "next/link";
import { login } from "./api/login";
import Button from "@/components/button";
import Logo from "@/components/logo";
import SpotifyLogo from "../../public/2024-spotify-full-logo/Full_Logo_Green_RGB.svg";

const App = () => {
  return (
    <section className="text-center place-self-center h-screen justify-between flex flex-col">
      <header>
        <Logo tag="h1" />
      </header>
      <main>
        <div className="border rounded-xl w-fit p-15 gap-5 flex flex-col">
          <span className="text-(--text) font-bold text-4xl">
            Welcome!
          </span>
          <span className="text-(--text-muted)">
            Track your spotify infos and more!
          </span>
          <div className="w-3xs place-self-center">
            <Button onClick={login}>Start!</Button>
          </div>
          <span className="text-(--text-muted) text-sm">
            Created by{" "}
            <Link
              href="https://github.com/FernandoMMattos"
              className="cursor-pointer hover:text-(--text)"
            >
              @FernandoMMattos
            </Link>
          </span>
        </div>
      </main>
      <footer className="place-self-center">
        <Image src={SpotifyLogo} alt="Spotify logo" className="w-48 h-48" />
      </footer>
    </section>
  );
};

export default App;

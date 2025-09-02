import Link from "next/link";
import Logo from "./logo";
import Image from "next/image";

import SpotifyFullLogo from "../../public/2024-spotify-full-logo/Full_Logo_Green_RGB.svg";
import SpotifyIcon from "../../public/2024-spotify-logo-icon/Primary_Logo_Green_RGB.svg";
import { useIsMobile } from "@/hooks/useIsMobile";

const Header = () => {
  const isMobile = useIsMobile();

  return (
    <header>
      <nav className="flex justify-between items-center p-1 ml-5 mr-5">
        <div className="flex items-center gap-3">
          <Image
            src={isMobile ? SpotifyIcon : SpotifyFullLogo}
            alt="Spotify Logo"
            className={isMobile ? "w-12 h-12" : "w-24 h-24"}
          />
          <Logo tag="h4" />
        </div>
        <div className="flex items-center gap-2">
          {window.location.pathname === "/home" ? (
            <Link href="profile">Profile</Link>
          ) : (
            <Link href="home">Home</Link>
          )}
          <Link href="/">Logout</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;

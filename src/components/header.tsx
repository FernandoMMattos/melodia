import Link from "next/link";
import Logo from "./logo";
import Image from "next/image";

import SpotifyFullLogo from "../../public/2024-spotify-full-logo/Full_Logo_Green_RGB.svg";
import SpotifyIcon from "../../public/2024-spotify-logo-icon/Primary_Logo_Green_RGB.svg";
import { useIsMobile } from "@/hooks/useIsMobile";

const Header = () => {
  const isMobile = useIsMobile();
  return (
    <nav className="flex justify-between items-center p-1">
      <div className="flex items-center gap-2">
        <Image
          src={isMobile ? SpotifyIcon : SpotifyFullLogo}
          alt="Spotify Logo"
          className={isMobile? "w-12 h-12" : "w-24 h-24"}
        />
        <Logo tag="h4" />
      </div>
      <div className="flex items-center gap-2">
        <Link href="profile">Profile</Link>
        <Link href="login">Logout</Link>
      </div>
    </nav>
  );
};

export default Header;

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: {
    name: string;
  }[];
  album: {
    images: {
      url: string;
    }[];
    name: string;
  };
}

export interface SpotifyArtist {
  id: string;
  name: string;
  images: {
    url: string;
  }[];
  genres: string[];
}

export interface FormattedItem {
  id: string;
  title: string;
  image: string;
  artist: string;
  genres?: string;
  album?: string;
}

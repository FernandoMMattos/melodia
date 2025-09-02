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

export interface SpotifyProfile {
  id: string,
  display_name: string,
  followers: {
    total: number
  },
  images: {
    url: string
  }[]
}

export interface SpotifyRecentTrackItem {
  track: SpotifyTrack;
  played_at: string;
}

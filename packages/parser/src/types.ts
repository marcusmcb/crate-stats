export type DjPlatform = 'serato' | 'traktor' | 'rekordbox';

export type TagHealth = {
  percentage_with_tag: number;
  empty_tag_count: number;
};

export type PlaylistLengthFormatted = {
  h: number;
  m: number;
  s: number;
};

export type StartTimeFormatted = {
  day?: string;
  month?: string;
  dateday?: string;
  start_time?: string;
};

export type PlaylistDataSection = {
  has_playlist_data: boolean;
  start_time?: string;
  end_time?: string;
  playlist_length_formatted?: PlaylistLengthFormatted;
  start_time_formatted?: StartTimeFormatted;
};

export type TrackPlay = {
  name?: string;
  artist?: string;
  album?: string;
  genre?: string;
  year?: number | string;
  bpm?: number | string;
  key?: string;
  playtime?: number | string;
  deck?: string | number;
  rating?: number | string;
  bitrate?: number | string;
  played_at?: string;
  [k: string]: unknown;
};

export type PlaylistReport = {
  platform: DjPlatform;
  playlist_data: PlaylistDataSection;
  master_track_log: TrackPlay[];
  [section: string]: unknown;
};

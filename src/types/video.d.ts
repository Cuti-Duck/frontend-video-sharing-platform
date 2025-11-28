export interface Video {
  videoUrl: string;

  videoId: string;
  channelId: string;
  userId: string;
  title: string;
  description: string;
  duration: number;
  playbackUrl: string;
  thumbnailUrl: string;
  createdAt: string;
  updatedAt: string;
  createdFromStreamId: string;
  type: string;
  likeCount: number;
  viewCount: number;
  channelName?: string;
}

export interface VideoItems {
  videoId: string;
  channelId: string;
  userId: string;
  title: string;
  description: string;
  playbackUrl: string | null;
  key: string | null;
  status: string
  duration: number;
  thumbnailUrl: string | null;
  type: string; // "upload" hoặc loại khác
  viewCount: number;
  likeCount: number;
  createdAt: string; // ISO date
  channelName?: string;

  userName: string;
  userAvatarUrl: string;
}

export interface VideoInfo {
  channelId: string;
  title: string;
  description: string;
}

export interface VideoResponse {
  videoId: string;
  uploadUrl: string;
}

export interface VideoSearchItem {
  videoId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  channelId: string;
  channelName: string;
  viewCount: number;
  likeCount: number;
  duration: number; // đơn vị giây
  createdAt: string; // ISO date string
}
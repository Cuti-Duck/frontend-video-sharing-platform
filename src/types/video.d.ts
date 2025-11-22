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
}
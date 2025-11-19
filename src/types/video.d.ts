export interface Video {
  id: string;
  userId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number;
  viewCount: number;
  likeCount: number;
  uploadedAt: string;
}
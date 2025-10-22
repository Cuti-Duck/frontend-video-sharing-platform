export interface Video {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number;
  viewCount: number;
  uploadedAt: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
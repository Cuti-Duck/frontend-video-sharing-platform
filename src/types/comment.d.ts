export interface Comment {
  commentId: string;
  videoId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  userName: string;
  userAvatarUrl?: string;
}
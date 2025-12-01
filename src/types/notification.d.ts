export interface Notification {
  notificationId: string;
  userId: string;
  type: "like" | "comment" | "subscribe" | "upload" | "mention";
  title: string;
  message: string;
  relatedUserId?: string;
  relatedVideoId?: string;
  videoId?: string;
  relatedCommentId?: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
  avatarUrl?: string
  actorAvatarUrl?: string;
  actorName?: string;
}

export interface NotificationResponse {
  notifications: Notification[];
  totalCount: number;
  cursor?: string;
}
export interface Notification {
  notificationId: string;
  userId: string;
  type: "like" | "comment" | "subscribe" | "upload" | "mention";
  title: string;
  message: string;
  relatedUserId?: string;
  relatedVideoId?: string;
  relatedCommentId?: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface NotificationResponse {
  notifications: Notification[];
  totalCount: number;
  cursor?: string;
}
export interface Notification {
  notificationId: string;
  userId: string;
  type: string;
  message: string;
  videoId?: string;
  fromUserId?: string;
  isRead: boolean;
  createdAt: string;
}
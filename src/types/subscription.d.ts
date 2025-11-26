export interface Subscription {
  userId: string;
  channelId: string;
  createdAt: string;
  channelName?: string;
  channelAvatarUrl?: string;
}

export interface Subscriber {
  avatarUrl: string;
  channelId: string;
  channelName: string;
  subscribedAt: string;
}
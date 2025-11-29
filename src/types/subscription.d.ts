export interface Subscription {
  userId: string;
  channelId: string;
  createdAt: string;
  channelName?: string;
  channelAvatarUrl?: string;
}

export interface Subscriber {
  channelId: string;
  channelName: string;
  avatarUrl: string;
  subscribedAt: string;
}

export interface SubscribedChannel {
  channelId: string;
  channelName: string;
  avatarUrl: string | null;
  subscriberCount: number;
  subscribedAt: string;
}
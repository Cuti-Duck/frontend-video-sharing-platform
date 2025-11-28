export interface Channel {
  channelId: string;
  userId: string;
  name: string;
  description: string;
  subscriberCount: number;
  videoCount: number;
  createdAt: string;
}

export interface ChannelSearchItem {
  channelId: string;
  channelName: string;
  avatarUrl: string | null;
  description: string | null;
  subscriberCount: number;
  videoCount: number;
  createdAt: string; // ISO date string
}
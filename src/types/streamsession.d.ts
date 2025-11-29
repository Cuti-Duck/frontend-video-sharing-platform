export interface StreamSession {
  streamId: string;
  channelId: string;
  userId: string;
  title: string;
  description?: string;
  status: string;
  isLive: boolean;
  startedAt?: string;
  duration?: number;
  viewerCount: number;
}
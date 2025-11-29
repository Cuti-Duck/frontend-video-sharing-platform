export interface User {
  userId: string;
  name: string;
  email: string;
  avatarUrl: string;
  phoneNumber: string;
  gender: string;
  birthDate: string;
  channelId: string;
  createdAt: string;
  subscribersCount: number;
}

export interface UserResponse {
    userId: string;
    name: string;
    email: string;
    avatarUrl: string;
    phoneNumber: string;
    gender: string;
    birthDate: string;
    channelId: string;
    createdAt: string;
}

export interface UserProfile {
    name: string;
    gender: string;
    birthDate: string;
    phoneNumber: string;
}
import { Video } from "@/types/video";
import { User } from "@/types/user";

export const mockUser: User[] = [
  {
    userId: "1",
    name: "Khanh",
    email: "fpt.gmail.com",
    avatarUrl: "https://d199lg8q7t4hmc.cloudfront.net/thumnails/Screenshot%202025-10-21%20135247.png",
    phoneNumber: "0123456789",
    gender: "Male",
    birthDate: "1990-01-01",
    channelId: "channel_1",
    createdAt: "2023-01-01",
    subscribersCount: 1200
  },
  {
    userId: "2",
    name: "Long",
    email: "fpt.gmail.com",
    avatarUrl: "https://d199lg8q7t4hmc.cloudfront.net/thumnails/Screenshot%202025-10-21%20135247.png",
    phoneNumber: "0123456789",
    gender: "Male",
    birthDate: "1990-01-01",
    channelId: "channel_1",
    createdAt: "2023-01-01",
    subscribersCount: 0
  }
]

export function getUserById(id: string): User | undefined {
  return mockUser.find(user => user.userId === id);
}

export function getVideoCountByUserId(userId: string): number {
  return mockVideos.filter(video => video.userId === userId).length;
}

export const mockVideos: Video[] = [
  {
    videoId: "1",
    userId: "1",
    title: "Hướng dẫn Next.js 15 từ cơ bản đến nâng cao",
    description: "Trong video này, chúng ta sẽ học cách xây dựng ứng dụng web hiện đại với Next.js 15. Bao gồm App Router, Server Components, và nhiều tính năng mới khác. Chúng ta sẽ đi từ những khái niệm cơ bản như routing, layout, loading states cho đến những tính năng nâng cao như streaming, parallel routes, intercepting routes. Bạn cũng sẽ học cách tối ưu hóa performance với Image optimization, font optimization, và cách deploy ứng dụng lên Vercel. Video này phù hợp cho cả người mới bắt đầu và những developer đã có kinh nghiệm muốn cập nhật kiến thức mới nhất về Next.js.",
    thumbnailUrl: "https://d199lg8q7t4hmc.cloudfront.net/thumnails/Screenshot%202025-10-21%20135247.png",
    videoUrl: "https://d199lg8q7t4hmc.cloudfront.net/videos/Recording%202025-10-10%20173842.mp4",
    duration: 1800,
    viewCount: 15420,
    likeCount: 3200,
    channelId: "",
    playbackUrl: "",
    createdAt: "2024-01-15",
    updatedAt: "",
    createdFromStreamId: "",
    type: "",
  },
  {
    videoId: "2", 
    userId: "1",
    title: "React Hooks - useState và useEffect",
    description: "Tìm hiểu về React Hooks cơ bản: useState và useEffect. Cách sử dụng và best practices. Trong video này, bạn sẽ học cách quản lý state trong functional components với useState, cách xử lý side effects với useEffect, và cách tối ưu hóa performance bằng cách sử dụng dependency array đúng cách. Chúng ta cũng sẽ thảo luận về những lỗi thường gặp khi sử dụng hooks và cách tránh chúng. Video bao gồm nhiều ví dụ thực tế và demo code trực tiếp.",
    thumbnailUrl: "https://d199lg8q7t4hmc.cloudfront.net/thumnails/Screenshot%202025-10-21%20135247.png",
    videoUrl: "https://d199lg8q7t4hmc.cloudfront.net/videos/Recording%202025-10-10%20173842.mp4",
    duration: 1200,
    viewCount: 8930,
    likeCount: 2100,
    channelId: "",
    playbackUrl: "",
    createdAt: "2024-01-15",
    updatedAt: "",
    createdFromStreamId: "",
    type: "",
  },
  {
    videoId: "3",
    userId: "1",
    title: "Tailwind CSS - Thiết kế responsive nhanh chóng",
    description: "Học cách sử dụng Tailwind CSS để tạo giao diện responsive đẹp mắt một cách nhanh chóng. Video này sẽ hướng dẫn bạn từ việc cài đặt Tailwind CSS, hiểu về utility-first approach, cho đến việc xây dựng các component phức tạp. Chúng ta sẽ thực hành xây dựng một trang web hoàn chỉnh với header, navigation, card components, và footer. Bạn cũng sẽ học cách custom theme, sử dụng dark mode, và tối ưu hóa kích thước file CSS cuối cùng. Phù hợp cho mọi level từ beginner đến advanced.",
    thumbnailUrl: "https://d199lg8q7t4hmc.cloudfront.net/thumnails/Screenshot%202025-10-21%20135247.png",
    videoUrl: "https://d199lg8q7t4hmc.cloudfront.net/videos/Recording%202025-10-10%20173842.mp4",
    duration: 900,
    viewCount: 12500,
    likeCount: 2750,
    channelId: "",
    playbackUrl: "",
    createdAt: "2024-01-15",
    updatedAt: "",
    createdFromStreamId: "",
    type: "",
  },
  {
    videoId: "4",
    userId: "2",
    title: "TypeScript cho người mới bắt đầu",
    description: "Khóa học TypeScript từ cơ bản đến nâng cao. Học cách sử dụng types, interfaces, generics và nhiều tính năng khác của TypeScript để viết code JavaScript an toàn hơn.",
    thumbnailUrl: "https://d199lg8q7t4hmc.cloudfront.net/thumnails/Screenshot%202025-10-21%20135247.png",
    videoUrl: "https://d199lg8q7t4hmc.cloudfront.net/videos/Recording%202025-10-10%20173842.mp4",
    duration: 2100,
    viewCount: 9800,
    likeCount: 1850,
    channelId: "",
    playbackUrl: "",
    createdAt: "2024-01-20",
    updatedAt: "",
    createdFromStreamId: "",
    type: "",
  },
  {
    videoId: "5",
    userId: "1",
    title: "Node.js API với Express và MongoDB",
    description: "Xây dựng RESTful API hoàn chỉnh với Node.js, Express và MongoDB. Bao gồm authentication, validation, error handling và deployment.",
    thumbnailUrl: "https://d199lg8q7t4hmc.cloudfront.net/thumnails/Screenshot%202025-10-21%20135247.png",
    videoUrl: "https://d199lg8q7t4hmc.cloudfront.net/videos/Recording%202025-10-10%20173842.mp4",
    duration: 3600,
    viewCount: 22100,
    likeCount: 4200,
    channelId: "",
    playbackUrl: "",
    createdAt: "2024-01-25",
    updatedAt: "",
    createdFromStreamId: "",
    type: "",
  },
  {
    videoId: "6",
    userId: "2",
    title: "Docker cho Frontend Developer",
    description: "Học cách sử dụng Docker để containerize ứng dụng frontend. Từ Dockerfile cơ bản đến multi-stage builds và Docker Compose.",
    thumbnailUrl: "https://d199lg8q7t4hmc.cloudfront.net/thumnails/Screenshot%202025-10-21%20135247.png",
    videoUrl: "https://d199lg8q7t4hmc.cloudfront.net/videos/Recording%202025-10-10%20173842.mp4",
    duration: 1500,
    viewCount: 7650,
    likeCount: 1320,
    channelId: "",
    playbackUrl: "",
    createdAt: "2024-02-01",
    updatedAt: "",
    createdFromStreamId: "",
    type: "",
  },
  {
    videoId: "7",
    userId: "1",
    title: "AWS S3 và CloudFront cho Static Website",
    description: "Hướng dẫn deploy static website lên AWS S3 và sử dụng CloudFront CDN để tăng tốc độ tải trang. Bao gồm cấu hình SSL và custom domain.",
    thumbnailUrl: "https://d199lg8q7t4hmc.cloudfront.net/thumnails/Screenshot%202025-10-21%20135247.png",
    videoUrl: "https://d199lg8q7t4hmc.cloudfront.net/videos/Recording%202025-10-10%20173842.mp4",
    duration: 1800,
    viewCount: 13400,
    likeCount: 2890,
    channelId: "",
    playbackUrl: "",
    createdAt: "2024-02-05",
    updatedAt: "",
    createdFromStreamId: "",
    type: "",
  },
  {
    videoId: "8",
    userId: "2",
    title: "Git và GitHub - Workflow chuyên nghiệp",
    description: "Học cách sử dụng Git và GitHub một cách chuyên nghiệp. Branching strategies, pull requests, code review và CI/CD với GitHub Actions.",
    thumbnailUrl: "https://d199lg8q7t4hmc.cloudfront.net/thumnails/Screenshot%202025-10-21%20135247.png",
    videoUrl: "https://d199lg8q7t4hmc.cloudfront.net/videos/Recording%202025-10-10%20173842.mp4",
    duration: 2400,
    viewCount: 18700,
    likeCount: 3650,
    channelId: "",
    playbackUrl: "",
    createdAt: "2024-02-10",
    updatedAt: "",
    createdFromStreamId: "",
    type: "",
  },
  {
    videoId: "9",
    userId: "1",
    title: "React Query - Data Fetching Made Easy",
    description: "Tìm hiểu React Query (TanStack Query) để quản lý server state hiệu quả. Caching, background updates, optimistic updates và error handling.",
    thumbnailUrl: "https://d199lg8q7t4hmc.cloudfront.net/thumnails/Screenshot%202025-10-21%20135247.png",
    videoUrl: "https://d199lg8q7t4hmc.cloudfront.net/videos/Recording%202025-10-10%20173842.mp4",
    duration: 1650,
    viewCount: 11200,
    likeCount: 2100,
    channelId: "",
    playbackUrl: "",
    createdAt: "2024-02-15",
    updatedAt: "",
    createdFromStreamId: "",
    type: "",
  },
  {
    videoId: "10",
    userId: "2",
    title: "Microservices với .NET Core và Docker",
    description: "Xây dựng kiến trúc microservices với .NET Core. API Gateway, Service Discovery, Message Queue và monitoring với Docker containers.",
    thumbnailUrl: "https://d199lg8q7t4hmc.cloudfront.net/thumnails/Screenshot%202025-10-21%20135247.png",
    videoUrl: "https://d199lg8q7t4hmc.cloudfront.net/videos/Recording%202025-10-10%20173842.mp4",
    duration: 4200,
    viewCount: 16800,
    likeCount: 3420,
    channelId: "",
    playbackUrl: "",
    createdAt: "2024-02-20",
    updatedAt: "",
    createdFromStreamId: "",
    type: "",
  }
];

export function getVideoById(id: string): Video | undefined {
  return mockVideos.find(video => video.videoId === id);
}

export function getVideosByUserId(userId: string): Video[] {
  return mockVideos.filter(video => video.userId === userId);
}

export function getRelatedVideos(currentVideoId: string): Video[] {
  return mockVideos.filter(video => video.videoId !== currentVideoId).slice(0, 10);
}
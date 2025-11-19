import { Video } from "@/types";

export const mockVideos: Video[] = [
  {
    id: "1",
    title: "Hướng dẫn Next.js 15 từ cơ bản đến nâng cao",
    description: "Trong video này, chúng ta sẽ học cách xây dựng ứng dụng web hiện đại với Next.js 15. Bao gồm App Router, Server Components, và nhiều tính năng mới khác.",
    thumbnailUrl: "https://d199lg8q7t4hmc.cloudfront.net/thumnails/Screenshot%202025-10-21%20135247.png",
    videoUrl: "https://d199lg8q7t4hmc.cloudfront.net/videos/Recording%202025-10-10%20173842.mp4",
    duration: 1800,
    viewCount: 15420,
    uploadedAt: "2024-01-15",
    author: {
      id: "1",
      name: "Tech Channel",
      avatar: "https://d199lg8q7t4hmc.cloudfront.net/thumnails/Screenshot%202025-10-21%20135247.png"
    }
  },
  {
    id: "2", 
    title: "React Hooks - useState và useEffect",
    description: "Tìm hiểu về React Hooks cơ bản: useState và useEffect. Cách sử dụng và best practices.",
    thumbnailUrl: "https://d199lg8q7t4hmc.cloudfront.net/thumnails/Screenshot%202025-10-21%20135247.png",
    videoUrl: "https://d199lg8q7t4hmc.cloudfront.net/videos/Recording%202025-10-10%20173842.mp4",
    duration: 1200,
    viewCount: 8930,
    uploadedAt: "2024-01-10",
    author: {
      id: "1",
      name: "Tech Channel", 
      avatar: "https://d199lg8q7t4hmc.cloudfront.net/thumnails/Screenshot%202025-10-21%20135247.png"
    }
  },
  {
    id: "3",
    title: "Tailwind CSS - Thiết kế responsive nhanh chóng",
    description: "Học cách sử dụng Tailwind CSS để tạo giao diện responsive đẹp mắt một cách nhanh chóng.",
    thumbnailUrl: "https://d199lg8q7t4hmc.cloudfront.net/thumnails/Screenshot%202025-10-21%20135247.png",
    videoUrl: "https://d199lg8q7t4hmc.cloudfront.net/videos/Recording%202025-10-10%20173842.mp4",
    duration: 900,
    viewCount: 12500,
    uploadedAt: "2024-01-08",
    author: {
      id: "2",
      name: "Design Pro",
      avatar: "https://d199lg8q7t4hmc.cloudfront.net/thumnails/Screenshot%202025-10-21%20135247.png"
    }
  }
];

export function getVideoById(id: string): Video | undefined {
  return mockVideos.find(video => video.id === id);
}

export function getRelatedVideos(currentVideoId: string): Video[] {
  return mockVideos.filter(video => video.id !== currentVideoId).slice(0, 10);
}
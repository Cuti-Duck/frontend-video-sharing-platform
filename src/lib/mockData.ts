import { Video } from "@/types/video";
import { User } from "@/types/user";

export const mockUser: User[] = [
  {
    id: "1",
    name: "Khanh",
    email: "fpt.gmail.com",
    avatarUrl: "https://d199lg8q7t4hmc.cloudfront.net/thumnails/Screenshot%202025-10-21%20135247.png",
    subscribersCount: 1200,
  }
]

export function getUserById(id: string): User | undefined {
  return mockUser.find(user => user.id === id);
}

export const mockVideos: Video[] = [
  {
    id: "1",
    userId: "1",
    title: "Hướng dẫn Next.js 15 từ cơ bản đến nâng cao",
    description: "Trong video này, chúng ta sẽ học cách xây dựng ứng dụng web hiện đại với Next.js 15. Bao gồm App Router, Server Components, và nhiều tính năng mới khác. Chúng ta sẽ đi từ những khái niệm cơ bản như routing, layout, loading states cho đến những tính năng nâng cao như streaming, parallel routes, intercepting routes. Bạn cũng sẽ học cách tối ưu hóa performance với Image optimization, font optimization, và cách deploy ứng dụng lên Vercel. Video này phù hợp cho cả người mới bắt đầu và những developer đã có kinh nghiệm muốn cập nhật kiến thức mới nhất về Next.js.",
    thumbnailUrl: "https://d199lg8q7t4hmc.cloudfront.net/thumnails/Screenshot%202025-10-21%20135247.png",
    videoUrl: "https://d199lg8q7t4hmc.cloudfront.net/videos/Recording%202025-10-10%20173842.mp4",
    duration: 1800,
    viewCount: 15420,
    likeCount: 3200,
    uploadedAt: "2024-01-15",
  },
  {
    id: "2", 
    userId: "1",
    title: "React Hooks - useState và useEffect",
    description: "Tìm hiểu về React Hooks cơ bản: useState và useEffect. Cách sử dụng và best practices. Trong video này, bạn sẽ học cách quản lý state trong functional components với useState, cách xử lý side effects với useEffect, và cách tối ưu hóa performance bằng cách sử dụng dependency array đúng cách. Chúng ta cũng sẽ thảo luận về những lỗi thường gặp khi sử dụng hooks và cách tránh chúng. Video bao gồm nhiều ví dụ thực tế và demo code trực tiếp.",
    thumbnailUrl: "https://d199lg8q7t4hmc.cloudfront.net/thumnails/Screenshot%202025-10-21%20135247.png",
    videoUrl: "https://d199lg8q7t4hmc.cloudfront.net/videos/Recording%202025-10-10%20173842.mp4",
    duration: 1200,
    viewCount: 8930,
    likeCount: 2100,
    uploadedAt: "2024-01-10",
  },
  {
    id: "3",
    userId: "1",
    title: "Tailwind CSS - Thiết kế responsive nhanh chóng",
    description: "Học cách sử dụng Tailwind CSS để tạo giao diện responsive đẹp mắt một cách nhanh chóng. Video này sẽ hướng dẫn bạn từ việc cài đặt Tailwind CSS, hiểu về utility-first approach, cho đến việc xây dựng các component phức tạp. Chúng ta sẽ thực hành xây dựng một trang web hoàn chỉnh với header, navigation, card components, và footer. Bạn cũng sẽ học cách custom theme, sử dụng dark mode, và tối ưu hóa kích thước file CSS cuối cùng. Phù hợp cho mọi level từ beginner đến advanced.",
    thumbnailUrl: "https://d199lg8q7t4hmc.cloudfront.net/thumnails/Screenshot%202025-10-21%20135247.png",
    videoUrl: "https://d199lg8q7t4hmc.cloudfront.net/videos/Recording%202025-10-10%20173842.mp4",
    duration: 900,
    viewCount: 12500,
    likeCount: 2750,
    uploadedAt: "2024-01-08",
  }
];

export function getVideoById(id: string): Video | undefined {
  return mockVideos.find(video => video.id === id);
}

export function getRelatedVideos(currentVideoId: string): Video[] {
  return mockVideos.filter(video => video.id !== currentVideoId).slice(0, 10);
}
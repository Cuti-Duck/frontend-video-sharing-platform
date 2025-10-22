
import { VideoCard } from "@/components/VideoCard";
import { Video } from "@/types";

const mockVideos: Video[] = [
  {
    id: "1",
    title: "Sample Video",
    description: "This is a sample video",
    thumbnailUrl: "https://d199lg8q7t4hmc.cloudfront.net/thumnails/Screenshot%202025-10-21%20135247.png",
    videoUrl: "https://d199lg8q7t4hmc.cloudfront.net/videos/Recording%202025-10-10%20173842.mp4",
    duration: 120,
    viewCount: 1000,
    uploadedAt: "2024-01-01",
    author: {
      id: "1",
      name: "John Doe",
      avatar: "https://d199lg8q7t4hmc.cloudfront.net/thumnails/Screenshot%202025-10-21%20135247.png"
    }
  },
  {
    id: "2",
    title: "Sample Video",
    description: "This is a sample video",
    thumbnailUrl: "https://d199lg8q7t4hmc.cloudfront.net/thumnails/Screenshot%202025-10-21%20135247.png",
    videoUrl: "https://d199lg8q7t4hmc.cloudfront.net/videos/Recording%202025-10-10%20173842.mp4",
    duration: 120,
    viewCount: 1000,
    uploadedAt: "2024-01-01",
    author: {
      id: "1",
      name: "John Doe",
      avatar: "https://d199lg8q7t4hmc.cloudfront.net/thumnails/Screenshot%202025-10-21%20135247.png"
    }
  },
  {
    id: "2",
    title: "Sample Video",
    description: "This is a sample video",
    thumbnailUrl: "https://d199lg8q7t4hmc.cloudfront.net/thumnails/Screenshot%202025-10-21%20135247.png",
    videoUrl: "https://d199lg8q7t4hmc.cloudfront.net/videos/Recording%202025-10-10%20173842.mp4",
    duration: 120,
    viewCount: 1000,
    uploadedAt: "2024-01-01",
    author: {
      id: "1",
      name: "John Doe",
      avatar: "https://d199lg8q7t4hmc.cloudfront.net/thumnails/Screenshot%202025-10-21%20135247.png"
    }
  },
  {
    id: "2",
    title: "Sample Video",
    description: "This is a sample video",
    thumbnailUrl: "https://d199lg8q7t4hmc.cloudfront.net/thumnails/Screenshot%202025-10-21%20135247.png",
    videoUrl: "https://d199lg8q7t4hmc.cloudfront.net/videos/Recording%202025-10-10%20173842.mp4",
    duration: 120,
    viewCount: 1000,
    uploadedAt: "2024-01-01",
    author: {
      id: "1",
      name: "John Doe",
      avatar: "https://d199lg8q7t4hmc.cloudfront.net/thumnails/Screenshot%202025-10-21%20135247.png"
    }
  },
  {
    id: "2",
    title: "Sample Video",
    description: "This is a sample video",
    thumbnailUrl: "https://d199lg8q7t4hmc.cloudfront.net/thumnails/Screenshot%202025-10-21%20135247.png",
    videoUrl: "https://d199lg8q7t4hmc.cloudfront.net/videos/Recording%202025-10-10%20173842.mp4",
    duration: 120,
    viewCount: 1000,
    uploadedAt: "2024-01-01",
    author: {
      id: "1",
      name: "John Doe",
      avatar: "https://d199lg8q7t4hmc.cloudfront.net/thumnails/Screenshot%202025-10-21%20135247.png"
    }
  }
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
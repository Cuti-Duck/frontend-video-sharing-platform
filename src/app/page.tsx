import { VideoCard } from "@/components/VideoCard";
import { mockVideos } from "@/lib/mockData";
import { getUserById } from "@/lib/mockData";

export default function Home() {
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {mockVideos.map((video) => (
          <VideoCard 
            videoId={video.videoId}
            thumbnailUrl={video.thumbnailUrl}
            title={video.title}
            userName={getUserById(video.userId)?.name || "Unknown"}
            avatarUrl={getUserById(video.userId)?.avatarUrl || "/default-avatar.png"}
            viewCount={video.viewCount}
            key={video.videoId}
          />
        ))}
      </div>
    </div>
  );
}
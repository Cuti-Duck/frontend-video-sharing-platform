
import { VideoCard } from "@/components/VideoCard";
import { mockVideos } from "@/lib/mockData";
import { getUserById } from "@/lib/mockData";
import { get } from "http";

export default function Home() {
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {mockVideos.map((video) => (
          <VideoCard 
            videoId={video.id}
            thumbnailUrl={video.thumbnailUrl}
            title={video.title}
            userName={getUserById(video.userId)?.name || "Unknown"}
            viewCount={video.viewCount}
            key={video.id}
          />
        ))}
      </div>
    </div>
  );
}
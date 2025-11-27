
import { VideoCard } from "@/components/VideoCard";
import VideoApi from "@/lib/videoApi";
import { VideoItems } from "@/types/video";

export default async function Home() {
  const videos = await VideoApi.GetVideos();

  return (
    <div className="">
      {/* {isLoading && <p>Loading...</p>} */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {videos.data.map((video: VideoItems) => (
          <VideoCard
              videoId={video.videoId}
              userId={video.userId}
              thumbnailUrl={video.thumbnailUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREO3tkIJnmJZcWmgLLR-z973QVHQ8zbwDGnw&s"}
              title={video.title}
              userName={video.userName}
              avatarUrl={video.userAvatarUrl}
              viewCount={video.viewCount}
              key={video.videoId}
          />
        ))}
      </div>
    </div>
  );
}
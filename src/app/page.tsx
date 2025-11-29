import { VideoCard } from "@/components/VideoCard";
import VideoApi from "@/lib/videoApi";
import { VideoItems } from "@/types/video";

export default async function Home() {
  const videos = await VideoApi.GetVideosTrending();
  console.log("videos",videos)

  return (
    <div className="">
      {/* {isLoading && <p>Loading...</p>} */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.data.map((video: VideoItems) => (
          <VideoCard key={video.videoId} videoId={video.videoId} layout="vertical" limit={false}/>
        ))}
        
      </div>
    </div>
  );
}
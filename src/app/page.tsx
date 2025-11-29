import { VideoCard } from "@/components/VideoCard";
import VideoApi from "@/lib/videoApi";
import { VideoItems } from "@/types/video";

export default async function Home() {
  console.log("Home page")
  let videos = [];
  const response = await VideoApi.GetVideosTrending()
  videos = response.data

  return (
    <div>
      {/* <MainVideoFrame/> */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video: VideoItems) => (
          <VideoCard key={video.videoId} videoId={video.videoId} layout="vertical" limit={false}/>
      ))}
      </div>   
    </div>
  );
}
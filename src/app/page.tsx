'use client'
import { VideoCard } from "@/components/VideoCard";
import VideoApi from "@/lib/videoApi";
import { VideoItems } from "@/types/video";
import { useEffect, useState } from "react";

export default function Home() {
  const [videos, setVideos] = useState<VideoItems[]>([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
        const fetchVideos = async () => {
            setLoading(true)
            try{
                console.log("getting video")
                const response = await VideoApi.GetVideos()
                setVideos(response.data)

                console.log("success",response)

            }catch(error){
                console.error("Error fetching videos:", error);
            }finally{
                setLoading(false)
            }
        }
        fetchVideos();
    },[])

  return (
    <div className="">
      {isLoading && <p>Loading...</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {videos.map((video) => (
          <VideoCard
              videoId={video.videoId}
              userId={video.userId}
              thumbnailUrl={video.thumbnailUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREO3tkIJnmJZcWmgLLR-z973QVHQ8zbwDGnw&s"}
              title={video.title}
              userName={""}
              avatarUrl={""}
              viewCount={video.viewCount}
              key={video.videoId}
          />
        ))}
      </div>
    </div>
  );
}
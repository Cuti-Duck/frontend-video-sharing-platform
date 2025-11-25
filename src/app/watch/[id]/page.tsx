import { VideoPlayer } from "@/components/VideoPlayer";
import { SmallVideoCard } from "@/components/SmallVideoCard";
import { SmallChannelCard } from "@/components/SmallChannelCard";
import { CustomButton } from "@/components/CustomButton";
import { LikeButton } from "@/components/LikeButton";
import { DescriptionCard } from "@/components/DescriptionCard";
import VideoApi from "@/lib/videoApi";
import UserApi from "@/lib/userApi";

interface WatchPageProps {
  params: { id: string };
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { id } = await params;
  const video = await VideoApi.GetVideoById(id)
  const user = await UserApi.GetUserById(video.data.userId)

  const videoUrl = `${process.env.NEXT_PUBLIC_VIDEO_BASE_URL}/${video.data.key}`

  console.log("video", video.data, "user", user.data.data, "url", videoUrl)

  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-1">
        {/* Main Video Section */}
        <div className="lg:col-span-3">
          
            <VideoPlayer 
            videoUrl={videoUrl}
            thumbnailUrl={video.data.thumbnailUrl}
            title={video.data.title}
          />
        
          {/* Video Info */}
          <div className="flex justify-between px-3">
            <div className="flex items-center mt-4 mb-6">
              <SmallChannelCard
                userId={user.data.data.userId || ""}
                avatarUrl={user.data.data.avatarUrl || ""}   
                name={user.data.data.name || "Unknown"}
                subscribersCount={user.data.data.subscribersCount || 0}
                />
              <CustomButton content="Subcribe" userId={user.data.data.userId || ""}/>
            </div>
            <div className="flex items-center">
              <LikeButton videoId={video.data.videoId} likeCount={video.data.likeCount} />
            </div>
          </div>
            
          {/* Video Description */}
          <div className="px-3 py-1">
            <DescriptionCard 
              viewCount={video.data.viewCount}
              uploadAt={video.data.createdAt}
              description={video.data.description}
            />
          </div>
        </div>
        
        {/* Related Videos Sidebar */}
        <div className="lg:col-span-1">
          
          {/* {getRelatedVideos(video.videoId).map((videos) => (
              <SmallVideoCard 
                key={videos.videoId}
                videoId={videos.videoId}
                thumbnailUrl={videos.thumbnailUrl}
                title={videos.title}
                userName={getUserById(videos.userId)?.name || "Unknown"}
                viewCount={video.viewCount}
                uploadAt={video.createdAt} />
          ))} */}
        </div>
      </div>
    </div>
  );
}